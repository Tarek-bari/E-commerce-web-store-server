const User = require('../model/user')

const handleLogout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt


    const user = await User.findOne({ refreshToken })
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
        return res.sendStatus(204)
    }

    user.refreshToken = user.refreshToken.filter(rt => rt !== refreshToken)

    await user.save()

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.sendStatus(204)
}

module.exports = { handleLogout }