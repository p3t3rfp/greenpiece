require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

const Park = require('../models/ParkSchema')
const User = require('../models/UserSchema')


const Park1 = new Park({
    name: "Freedom Park",
    neighborhood: 'L5P',
    playground: true,
    dogs: true,
    image: 'http://candlerpark.org/wp-content/uploads/Freedom-Park-300x222.jpg',
})

const Park2 = new Park({
    name: "Brownwood Park",
    neighborhood: 'EAV',
    playground: true,
    dogs: false,
    image: 'http://cdn.expcloud.co/files/sites/888/2014/12/Brownwood-Park-Playground.jpg'
})

const Park3 = new Park({
    name: "Piedmont Park",
    neighborhood: 'Midtown',
    playground: true,
    dogs: true,
    image: 'https://www.piedmontpark.org/wp-content/uploads/2017/01/piedmont-park.jpg'
})

const testUser1 = new User({
    name: 'testy',
    password: 'funone',
    parks: [Park1, Park2]
})

const testUser2 = new User({
    name: 'bob',
    password: '4',
    parks: [Park3]
})



User.deleteMany({})
    .then(() => Park.deleteMany({}))
    .then(() => User.create(testUser1, testUser2))
    .then(() => Park.create(Park1, Park2, Park3))
    .catch((err) => console.log(err))
    .then(() => mongoose.connection.close())