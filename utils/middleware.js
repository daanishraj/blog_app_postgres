const { Blog } = require('../models/index')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }

const blogFinder = async (req, res, next) => {
    const blog = await Blog.findByPk(req.params.id)
    req.blog = blog
    next()
}

module.exports = {
    blogFinder, requestLogger
}