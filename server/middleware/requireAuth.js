// server/middleware/requireAuth.js
import { verifyAccess } from '../utils/jwt.js'

export function requireAuth(req, res, next) {
  const hdr = req.headers.authorization || ''
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null
  if (!token) return res.status(401).json({ message: 'Missing token' })
  try {
    const payload = verifyAccess(token)
    req.user = { id: payload.sub, role: payload.role }
    next()
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' })
  }
}
