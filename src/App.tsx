import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './store/auth'
import Layout      from './components/Layout'
import Login       from './pages/Login'
import Home        from './pages/Home'
import News        from './pages/News'
import Adaptation  from './pages/Adaptation'
import Annual      from './pages/Annual'
import Development from './pages/Development'
import Learning    from './pages/Learning'
import Surveys     from './pages/Surveys'
import Tickets     from './pages/Tickets'
import Profile     from './pages/Profile'
import Reports     from './pages/Reports'
import HRPanel     from './pages/HRPanel'
import AdminPanel  from './pages/AdminPanel'

function Guard({ children, roles }: { children: any; roles?: string[] }) {
  const user = useAuth(s => s.user)
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Guard><Layout /></Guard>}>
          <Route index              element={<Home />} />
          <Route path="news"        element={<News />} />
          <Route path="adaptation"  element={<Adaptation />} />
          <Route path="annual"      element={<Annual />} />
          <Route path="development" element={<Development />} />
          <Route path="learning"    element={<Learning />} />
          <Route path="surveys"     element={<Surveys />} />
          <Route path="tickets"     element={<Tickets />} />
          <Route path="profile"     element={<Profile />} />
          <Route path="reports"     element={<Guard roles={['hr','admin']}><Reports /></Guard>} />
          <Route path="hr"          element={<Guard roles={['hr','admin']}><HRPanel /></Guard>} />
          <Route path="admin"       element={<Guard roles={['admin']}><AdminPanel /></Guard>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
