export * as authApi      from './auth'
export { default as client } from './client'

import client from './client'

// Adaptation
export const getMyPlan   = () => client.get('/adaptation/my').then(r => r.data)
export const getPlan     = (id: string) => client.get(`/adaptation/${id}`).then(r => r.data)
export const assignPlan  = (id: string, tasks: any[]) => client.post(`/adaptation/${id}`, { tasks }).then(r => r.data)
export const toggleTask  = (taskId: string, isDone: boolean) => client.patch(`/adaptation/tasks/${taskId}`, { isDone }).then(r => r.data)

// News
export const getNews    = (category?: string, page = 1) => client.get('/news', { params: { category, page } }).then(r => r.data)
export const createNews = (data: any) => client.post('/news', data).then(r => r.data)
export const pinNews    = (id: string, isPinned: boolean) => client.patch(`/news/${id}/pin`, { isPinned }).then(r => r.data)
export const deleteNews = (id: string) => client.delete(`/news/${id}`).then(r => r.data)

// Tickets
export const getTickets   = (params?: any) => client.get('/tickets', { params }).then(r => r.data)
export const getTicket    = (id: string) => client.get(`/tickets/${id}`).then(r => r.data)
export const createTicket = (data: any) => client.post('/tickets', data).then(r => r.data)
export const setStatus    = (id: string, status: string) => client.patch(`/tickets/${id}/status`, { status }).then(r => r.data)
export const sendMessage  = (id: string, text: string, fromName: string) => client.post(`/tickets/${id}/messages`, { text, fromName }).then(r => r.data)

// Learning
export const getModules   = (category?: string) => client.get('/learning/modules', { params: { category } }).then(r => r.data)
export const getModule    = (id: string) => client.get(`/learning/modules/${id}`).then(r => r.data)
export const addModule    = (data: any) => client.post('/learning/modules', data).then(r => r.data)
export const getProgress  = () => client.get('/learning/progress').then(r => r.data)
export const saveProgress = (moduleId: string, isRead: boolean, quizScore?: number) => client.post('/learning/progress', { moduleId, isRead, quizScore }).then(r => r.data)

// Surveys
export const getSurveys   = () => client.get('/surveys').then(r => r.data)
export const getSurvey    = (id: string) => client.get(`/surveys/${id}`).then(r => r.data)
export const createSurvey = (data: any) => client.post('/surveys', data).then(r => r.data)
export const publishSurvey= (id: string) => client.patch(`/surveys/${id}/publish`).then(r => r.data)
export const respond      = (id: string, answers: any[]) => client.post(`/surveys/${id}/respond`, { answers }).then(r => r.data)
export const getResults   = (id: string) => client.get(`/surveys/${id}/results`).then(r => r.data)

// Annual
export const getMyReviews  = () => client.get('/annual/my').then(r => r.data)
export const getAllReviews  = () => client.get('/annual').then(r => r.data)
export const submitReview  = (data: any) => client.post('/annual', data).then(r => r.data)

// Development
export const getMyResults  = () => client.get('/development/my').then(r => r.data)
export const saveResult    = (competency: string, avgScore: number, answers: any) => client.post('/development', { competency, avgScore, answers }).then(r => r.data)

// Reports
export const getAdaptReport = () => client.get('/reports/adaptation').then(r => r.data)
export const getAnnualReport= () => client.get('/reports/annual').then(r => r.data)
export const getDevReport   = () => client.get('/reports/development').then(r => r.data)
export const getLernReport  = () => client.get('/reports/learning').then(r => r.data)

// Users (admin)
export const getUsers    = () => client.get('/users').then(r => r.data)
export const updateUser  = (id: string, data: any) => client.patch(`/users/${id}`, data).then(r => r.data)
export const setRole     = (id: string, role: string) => client.patch(`/users/${id}/role`, { role }).then(r => r.data)
export const deactivate  = (id: string) => client.delete(`/users/${id}`).then(r => r.data)
