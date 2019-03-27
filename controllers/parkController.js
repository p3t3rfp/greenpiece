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
            Park.find().then((parks) => {
                res.json(parks)
            })
            res.json(user)
        }).catch((err) => {
            console.log(err)
        })
    },

    showPark: (req, res) => {
        Park.findById(req.params.parkId).then(park => {
            res.json(park)
        }).catch((err) => {
            console.log(err)
        })
    },
    
    userShowPark: (req, res) => {
        User.findById(req.params.userId).then(user => {
            const park = user.parks.id(req.params.parkId)
            res.json(park)
        }).catch((err) => {
            console.log(err)
        })
    },

    create: (req, res) => {
        User.findById(req.params.userId).then((user) => {
            Park.create(req.body)
            .then((newPark) => {
                console.log(newPark)
                user.parks.push(newPark)
                user.save()
                res.json(newPark)
            })
        })
    },

    update: (req, res) => {
        Park.findByIdAndUpdate(req.params.parkId, req.body, { new: true })
            .then((park) => {
                // res.redirect(`/user/${req.params.userId}/parks`)
                res.json(park)
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