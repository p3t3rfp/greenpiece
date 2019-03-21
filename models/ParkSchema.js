const { ParkSchema } = require('../db/schema')
const mongoose = require('../db/connection')

module.exports = mongoose.model('Park', ParkSchema)