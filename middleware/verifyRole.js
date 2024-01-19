const verifyRole = (req, res, next) => {
    if (!req?.isAdmin) return res.sendStatus(401)
    if (req.isAdmin === true) {
        next()
    } else {
        return res.sendStatus(401)
    }
}

module.exports = verifyRole