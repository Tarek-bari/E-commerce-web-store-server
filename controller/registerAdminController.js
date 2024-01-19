const User = require('../model/user')
const bcrypt = require('bcrypt')
const crypto = require('crypto')


const handleNewAdmin = async (req, res) => {
    const { firstname, lastname, username, email, password, phone } = req.body
    if (!firstname || !lastname || !username || !email || !password || !phone) {
        return res.status(400).json({ status: 'fail', data: { Message: "All params are required" } })
    }

    const pureInformation = (element) => {
        return element.trim()
    }

    const check_duplicate_username = await User.findOne({ "username": pureInformation(username) })
    const check_duplicate_email = await User.findOne({ "email": pureInformation(email) })
    const check_duplicate_phone = await User.findOne({ "phone": pureInformation(phone) })

    if (check_duplicate_email || check_duplicate_phone || check_duplicate_username) {
        return res.status(409).json({ status: 'fail', data: { Message: "Information have used before" } })
    }

    try {
        const hachPassword = await bcrypt.hash(password, 10)

        await User.create({
            "id": crypto.randomUUID(),
            "firstname": pureInformation(firstname),
            "lastname": pureInformation(lastname),
            "username": pureInformation(username),
            "email": pureInformation(email),
            "password": hachPassword,
            "phone": pureInformation(phone),
            "isAdmin": true
        })

        res.status(201).json({ status: 'Success', data: { Message: `Admin ${username} created` } })

    } catch (error) {
        res.status(500).json({ status: 'fail', data: { Message: error.message } })
    }
}

module.exports = { handleNewAdmin }