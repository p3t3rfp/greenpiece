const express = require('express')
const logger = require('morgan')
const app = express()
const routes = require('./routes/index')

app.use(logger('dev'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// app.get('/', (req, res) => {
//     res.send("This Is Working")
//   })

app.use('/', routes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('App is up and running on port ' + PORT)
})