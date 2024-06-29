const User = require('../model/user')
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.status(401).json({ status: 'fail', data: { Message: 'session expires' } })
    const refreshToken = cookies.jwt

    const user = await User.findOne({ refreshToken })
    if (!user) return res.status(403).json({ status: 'fail', data: { Message: 'session expires' } })

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (error, decoded) => {
            if (error || user.id !== decoded.id) return res.sendStatus(403)
            const Token = jwt.sign(
                {
                    "id": decoded.id,
                    "isAdmin": decoded.isAdmin
                },
                process.env.TOKEN_SECRET,
                { expiresIn: '2m' }
            )

            res.json({ sataus: 'success', data: Token })
        }
    )
}

module.exports = { handleRefreshToken }