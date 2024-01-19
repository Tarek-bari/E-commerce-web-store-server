const jwt = require('jsonwebtoken')

const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401)
    const token = authHeader.split(' ')[1]

    console.log(token)

    jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        (error, decoded) => {
            if (error) return res.sendStatus(403)
            req.id = decoded.id
            req.isAdmin = decoded.isAdmin
            next()
        }
    )
}

module.exports = verifyJwt