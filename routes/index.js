const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const parkController = require('../controllers/parkController')

//User routes
router.get('/', userController.index)
router.get('/new', userController.new)
router.post('/', userController.create)
router.get('/:userId', userController.show)
router.get('/:userId/edit', userController.edit)
router.put('/:userId', userController.update)
router.delete('/:userId', userController.delete)


//Park routes
router.get('/:userId/parks', parkController.index)
router.post('/:userId/parks', parkController.create)
router.get('/:userId/parks/new', parkController.new)
router.get('/:userId/parks/:parkId', parkController.show)
router.get('/:userId/parks/:parkId/edit', parkController.edit)
router.put('/:userId/parks/:parkId', parkController.update)
router.delete('/:userId/parks/:parkId', parkController.delete)



module.exports = router