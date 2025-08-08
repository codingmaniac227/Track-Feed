// routes/projects.js
import express from 'express'
import { randomUUID } from 'node:crypto'
import { saveData } from '../services/dataService.js'
import { body, param, validationResult } from 'express-validator'
import { asyncHandler } from '../middleware/asyncHandler.js'

export default function createProjectRoutes(projectsRef, todosRef) {
  const router = express.Router()

  // Centralized validator -> throws so errorHandler can format response
  const assertValid = (req) => {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      const err = new Error('Validation Failed')
      err.status = 400
      err.code = 'VALIDATION_ERROR'
      err.errors = result.array()
      throw err
    }
  }

  // GET /projects
  router.get('/', (req, res) => {
    res.json(projectsRef.value)
  })

  // POST /projects (server-generated id; whitelist fields)
  router.post(
    '/',
    [body('name').isString().trim().notEmpty().withMessage('name is required')],
    asyncHandler(async (req, res) => {
      assertValid(req)

      const project = {
        id: randomUUID(),
        name: req.body.name,
        completed: Boolean(req.body.completed),
        todos: [],
      }

      projectsRef.value.push(project)
      await saveData(projectsRef.value, todosRef.value)

      res.status(201).json(project)
    })
  )

  // DELETE /projects/:id (also cascade-delete its todos)
  router.delete(
    '/:id',
    [param('id').isUUID().withMessage('Invalid project id')],
    asyncHandler(async (req, res) => {
      assertValid(req)
      const { id } = req.params

      const beforeProjects = projectsRef.value.length
      projectsRef.value = projectsRef.value.filter((p) => p.id !== id)
      if (projectsRef.value.length === beforeProjects) {
        const err = new Error('Project not found')
        err.status = 404
        throw err
      }

      const beforeTodos = todosRef.value.length
      todosRef.value = todosRef.value.filter((t) => t.projectId !== id)
      const deletedTodos = beforeTodos - todosRef.value.length

      await saveData(projectsRef.value, todosRef.value)
      res.json({ message: 'Project Deleted', id, deletedTodos })
    })
  )

  // PATCH /projects/:id (whitelist updatable fields)
  router.patch(
    '/:id',
    [
      param('id').isUUID().withMessage('Invalid project id'),
      body('name').optional().isString().trim().notEmpty(),
      body('completed').optional().isBoolean(),
    ],
    asyncHandler(async (req, res) => {
      assertValid(req)

      const { id } = req.params
      const project = projectsRef.value.find((p) => p.id === id)
      if (!project) {
        const err = new Error('Project not found')
        err.status = 404
        throw err
      }

      // Build a safe updates object (ignore any unexpected keys)
      const updates = {}
      if (typeof req.body.name === 'string') updates.name = req.body.name
      if (typeof req.body.completed === 'boolean') updates.completed = req.body.completed

      Object.assign(project, updates)
      await saveData(projectsRef.value, todosRef.value)

      res.json({ message: 'Project updated', project })
    })
  )

  return router
}
