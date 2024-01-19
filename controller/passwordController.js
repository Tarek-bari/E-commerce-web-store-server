const User = require('../model/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')


const sendMsg = async (req, res) => {
    const { email } = req.body

    if (!email) return res.status(400).json({ status: 'fail', data: { Message: 'email are required' } })

    const email_pure = email.trim()

    const user = await User.findOne({ "email": email_pure })

    if (!user) return res.sendStatus(204)

    const resetToken = jwt.sign(
        { "id": user.id, "password": user.password },
        process.env.TOKEN_SECRET,
        { expiresIn: '15m' }
    )
    const secret = `${user.id}@${resetToken}`

    // send email secret
    const transpoter = nodemailer.createTransport({
        service: "outlook",
        auth: {
            user: process.env.OWNER_EMAIL,
            pass: process.env.OWNER_EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: "mhmdbari@outlook.com",
        to: user.email,
        subject: "Reset Password",
        html: `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset password</title>
        </head>
        <style>
            * {
                box-sizing: border-box;
            }
        
            div {
        
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                flex-wrap: wrap;
                max-width: 600px;
                background: #999;
                padding: 15px;
            }
        
            h1 {
                font-weight: bold;
                text-align: center;
            }
        
            p {
                padding: 5px;
                text-align: center;
            }
        </style>
        
        <body>
            <div>
                <h1>Copy the text for reset your password</h1>
                <p>${secret}</p>
            </div>
        </body>
        
        </html>`
    }

    transpoter.sendMail(mailOptions, (error, success) => {
        if (error) {
            return res.status(401).json({ status: 'fail', data: { Message: `Send message fail ${error}` } })
        } else {
            return res.status(200).json({ status: "success", data: { Message: `check your email box and copy the text "${success.response}"` } })
        }
    })

}

const verifyMsgAndCreateNewPassword = async (req, res) => {
    const { Msg, newPwd } = req.body
    if (!Msg) return res.status(400).jaon({ status: 'fail', data: { Message: 'Message required' } })
    const id = Msg.split('@')[0]
    const resetToken = Msg.split('@')[1]
    const user = await User.findOne({ "id": id })
    if (!user) return res.status(403).json({ status: 'fail', data: { Message: 'User not found' } })

    jwt.verify(
        resetToken,
        process.env.TOKEN_SECRET,
        async (err, decoded) => {
            if (err || user.password !== decoded.password) return res.status(403).json({ status: 'fail', data: { Message: 'Code expires' } })
            if (user.id = decoded.id) {
                const hachpwd = await bcrypt.hash(newPwd, 10)
                user.password = hachpwd
                await user.save()
                return res.status(201).json({ status: "success", data: { Message: "Password updated" } })
            }
        }
    )


}



const changePassword = async (req, res) => {
    const { id, oldPwd, newPwd, confirmNewPwd } = req.body
    if (!id || !newPwd || !confirmNewPwd) return res.status(400).json({ status: 'fail', data: { Message: 'All params are required' } })
    if (req.id == id) {
        const user = await User.findOne({ id: id })
        if (!user) return res.sendStatus(204)
        const matchPassword = await bcrypt.compare(oldPwd, user.password)
        if (matchPassword && newPwd === confirmNewPwd) {
            const hachNewPwd = await bcrypt.hash(newPwd, 10)
            user.password = hachNewPwd
            await user.save()
            return res.status(201).json({ status: 'success', data: { Message: 'Password updated' } })
        } else {
            return res.status(401).json({ status: 'fail', data: { Message: 'Make sure about your old password and the new' } })
        }
    } else {
        return res.status(401).json({ status: 'fail', data: { Message: 'You have not permission' } })
    }
}







module.exports = { sendMsg, verifyMsgAndCreateNewPassword, changePassword }