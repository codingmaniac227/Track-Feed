import express from 'express'
import { saveData } from '../services/dataService.js'

export default function createProjectRoutes(projectsRef, todosRef) {
    const router = express.Router()

    // Get all projects
    router.get('/', async (req, res) => {
        res.json(projectsRef.value)
    })

    // Add project
    router.post('/', async (req, res) => {
        const project = req.body
        projectsRef.value.push(project)
        await saveData(projectsRef.value, todosRef.value)
        res.status(201).json(project)
    })

    // Delete project by ID
    router.delete('/:id', async (req, res) => {
        const { id } = req.params
        const before = projectsRef.value.length
        projectsRef.value = projectsRef.value.filter(p => p.id !== id)

        if (projectsRef.value.length === before) {
            return res.status(404).json({ message: 'Project Not Found' })
        }

        await saveData(projectsRef.value, todosRef.value)
        res.json({ message: 'Project Deleted', id })
    })

    // Patch project
    router.patch('/:id', async (req, res) => {
        const { id } = req.params
        const updates = req.body

        const project = projectsRef.value.find(p => p.id === id)
        if (!project) {
            return res.status(404).json({ message: 'Project Not Found' })
        }

        Object.assign(project, updates)
        await saveData(projectsRef.value, todosRef.value)
        res.json({ message: 'Project Updated', project })
    })

    return router
}
