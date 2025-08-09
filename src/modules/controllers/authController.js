import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { User } from '../models/user.js' // Import your TS model (compiled to JS in build)

const users = [] // Temporary in-memory storage until DB integration

export const authController = {
  signup: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { username, password } = req.body
    const existing = users.find(u => u.username === username)
    if (existing) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new User(username, passwordHash, 'user')
    users.push(newUser)

    res.status(201).json({ message: 'User created', id: newUser.id })
  },

  login: async (req, res) => {
    const { username, password } = req.body
    const user = users.find(u => u.username === username)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    res.json({ token })
  }
}
