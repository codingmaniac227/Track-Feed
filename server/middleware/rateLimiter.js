
import rateLimit from 'express-rate-limit'

const toInt = (v, def) => {
  const n = Number(v)
  return Number.isFinite(n) ? n : def
}

const minutes = toInt(process.env.RATE_LIMIT_WINDOW_MINUTES, 15)
const windowMs = minutes * 60 * 1000
const max = toInt(process.env.RATE_LIMIT_MAX, 100)

export const limiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: 'Too many requests from this IP. Please try again later.',
      code: 'RATE_LIMITED',
      path: req.originalUrl,
      method: req.method,
      traceId: res.locals.traceId,
      retryAfter: res.get('RateLimit-Reset') ?? undefined,
    })
  },
})
