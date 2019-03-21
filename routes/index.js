const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const parkController = require('../controllers/parkController')

router.get('/', userController.index)
router.post('/', userController.create)
router.get('/:userId', userController.show)
router.post('/:userId', userController.delete)


//Park routes
router.get('/user/parks', parkController.index)
router.get('/:userId/parks/:parkId', parkController.index)


