const User = require('../models/UserSchema')
const Park = require('../models/ParkSchema')

const parkController = {
    index: (req, res) => {
        Park.find().then((parks) => {
            res.json(parks)
        }).catch((err) => {
            console.log(err)
        })
    },

    userIndex: (req,res) => {
        User.findById(req.params.userId).then((user) => {
            res.json(user.parks)
        }).catch((err) => {
            console.log(err)
        })
    },

    show: (req, res) => {
        Park.findById(req.params.parkId).then(park => {
            res.json(park)
        }).catch((err) => {
            console.log(err)
        })
    },

    create: (req, res) => {
        User.findById(req.params.userId).then((user) => {
            const newPark = new Park({})
            user.parks.push(newPark)

            user.save().then(() => {
                res.json(newPark)

            })
        })
    },

    update: (req, res) => {
        Park.findByIdAndUpdate(req.params.parkId, req.body, { new: true })
            .then(() => {
                res.redirect(`/user/${req.params.userId}/parks`)
            }).catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    delete: (req, res) => {
        Park.findByIdAndDelete(req.params.parkId).then(() => {
            res.json({
                msg: 'Successfully Deleted'
            }).catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
        })
    }
}

module.exports = parkController