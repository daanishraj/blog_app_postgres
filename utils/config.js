require('dotenv').config()

const config = {
    DATABASE_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3001
}

module.exports = config