# Inkai HR Portal — Frontend

React + TypeScript + Vite приложение.

## Локальный запуск

```bash
npm install
cp .env.example .env
# Укажите VITE_API_URL в .env
npm run dev
```

## Деплой на Vercel

1. Создайте новый проект на vercel.com
2. Импортируйте **этот** репозиторий (не монорепо!)
3. Vercel автоматически определит Vite
4. Добавьте переменную: `VITE_API_URL` = URL вашего backend
5. Deploy

## Настройки Vercel (если спросит)
- Framework: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

## Backend
Деплоится отдельно на Railway из репозитория `inkai-hr-portal` (папка `backend`).
