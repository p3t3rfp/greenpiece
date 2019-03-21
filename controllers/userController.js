const express = require('express')
const User = require('../models/User')

const userController = {
    index: (req,res) => {
        User.find().then((user) => {
            res.json(user)
        }).catch((err) => {
            console.log(err)
        })
    },

    show: (req,res) => {
        User.findById(req.params.userId).then(user => {
            res.json(user)
        }).catch((err) => {
            console.log(err)
        })
    },

    create: (req,res) => {
        const newUser = new User(req.body.user)
        newUser.save().then((user) => {
            res.json(user)
        }).catch((err) => {
            console.log(err)
        })
    },

    update: (req,res) => {
        User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
            .then(() => {
                res.redirect(`/${req.params.userId}`)
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },

    delete: (req,res) => {
        User.findByIdAndDelete(req.params.userId).then(() => {
            res.json({
                msg: 'Successfully Deleted'
            }).catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
        })
    }
}

module.exports = userController