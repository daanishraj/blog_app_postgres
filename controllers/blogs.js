const blogRouter = require('express').Router()
const { Blog } = require('../models/index')
const { blogFinder } = require('../utils/middleware')

blogRouter.get('/', async (req, res)=> {
    const blogs = await Blog.findAll()
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

blogRouter.post('/', async (req, res)=> {
    try {
        console.log(req.body)
        const newBlog = await Blog.create(req.body)
        return res.json(newBlog)
    } catch (error) {
        return res.status(400).json({error})
    }
})

blogRouter.get('/:id', blogFinder, async (req, res) => {
    const blog =req.blog
    if (blog) {
        console.log(blog.toJSON())
        res.json(blog)
    } else {
        res.status(404).json({error: 'Invalid id'})
    }

})

blogRouter.delete('/:id', blogFinder, async (req, res) => {
     const blog =req.blog
        if (blog) {
            console.log(JSON.stringify(blog))
            await blog.destroy()
            return res.status(204).end()
        }  else {
            return res.status(404).end()
        }
})

module.exports = blogRouter