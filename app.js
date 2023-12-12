const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)

module.exports = app
