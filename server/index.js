// server/index.js
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import { requestId } from './middleware/requestId.js'
import { limiter } from './middleware/rateLimiter.js'
import { loadData } from './services/dataService.js'
import createProjectRoutes from './routes/projects.js'
import createTodoRoutes from './routes/todos.js'
import { config } from './config.js'
import authRoutes from './routes/auth.routes.js'

const app = express()
app.disable('x-powered-by')
app.use(helmet())
app.use(requestId)
app.use(limiter)

const corsOptions = {
  origin(origin, cb) {
    if (!origin || config.CORS_ORIGINS.includes(origin)) return cb(null, true)
    return cb(new Error('CORS: origin not allowed'))
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
  maxAge: 600,
}
app.use('/auth', authRoutes)
app.options(['/projects', '/todos'], cors(corsOptions))
app.use('/projects', cors(corsOptions))
app.use('/todos', cors(corsOptions))

app.use(express.json({ limit: '100kb' }))

const projectsRef = { value: [] }
const todosRef = { value: [] }

const init = async () => {
  const data = await loadData()
  projectsRef.value = data.projects
  todosRef.value = data.todos
}
await init()

app.get('/', (req, res) => res.send('Express server is running!'))

app.use('/projects', createProjectRoutes(projectsRef, todosRef))
app.use('/todos', createTodoRoutes(projectsRef, todosRef))

if (config.NODE_ENV !== 'production') {
  app.delete('/reset', async (req, res) => {
    projectsRef.value = []
    todosRef.value = []
    res.json({ message: 'Data Cleared...(dev only)' })
  })
}

app.use(notFound)
app.use(errorHandler)

export { app } // <-- important: export app for supertest

// Only start the HTTP listener outside of tests
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.PORT, () =>
    console.log(`Server running on http://localhost:${config.PORT}`)
  )
}
