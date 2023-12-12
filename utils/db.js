const { Sequelize } = require('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDatabase = async () => {
    try {
        sequelize.authenticate()
        console.log('connected to the database')

    } catch (error) {
        console.log('connection to database failed')
        return process.exit(1)
    }

    return null
}

module.exports = {
    sequelize, 
    connectToDatabase
}