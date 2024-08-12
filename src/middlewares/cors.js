const allowedOrigins = new Set([
  'http://localhost:5173',
  'https://condominio-fe.onrender.com',
  'https://n4-pf-incidentes-fe.vercel.app'
])

const setCorsHeaders = (req, res) => {
  const origin = req.headers.origin || req.headers.host
  console.log('ORIGIN:', origin)
  const isAllowed = allowedOrigins.has(origin)
  if (isAllowed) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  } else res.setHeader('Access-Control-Allow-Origin', '')
  res.removeHeader('X-Powered-By')
}

const cors = (req, res, next) => {
  setCorsHeaders(req, res)
  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }
  next()
}

export default cors
