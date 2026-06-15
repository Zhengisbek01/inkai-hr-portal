import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../store/auth'

const NAV: Record<string, { path: string; label: string; icon: string }[]> = {
  employee: [
    { path: '/',            label: 'Главная',        icon: '🏠' },
    { path: '/news',        label: 'Новости',         icon: '📰' },
    { path: '/adaptation',  label: 'Адаптация',       icon: '🌱' },
    { path: '/annual',      label: 'Годовая оценка',  icon: '📊' },
    { path: '/development', label: 'Зоны развития',   icon: '🎯' },
    { path: '/learning',    label: 'Обучение',        icon: '📚' },
    { path: '/tickets',     label: 'Обращения',       icon: '📨' },
    { path: '/surveys',     label: 'Опросники',       icon: '📝' },
    { path: '/profile',     label: 'Мой профиль',     icon: '👤' },
  ],
  hr: [
    { path: '/',        label: 'Главная',      icon: '🏠' },
    { path: '/news',    label: 'Новости',      icon: '📰' },
    { path: '/hr',      label: 'Сотрудники',   icon: '👥' },
    { path: '/reports', label: 'Отчётность',   icon: '📈' },
    { path: '/tickets', label: 'Обращения',    icon: '📨' },
    { path: '/surveys', label: 'Опросники',    icon: '📝' },
    { path: '/profile', label: 'Мой профиль',  icon: '👤' },
  ],
  admin: [
    { path: '/',        label: 'Главная',      icon: '🏠' },
    { path: '/news',    label: 'Новости',      icon: '📰' },
    { path: '/admin',   label: 'Управление',   icon: '⚙️' },
    { path: '/hr',      label: 'HR-модуль',    icon: '👥' },
    { path: '/reports', label: 'Отчётность',   icon: '📈' },
    { path: '/tickets', label: 'Обращения',    icon: '📨' },
    { path: '/surveys', label: 'Опросники',    icon: '📝' },
    { path: '/profile', label: 'Мой профиль',  icon: '👤' },
  ],
}

const ROLE_LABEL: Record<string, string> = {
  admin: 'Администратор', hr: 'HR-менеджер', employee: 'Сотрудник'
}

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const nav = NAV[user?.role || 'employee']
  const initials = user?.name.split(' ').map(w => w[0]).slice(0, 2).join('') || '?'

  const S = {
    app:     { display: 'flex', minHeight: '100vh', background: '#0F1117', color: '#F9FAFB', fontFamily: 'Inter, sans-serif' } as any,
    aside:   { width: 240, background: '#13151C', borderRight: '1px solid rgba(255,255,255,.07)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 10 } as any,
    logo:    { padding: '14px 12px', borderBottom: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 9 } as any,
    icon:    { width: 32, height: 32, background: 'linear-gradient(135deg,#0E6EC4,#0A5BA3)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 } as any,
    nav:     { flex: 1, padding: '8px 6px', overflowY: 'auto' } as any,
    main:    { marginLeft: 240, flex: 1, padding: '24px 28px' } as any,
    footer:  { padding: '10px 9px', borderTop: '1px solid rgba(255,255,255,.07)', display: 'flex', alignItems: 'center', gap: 9 } as any,
    avatar:  { width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#0E6EC4,#0A5BA3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#fff', cursor: 'pointer', flexShrink: 0 } as any,
  }

  return (
    <div style={S.app}>
      <aside style={S.aside}>
        <div style={S.logo}>
          <div style={S.icon}>🏢</div>
          <div>
            <div style={{ fontWeight: 800, color: '#fff', fontSize: 14, fontFamily: 'Manrope,sans-serif' }}>Inkai HR</div>
            <div style={{ fontSize: 10, color: '#6B7280' }}>Портал сотрудника</div>
          </div>
        </div>
        <nav style={S.nav}>
          {nav.map(item => {
            const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))
            return (
              <div key={item.path} onClick={() => navigate(item.path)} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 10px', borderRadius: 9, cursor: 'pointer', marginBottom: 2, fontSize: 12.5, fontWeight: 500, color: active ? '#fff' : '#6B7280', background: active ? 'rgba(14,110,196,.2)' : 'transparent', transition: 'all .15s' }}>
                <span style={{ fontSize: 15, width: 20, textAlign: 'center' }}>{item.icon}</span>
                {item.label}
              </div>
            )
          })}
        </nav>
        <div style={S.footer}>
          <div style={S.avatar} onClick={() => navigate('/profile')}>{initials}</div>
          <div style={{ flex: 1, overflow: 'hidden', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: '#E5E7EB', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name.split(' ').slice(0, 2).join(' ')}
            </div>
            <div style={{ fontSize: 10, color: '#6B7280' }}>{ROLE_LABEL[user?.role || 'employee']}</div>
          </div>
          <button onClick={() => logout().then(() => navigate('/login'))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#4B5563', fontSize: 16 }} title="Выйти">↩</button>
        </div>
      </aside>
      <main style={S.main}><Outlet /></main>
    </div>
  )
}
