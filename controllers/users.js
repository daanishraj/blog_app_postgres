const bcrypt = require('bcrypt')
const router = require('express').Router()
const { User } = require('../models/index')
const { userFinder } = require('../utils/middleware')
const SALT_ROUNDS = 1

router.get('/', async (req, res) => {
    const users = await User.findAll()
    console.log(JSON.stringify(users, null, 2))
    res.json(users)
})

router.post('/', async (req, res) => {
    const { username, password, name } = req.body
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const user = User.build({ username, passwordHash, name})
    console.log(user.toJSON())
    await user.save()
    res.status(201).json(user)
})

router.get('/:username', userFinder, async (req, res)=> {
const user = req.user

if (user) {
    console.log(user.toJSON())
    return res.json(user)
}

return res.status(404).json({ error: 'invalid username'})

})

router.put('/:username', userFinder, async (req, res) => {
    const user = req.user
    if (user) {
        user.username = req.body.username
        await user.save()
        return res.status(200).json(user)
    } 
    return res.status(404).json({ error: 'invalid username' })
})

router.delete('/:username', userFinder, async (req, res) => {
    const user = req.user
        if (user) {
            console.log(JSON.stringify(user))
            await user.destroy()
            return res.status(204).end()
        }  else {
            return res.status(404).end()
        }
})


module.exports = router