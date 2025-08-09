import { randomUUID } from 'node:crypto'


const SAFE_ID_RE = /^[A-Za-z0-9._-]{8, 200}$/

export function requestId(req, res, next) {
    const incoming = req.get('X-Request-ID')
    const validIncoming = incoming && SAFE_ID_RE.test(incoming) ? incoming : null

    const id = validIncoming || randomUUID()

    res.locals.traceId = id

    res.setHeader('X-Request-ID', id)

    next()
}