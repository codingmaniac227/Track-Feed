import express from 'express'
import { saveData } from '../services/dataService.js'
import { validationResult } from 'express-validator'

export default function createTodoRoutes(projectsRef, todosRef) {
    const router = express.Router()

    // Get all todos
    router.get('/', async (req, res) => {
        res.json(todosRef.value)
    })

    // Add todo
    router.post('/', 
        [
            body('id').isString().notEmpty(),
            body('title').isString().notEmpty(),
            body('completed').optional().isBoolean()
        ],
        async (req, res) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const todo = req.body
            todosRef.value.push(todo)
            await saveData(projectsRef.value, todosRef.value)
            res.status(201).json(todo)
    })

    // Delete todo by ID
    router.delete('/:id', async (req, res) => {
        const { id } = req.params
        const before = todosRef.value.length
        todosRef.value = todosRef.value.filter(t => t.id !== id)

        if (todosRef.value.length === before) {
            return res.status(404).json({ message: 'Todo Not Found' })
        }

        await saveData(projectsRef.value, todosRef.value)
        res.json({ message: 'Todo Deleted', id })
    })

    // Patch todo
    router.patch('/:id', 
        [
            body('title').optional().isString().notEmpty(),
            body('completed').optional().isBoolean()
        ],
        async (req, res) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const { id } = req.params
            const updates = req.body

            const todo = todosRef.value.find(t => t.id === id)
            if (!todo) {
                return res.status(404).json({ message: 'Todo Not Found' })
            }

            Object.assign(todo, updates)
            await saveData(projectsRef.value, todosRef.value)
            
            res.json({ message: 'Todo Updated', todo })
    })

    return router
}
