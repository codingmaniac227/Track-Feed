import rateLimit from 'express-rate-limit'

// Read limits from env with safe fallbacks
const minutes = Math.max(1, Number(process.env.RATE_LIMIT_WINDOW_MINUTES ?? 15))
const windowMs = minutes * 60 * 1000
const max = Math.max(1, Number(process.env.RATE_LIMIT_MAX ?? 100))

// Consistent JSON on 429 and standardized headers
export const limiter = rateLimit({
  windowMs,
  max,
  standardHeaders: true,   // adds RateLimit-Limit / -Remaining / -Reset
  legacyHeaders: false,    // no X-RateLimit-* headers
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
