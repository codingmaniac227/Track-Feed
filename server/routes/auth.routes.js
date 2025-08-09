// server/routes/auth.routes.js
import express from 'express'
import bcrypt from 'bcrypt'
import { body, validationResult } from 'express-validator'
import { randomUUID } from 'node:crypto'
import { signAccess, signRefresh, verifyAccess, verifyRefresh } from '../utils/jwt.js'
import { asyncHandler } from '../middleware/asyncHandler.js'
import { requireAuth } from '../middleware/requireAuth.js'

export default function createAuthRoutes(usersRef) {
  const router = express.Router()

  // --- Sign up
  router.post(
    '/signup',
    body('username').isString().trim().notEmpty(),
    body('password').isString().isLength({ min: 6 }),
    asyncHandler(async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

      const { username, password } = req.body
      if (usersRef.value.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Username already exists' })
      }

      const passwordHash = await bcrypt.hash(password, 10)
      const user = {
        id: randomUUID(),
        username,
        passwordHash,
        role: 'user',
        tokenVersion: 0, // <— start at 0
      }
      usersRef.value.push(user)
      res.status(201).json({ message: 'User created' })
    })
  )

  // --- Login
  router.post(
    '/login',
    body('username').isString().trim().notEmpty(),
    body('password').isString().notEmpty(),
    asyncHandler(async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

      const { username, password } = req.body
      const user = usersRef.value.find(u => u.username === username)
      if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(401).json({ message: 'Invalid credentials' })
      }

      const accessToken = signAccess(user)
      const refreshToken = signRefresh(user)
      res.json({ accessToken, refreshToken })
    })
  )

  // --- Refresh
  router.post(
    '/refresh',
    body('token').isString(),
    asyncHandler(async (req, res) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

      const { token } = req.body
      try {
        const payload = verifyRefresh(token) // { sub, ver, iat, exp, ... }
        const user = usersRef.value.find(u => u.id === payload.sub)
        if (!user) return res.status(401).json({ message: 'Invalid refresh token' })

        // version check — if user logged out, this will fail
        if (user.tokenVersion !== payload.ver) {
          return res.status(401).json({ message: 'Refresh token revoked' })
        }

        const accessToken = signAccess(user)
        res.json({ accessToken })
      } catch {
        res.status(401).json({ message: 'Invalid refresh token' })
      }
    })
  )

  // --- Logout (invalidate ALL refresh tokens by bumping version)
  router.post(
    '/logout',
    requireAuth, // requires a valid access token in Authorization header
    asyncHandler(async (req, res) => {
      const user = usersRef.value.find(u => u.id === req.user.id)
      if (!user) return res.status(404).json({ message: 'User not found' })
      user.tokenVersion = (user.tokenVersion ?? 0) + 1
      // Access token will still be valid until it expires; that’s expected.
      res.json({ message: 'Logged out' })
    })
  )

  return router
}
