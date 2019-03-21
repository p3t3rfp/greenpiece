const express = require('express')
const User = require('../models/User')
const Park = require('../models/Park')

const parkController = {
    index: (req, res) => {
        User.findById(req.params.userId).then((user) => {
            res.json(user)
        }).catch((err) => {
            console.log(err)
        })
    },

    show: (req, res) => {
        User.findById(req.params.userId).then(user => {
            res.json(user)
        }).catch((err) => {
            console.log(err)
        })
    },

    create: (req, res) => {
        User.findById(req.params.userId).then((user) => {
            const newPark = new Park({})
            user.parks.push(newPark)

            user.save().then(user => {
                res.json(newPark)

            })
        })
    },

    update: (req, res) => {
        Park.findByIdAndUpdate(req.params.parkId, req.body, { new: true })
            .then(() => {
                res.redirect(`/${req.params.userId}/parks`)
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