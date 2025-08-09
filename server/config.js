// server/config.js
import 'dotenv/config'

const required = (name) => {
  const v = process.env[name]
  if (v === undefined || v === '') throw new Error(`ENV ${name} is required`)
  return v
}

const toNumber = (name, def) => {
  const raw = process.env[name]
  if (raw === undefined || raw === '') {
    if (def === undefined) throw new Error(`ENV ${name} is required`)
    return def
  }
  const n = Number(raw)
  if (!Number.isFinite(n)) throw new Error(`ENV ${name} must be a number, got "${raw}"`)
  return n
}

const isProd = (process.env.NODE_ENV || 'development') === 'production'
const NODE_ENV = process.env.NODE_ENV || 'development'
const PORT = toNumber('PORT', 3000)

// Frontends allowed to call the API
const FRONTEND_URL = process.env.FRONTEND_URL
const FRONTEND_URL_STAGING = process.env.FRONTEND_URL_STAGING

// Validate URLs (and force https in prod)
const isValidOrigin = (u) => {
  try {
    const url = new URL(u)
    if (isProd && url.protocol !== 'https:') throw new Error('https required in production')
    return true
  } catch {
    return false
  }
}

// In dev, allow Vite defaults
const DEV_ORIGINS = ['http://localhost:5173', 'http://127.0.0.1:5173']

const CORS_ORIGINS = [
  FRONTEND_URL,
  FRONTEND_URL_STAGING,
  ...(NODE_ENV === 'development' ? DEV_ORIGINS : []),
].filter(Boolean).filter(isValidOrigin)

if (isProd && CORS_ORIGINS.length === 0) {
  throw new Error('In production set FRONTEND_URL (and optionally FRONTEND_URL_STAGING).')
}

// Rate limit knobs (seconds + count)
const RATE_LIMIT_WINDOW_SECS = toNumber('RATE_LIMIT_WINDOW', 900) // 15 min
const RATE_LIMIT_MAX = toNumber('RATE_LIMIT_MAX', 100)

export const config = Object.freeze({
  NODE_ENV,
  isProd,
  PORT,
  CORS_ORIGINS,
  RATE_LIMIT_WINDOW_SECS,
  RATE_LIMIT_MAX,
})
