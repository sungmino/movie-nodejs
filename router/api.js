const express = require('express');
const router = express.Router();
const filmModel = require('../service/film.model');
// set up express app
const app = express();
router.get('/ninjas', function(req, res){
  res.send({type: 'GET'});
});
router.post('/', (req, res) => {
  console.log(req.body)
})
module.exports = router;