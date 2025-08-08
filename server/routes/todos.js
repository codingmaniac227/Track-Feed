// routes/todos.js
import express from 'express'
import { randomUUID } from 'node:crypto'
import { saveData } from '../services/dataService.js'
import { body, param, validationResult } from 'express-validator'
import { asyncHandler } from '../middleware/asyncHandler.js'

export default function createTodoRoutes(projectsRef, todosRef) {
  const router = express.Router()

  // --- shared validation -> throw so errorHandler formats JSON nicely
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

  // --- tiny helpers to keep project.todos in sync (IDs only)
  const findProject = (projectId) =>
    projectsRef.value.find((p) => p.id === projectId)

  const addTodoRef = (projectId, todoId) => {
    const proj = findProject(projectId)
    if (!proj) return // already validated, but be defensive
    if (!Array.isArray(proj.todos)) proj.todos = []
    if (!proj.todos.includes(todoId)) proj.todos.push(todoId)
  }

  const removeTodoRef = (projectId, todoId) => {
    const proj = findProject(projectId)
    if (!proj || !Array.isArray(proj.todos)) return
    proj.todos = proj.todos.filter((id) => id !== todoId)
  }

  const moveTodoRef = (fromProjectId, toProjectId, todoId) => {
    if (fromProjectId === toProjectId) return
    removeTodoRef(fromProjectId, todoId)
    addTodoRef(toProjectId, todoId)
  }

  // GET /todos — all todos
  router.get('/', (req, res) => {
    res.json(todosRef.value)
  })

  // POST /todos — create todo (server generates id) + add id to project.todos
  router.post(
    '/',
    [
      body('projectId')
        .isUUID().withMessage('projectId must be a valid UUID')
        .bail()
        .custom((projectId, { req }) => {
          const exists = projectsRef.value.some((p) => p.id === projectId)
          if (!exists) throw new Error('projectId does not match an existing project')
          return true
        }),
      body('title').isString().trim().notEmpty().withMessage('title is required'),
      body('description').optional().isString(),
      body('dueDate').optional().isISO8601().withMessage('dueDate must be ISO-8601'),
      body('priority').optional().isIn(['low', 'medium', 'high']),
      body('completed').optional().isBoolean(),
    ],
    asyncHandler(async (req, res) => {
      assertValid(req)

      const {
        projectId,
        title,
        description = '',
        dueDate = null,
        priority = 'low',
        completed = false,
      } = req.body

      const todo = {
        id: randomUUID(),
        projectId,
        title,
        description,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
        priority,
        completed: Boolean(completed),
      }

      todosRef.value.push(todo)
      addTodoRef(projectId, todo.id) // <-- keep project.todos updated
      await saveData(projectsRef.value, todosRef.value)
      res.status(201).json(todo)
    })
  )

  // DELETE /todos/:id — remove todo + remove id from project.todos
  router.delete(
    '/:id',
    [param('id').isUUID().withMessage('Invalid todo id')],
    asyncHandler(async (req, res) => {
      assertValid(req)
      const { id } = req.params

      const idx = todosRef.value.findIndex((t) => t.id === id)
      if (idx === -1) {
        const err = new Error('Todo not found')
        err.status = 404
        throw err
      }

      const [deleted] = todosRef.value.splice(idx, 1)
      if (deleted?.projectId) removeTodoRef(deleted.projectId, id)

      await saveData(projectsRef.value, todosRef.value)
      res.json({ message: 'Todo Deleted', id, projectId: deleted?.projectId })
    })
  )

  // PATCH /todos/:id — update fields, and if projectId changes, move id across projects
  router.patch(
    '/:id',
    [
      param('id').isUUID().withMessage('Invalid todo id'),
      body('projectId')
        .optional()
        .isUUID().withMessage('projectId must be a valid UUID')
        .bail()
        .custom((projectId) => {
          if (!projectId) return true
          const exists = projectsRef.value.some((p) => p.id === projectId)
          if (!exists) throw new Error('projectId does not match an existing project')
          return true
        }),
      body('title').optional().isString().trim().notEmpty(),
      body('description').optional().isString(),
      body('dueDate').optional().isISO8601().withMessage('dueDate must be ISO-8601'),
      body('priority').optional().isIn(['low', 'medium', 'high']),
      body('completed').optional().isBoolean(),
    ],
    asyncHandler(async (req, res) => {
      assertValid(req)

      const { id } = req.params
      const todo = todosRef.value.find((t) => t.id === id)
      if (!todo) {
        const err = new Error('Todo not found')
        err.status = 404
        throw err
      }

      const prevProjectId = todo.projectId

      // whitelist + normalize
      if (typeof req.body.projectId === 'string') todo.projectId = req.body.projectId
      if (typeof req.body.title === 'string') todo.title = req.body.title
      if (typeof req.body.description === 'string') todo.description = req.body.description
      if (typeof req.body.priority === 'string') todo.priority = req.body.priority
      if (typeof req.body.completed === 'boolean') todo.completed = req.body.completed
      if (typeof req.body.dueDate === 'string') {
        todo.dueDate = new Date(req.body.dueDate).toISOString()
      }

      // if project changed, move the id between projects
      if (todo.projectId !== prevProjectId) {
        moveTodoRef(prevProjectId, todo.projectId, id)
      }

      await saveData(projectsRef.value, todosRef.value)
      res.json({ message: 'Todo Updated', todo })
    })
  )

  return router
}
