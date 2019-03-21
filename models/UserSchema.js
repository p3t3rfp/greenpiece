const { UserSchema } = require('../db/schema')
const mongoose = require('../db/connection')

module.exports = mongoose.model('User', UserSchema)
