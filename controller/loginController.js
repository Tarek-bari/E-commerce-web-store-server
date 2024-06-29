const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ status: 'fail', data: { Message: "Email and password are required" } })

    const email_pure = email.trim()

    const user = await User.findOne({ "email": email_pure })
    if (!user) return res.status(401).json({ status: 'fail', data: { Message: 'There is no account register with email you provided' } })

    const machPassword = await bcrypt.compare(password, user.password)
    if (machPassword) {
        const Token = jwt.sign(
            {
                "id": user.id,
                "isAdmin": user.isAdmin
            },
            process.env.TOKEN_SECRET,
            { expiresIn: '1h' }
        )
        const Refresh_Token = jwt.sign(
            { "id": user.id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        )

        user.refreshToken = [Refresh_Token]
        await user.save()

        res.cookie('jwt', Refresh_Token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 })
        res.status(201).json({ status: 'success', data: { role: user.isAdmin, token: Token, user: user.username, id: user.id } })
    } else {
        res.status(401).json({ status: 'fail', data: { Message: 'Make sure about you password' } })
    }
}

module.exports = { handleLogin }