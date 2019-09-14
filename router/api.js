const express = require('express')
const router = express.Router()
// set up express app
const app = express()
app.get('/ninjas', function (req, res) {
  res.send({ type: 'GET' })
})
app.post('/', (req, res) => {
  console.log(req.body)
})
module.exports = router
