const whitelist = require('./whitelist')

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by cors'))
        }
    },
}

module.exports = corsOptions