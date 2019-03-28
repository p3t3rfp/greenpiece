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
            res.json({parks: user.parks})
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
                user.parks.push(newPark)
                user.save()
                res.json(newPark)
            })
        })
    },

    update: (req, res) => {
        Park.findByIdAndUpdate(req.params.parkId, req.body, { new: true })
            .then((park) => {
                res.json(park)
            }).catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },

    userParkUpdate: (req, res) => {
        User.findById(req.params.userId)
        .then((user) => {
            if(user.parks.indexOf(req.params.parkId) < 0) {
                res.json({'msg': 'No Park'})
                return
            }
            Park.findById(req.params.parkId).then(park => {
                const parkIndex = user.parks.findIndex(userPark => userPark._id.toString() === req.params.parkId)
                user.parks = [...user.parks.slice(0, parkIndex), park, ...user.parks.slice(parkIndex)]
                user.save()
                .then(() => {
                    res.json(req.params.parkId)
                })
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    delete: (req, res) => {
        Park.findByIdAndDelete(req.params.parkId).then(() => {
            res.json({
                msg: 'Successfully Deleted'
            })
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    userParkDelete: (req, res) => {
        User.findById(req.params.userId).then((user) => {

            const newParks = user.parks.filter(park => park._id.toString() !== req.params.parkId)
            user.parks = newParks
            user.save()
            .then(() => {
                res.json(req.params.parkId)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
        })
    }
}

module.exports = parkController