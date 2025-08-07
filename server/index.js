import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { limiter } from './middleware/rateLimiter.js'
import { loadData } from './services/dataService.js'
import createProjectRoutes from './routes/projects.js'
import createTodoRoutes from './routes/todos.js'

const app = express()
app.use(helmet())
app.use(limiter)

const allowedOrigins = [
    'https://trackfeed.netlify.app',
    'https://localhost:5173'
]

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

app.use(express.json())

// In-memory data wrapped in refs (so routes can mutate)
let projects = []
let todos = []
const projectsRef = { value: projects }
const todosRef = { value: todos }

// Load data on startup
const init = async () => {
    const data = await loadData()
    projectsRef.value = data.projects
    todosRef.value = data.todos
}
await init()

app.get('/', (req, res) => {
    res.send('Express server is running!')
})

app.use('/projects', createProjectRoutes(projectsRef, todosRef))
app.use('/todos', createTodoRoutes(projectsRef, todosRef))

app.delete('/reset', async (req, res) => {
    projectsRef.value = []
    todosRef.value = []
    res.json({ message: 'Data Cleared...' })
})

const PORT = 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
