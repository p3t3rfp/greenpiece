const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const parkController = require('../controllers/parkController')

//User routes
router.get('/', userController.index)
router.post('/', userController.create)
router.get('/user/:userId', userController.show)
router.put('/user/:userId', userController.update)
router.delete('/user/:userId', userController.delete)


//Park routes
router.get('/parks', parkController.index)
router.get('/parks/:parkId', parkController.showPark)
router.get('/user/:userId/parks', parkController.userIndex)
router.post('/user/:userId/parks', parkController.create)
router.get('/user/:userId/parks/:parkId', parkController.userShowPark)
router.put('/parks/:parkId', parkController.update)
router.delete('/parks/:parkId', parkController.delete)



module.exports = router