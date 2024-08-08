const allowedOrigins = new Set([
  'http://localhost:5173'
])

const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin
  console.log('ORIGIN:', origin)
  const isAllowed = allowedOrigins.has(origin)
  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  } else res.setHeader('Access-Control-Allow-Origin', '')
  res.removeHeader('X-Powered-By')
}

export const cors = (req, res, next) => {
  setCorsHeaders(req, res)
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
  next()
}
