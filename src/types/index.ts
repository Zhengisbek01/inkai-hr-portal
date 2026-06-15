export type Role = 'admin' | 'hr' | 'employee'

export interface User {
  id: string
  name: string
  role: Role
  position: string
  phone: string
  theme: 'dark' | 'light'
  joinDate: string
  department?: { id: string; name: string }
}

export interface AdaptationTask {
  id: string
  title: string
  description: string
  weekNumber: number
  isDone: boolean
  doneAt?: string
}

export interface NewsItem {
  id: string
  category: string
  title: string
  body: string
  author: { name: string }
  isPinned: boolean
  images: { url: string }[]
  publishedAt: string
}

export interface Ticket {
  id: string
  category: string
  priority: 'low' | 'medium' | 'high'
  subject: string
  body: string
  authorName: string
  status: 'new' | 'in_progress' | 'resolved' | 'closed'
  isAnonymous: boolean
  messages: TicketMessage[]
  createdAt: string
}

export interface TicketMessage {
  id: string
  fromName: string
  role: string
  text: string
  createdAt: string
}

export interface LearningModule {
  id: string
  title: string
  description: string
  docNumber: string
  version: string
  category: string
  isMandatory: boolean
  daysToComplete: number
  fileUrl?: string
  fileSize?: string
  quiz: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  text: string
  options: string[]
  answer: number
}

export interface Survey {
  id: string
  title: string
  description?: string
  status: 'draft' | 'published' | 'closed'
  isAnonymous: boolean
  questions: SurveyQuestion[]
}

export interface SurveyQuestion {
  id: string
  type: string
  text: string
  isRequired: boolean
  options: string[]
  sortOrder: number
}
