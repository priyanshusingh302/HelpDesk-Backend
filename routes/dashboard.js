const express = require('express')
const verifyToken = require('../middleware/verifyToken')

const router = express.Router()

router.get('/', verifyToken, (req, res) => {
  const { userId, name, email } = req.user

  res.json({
    message: 'Welcome to the dashboard!',
    user: { userId, name, email },
  })
})

module.exports = router
