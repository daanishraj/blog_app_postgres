require('dotenv').config()
const {Sequelize, QueryTypes} = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL)

const main = async () => {
    try {
        await sequelize.authenticate()
        console.log('connection to db has been established')
        const blogs = await sequelize.query("SELECT * FROM blogs", {
            type: QueryTypes.SELECT
        })
        blogs.map(blog => console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`))
        sequelize.close()

    } catch (error){
        console.error('Error connecting to the database', error)
    }
}

main()

