const { Blog } = require('../models/index')
const { User } = require('../models/index')
const jwt = require('jsonwebtoken')
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
      } else if (error.name === 'SequelizeValidationError') {
        return response.status(400).json({ error: error.message })
      } else if (error.name === 'MissingTokenError' ||
         error.name === 'InvalidAuthHeaderError' ||
         error.name === 'InvalidTokenError'
      ) {
        return response.status(401).json({
          error: error.message
        })}
    
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

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (!authorization) {
    const missingTokenError = new Error('token is missing')
    missingTokenError.name = 'MissingTokenError'
    next(missingTokenError)
    }
    if (!authorization.startsWith('Bearer ')) {
      const authHeaderError = new Error('invalid authorization header')
      authHeaderError.name = 'InvalidAuthHeaderError'
      next(authHeaderError)
    } 
    const token = authorization.replace('Bearer ', '')
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!decodedToken.id) {
        const invalidTokenError = new Error('invalid token error')
        invalidTokenError.name = 'InvalidTokenError'
        next(invalidTokenError)
      }
    request.decodedToken = decodedToken

  next()
}



module.exports = {
    blogFinder, userFinder, tokenExtractor, requestLogger, errorHandler, unknownEndpointHandler
}