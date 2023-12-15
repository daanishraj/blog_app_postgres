const { User } = require('../models/index')
const router = require('express').Router()
const { SECRET } = require('../utils/config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/', async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })

    if (! user) {
        return res.status(401).json({ error: 'username is invalid' })
    }

    const { username, password } = req.body

    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

    if (! isPasswordCorrect) {
        return res.status(401).json({ error: 'invalid password' })
    }


    const userForToken = {
        username,
        id: user.id
    }

    const token = jwt.sign(userForToken, SECRET)

    return res
    .status(200)
    .send({ token,
        username: user.username,
        name: user.name
    })
})

module.exports = router