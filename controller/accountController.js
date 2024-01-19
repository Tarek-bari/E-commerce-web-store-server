const User = require('../model/user')

// get profile
const getProfile = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ status: 'fail', data: { Message: 'Id required' } })
    const user = await User.findOne({ id: req.params.id })
    if (!user) return res.sendStatus(204)
    if (req.id == req.params.id) {
        const profile = {
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
            phone: user.phone
        }
        return res.status(200).json({ status: 'success', data: profile })
    } else {
        return res.status(401).json({ status: 'fail', data: { Message: 'You have not permission to get information' } })
    }
}

// update profile
const updateProfile = async (req, res) => {
    if (!req?.body?.id) return res.status(401).json({ status: 'fail', data: { Message: 'Id required' } })
    const user = await User.findOne({ id: req.body.id })
    if (!user) return res.sendStatus(204)
    if (req.id == req.body.id) {
        if (req.body.firstname) user.firstname = req.body.firstname
        if (req.body.lastname) user.lastname = req.body.lastname
        if (req.body.username) user.username = req.body.username
        if (req.body.email) user.email = req.body.email
        if (req.body.phone) user.phone = req.body.phone
        await user.save()
        return res.status(201).json({ status: 'success', data: 'Profile Updated' })
    } else {
        return res.status(401).json({ status: 'fail', data: { Message: 'You have not permission to modify' } })
    }
}

// delete profile
const deleteProfile = async (req, res) => {
    if (!req?.body.id) return res.status(401).json({ status: 'fail', data: { Message: 'You have not permission' } })
    const user = await User.findOne({ id: req.body.id })
    if (!user) return res.sendStatus(204)
    if (req.id == req.body.id) {
        await user.deleteOne()
        res.json({ status: 'success', data: 'Profile deleted' })
    } else {
        return res.status(401).json({ status: 'fail', data: { Message: 'You have not permission to delete' } })
    }
}

// getAllProfiles controller for admins
const getAllUsers = async (req, res) => {
    if (req.id && req.isAdmin == true) {
        const users = await User.find()
        if (!users || users.length === 0) return res.sendStatus(204)
        const usersList = users.map((user) => {
            const usrObject = {
                username: user.username,
                email: user.email,
                phone: user.phone
            }
            return usrObject
        })
        return res.status(200).json({ status: 'success', data: usersList })
    } else {
        return res.status(401).json({ status: 'fail', data: { Message: 'You have not permission to show users list' } })
    }
}

module.exports = { getProfile, updateProfile, deleteProfile, getAllUsers }