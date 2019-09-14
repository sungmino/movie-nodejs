const express = require('express')
const bodyParse = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 9000
const films = require('./router/films')
const { url } = require('./data/database')
const { client } = require('./data/redis.connect')
// xu ly error
client.on('error', error => {
  console.log(error.message)
})
// connection redis
client.on('connect', () => {
  console.log('redis connected...')
})

app.use(bodyParse.json())
app.use(express.urlencoded({ extended: true }))

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
app.get('/', (req, res) => {
  res.send(`Listening on ${PORT}`)
})

// connect to mongodb
console.log(url)
mongoose.connect(url, { useNewUrlParser: true }).then(
  () => { console.log(`connected to ${url}`) },
  error => { throw error }
)
// Error handler
app.use(function (req, res, next) {
  res.locals.session = req.session
  next()
})
// router
app.use('/api/films', films)
module.exports = app
