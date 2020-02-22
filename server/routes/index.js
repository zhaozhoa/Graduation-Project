var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

//  连接 mongoodb 数据库
mongoose.connect('mongodb://localhost/tiaoZao', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected success');
})
mongoose.connection.on('error', () => {
  console.log('Mongoose connected fail');
})
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connected disconnected')
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
