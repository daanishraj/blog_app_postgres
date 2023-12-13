const { Blog } = require('../models/index')
const { User } = require('../models/index')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

const unknownEndpointHandler = (request, response) => {
 response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
      } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
      }

    next(error)
}

const blogFinder = async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id)
    req.blog = blog
    next()
}

const userFinder = async (req, res, next) => {
  const user =await User.findOne({
    where: {
        username: req.params.username
    }
})
  req.user = user
  next()
}

module.exports = {
    blogFinder, userFinder, requestLogger, errorHandler, unknownEndpointHandler
}