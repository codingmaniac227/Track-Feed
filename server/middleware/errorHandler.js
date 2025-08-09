// middleware/error.js (or whatever your path is)

export function notFound(req, res, next) {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    traceId: res.locals.traceId,
  })
}

export function errorHandler(err, req, res, next) {
  // Normalize status
  const rawStatus = err.status || err.statusCode
  const status = Number.isInteger(rawStatus) ? rawStatus : 500
  const isProd = process.env.NODE_ENV === 'production'

  // Handle invalid JSON bodies from body-parser
  // body-parser sets err.type = 'entity.parse.failed' for bad JSON
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return res.status(400).json({
      success: false,
      message: 'Invalid JSON in request body',
      code: 'INVALID_JSON',
      path: req.originalUrl,
      method: req.method,
      traceId: res.locals.traceId,
    })
  }

  // Safe message: hide internals on 5xx in production
  const message =
    status >= 500 && isProd
      ? 'Internal server error'
      : err.message || 'Unexpected error'

  const payload = {
    success: false,
    message,                // <-- now a string, not a function
    code: err.code,
    path: req.originalUrl,
    method: req.method,
    traceId: res.locals.traceId,
  }

  // Optional validation errors array (e.g. from express-validator)
  if (Array.isArray(err.errors)) {
    payload.errors = err.errors.map(e => ({
      msg: e.msg,
      param: e.param,
      location: e.location,
    }))
  }

  // Only include stack traces outside production
  if (!isProd && err.stack) {
    payload.stack = err.stack
  }

  res.status(status).json(payload)
}
