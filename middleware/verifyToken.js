const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Missing token' })
  }

  try {
    const decoded = jwt.verify(
      token.replace('Bearer ', ''),
      process.env.JWT_SECRET,
    )
    req.user = decoded

    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ error: 'Unauthorized - Invalid token' })
  }
}

module.exports = verifyToken
