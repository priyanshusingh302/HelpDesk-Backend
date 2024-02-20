const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const verifyToken = require('./middleware/verifyToken');
const dashboardRoutes = require('./routes/dashboard'); 

const app = express()

// Connect to MongoDB Atlas
mongoose
  .connect(
    process.env.MongoDB_cred,
  )
  .then(() => {
    console.log('Connected to MongoDB Atlas')
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error)
    process.exit(1)
  })

// Middleware for parsing JSON
app.use(bodyParser.json())

// Routes
app.use('/auth', authRoutes)
app.use('/dashboard', dashboardRoutes, verifyToken)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
