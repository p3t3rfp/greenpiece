const mongoose = require('./connection')
const Schema = mongoose.Schema

const ParkSchema = new Schema ({
    name: {
        type: String,
        default: 'Park Name'
    },
    neighborhood: String,
    playground: Boolean,
    dogs: Boolean,
    image: {
       type: String,
        default: 'https://via.placeholder.com/250' 
    }
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
