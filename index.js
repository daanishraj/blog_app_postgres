require('dotenv').config()
const express = require('express')
const {Sequelize, Model, DataTypes} = require('sequelize')
const app = express()

app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL)


class Blog extends Model{}
Blog.init ({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: DataTypes.TEXT
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'blog'
}
)

Blog.sync()

app.get('/api/blogs', async (req, res)=> {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

app.post('/api/blogs', async (req, res)=> {
    try {
        console.log(req.body)
        const newBlog = await Blog.create(req.body)
        return res.json(newBlog)
    } catch (error) {
        return res.status(400).json({error})
    }
})

app.get('/api/blogs/:id', async (req, res) => {
    const blog = await Blog.findByPk(req.params.id)
    if (blog) {
        console.log(blog.toJSON())
        res.json(blog)
    } else {
        res.status(404).json({error: 'Invalid id'})
    }

})

app.delete('/api/blogs/:id', async (req, res) => {
        const blog = await Blog.findByPk(req.params.id)
        if (blog) {
            console.log(JSON.stringify(blog))
            await blog.destroy()
            return res.status(204).end()
        }  else {
            return res.status(404).end()
        }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})

