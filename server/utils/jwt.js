// server/utils/jwt.js
import jwt from 'jsonwebtoken'

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'dev_access_secret'
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'dev_refresh_secret'
const ACCESS_EXPIRY = process.env.ACCESS_EXPIRY || '15m'
const REFRESH_EXPIRY = process.env.REFRESH_EXPIRY || '7d'

// Create an access token
export function signAccess(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRY })
}

// Create a refresh token
export function signRefresh(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRY })
}

// Verify an access token
export function verifyAccess(token) {
  try {
    return jwt.verify(token, ACCESS_SECRET)
  } catch (err) {
    throw new Error('Invalid or expired access token')
  }
}

// Verify a refresh token
export function verifyRefresh(token) {
  try {
    return jwt.verify(token, REFRESH_SECRET)
  } catch (err) {
    throw new Error('Invalid or expired refresh token')
  }
}
