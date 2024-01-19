const router = require('express').Router()
const { Blog, User } = require('../models/index')
const { blogFinder, tokenExtractor } = require('../utils/middleware')

router.get('/', async (req, res)=> {
    const blogs = await Blog.findAll({
        include: {
            model: User,
            attributes: ['name']
        },
        attributes: { exclude: ['userId']}
    })
    console.log(JSON.stringify(blogs, null, 2))
    res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res)=> {
        console.log(req.body)
              
        const { title, url } = req.body

        if (!title || !title.trim()) {
          return response.status(400).json({ error: 'title is missing' })
        }
      
        if (!url || !url.trim()) {
          return response.status(400).json({ error: 'url is missing' })
        }

        const userId = req.decodedToken.id
        const user = await User.findByPk(userId)
        
        const newBlog = Blog.build(req.body)
        newBlog.userId = user.id
        await newBlog.save()
        return res.json(newBlog)
})

router.get('/:id', blogFinder, async (req, res) => {
    const blog =req.blog
    if (blog) {
        console.log(blog.toJSON())
        res.json(blog)
    } else {
        res.status(404).json({error: 'Invalid id'})
    }

})

router.delete('/:id', blogFinder, async (req, res) => {
     const blog =req.blog
        if (blog) {
            console.log(JSON.stringify(blog))
            await blog.destroy()
            return res.status(204).end()
        }  else {
            return res.status(404).end()
        }
})

router.put('/:id', blogFinder, async (req, res) => {
    const blog = req.blog
    if (blog) {
        blog.likes = req.body.likes
        await blog.save()
        res.status(200).json(blog)
    } else {
        res.status(404).json({error: 'Invalid id'})
    }
})

module.exports = router