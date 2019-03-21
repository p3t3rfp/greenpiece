const mongoose = require('../db/connection')
const Schema = mongoose.Schema

const ParkSchema = new Schema ({
    name: String,
    neighborhood: String,
    playground: Boolean,
    dogs: Boolean,
    image: String,
})

const UserSchema = new Schema ({
    name: String,
    password: String,
    parks: [ParkSchema]
})

module.exports = {
    ParkSchema: ParkSchema,
    UserSchema: UserSchema,
}
