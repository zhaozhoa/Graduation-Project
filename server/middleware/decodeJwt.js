module.exports = option => {
  const jwt = require('jsonwebtoken')
  const User = require('../models/user')
  const fs = require('fs')
  const assert = require('http-assert')
  let secret = fs.readFileSync(__dirname + '../../.secret').toString()
  return async (req, res, next) => {
    const token = req.headers.authorization
    if (token) {
      // token 解密
      try {
        tokenData = jwt.verify(token.split(' ').pop(), secret)
        let {
          _id
        } = await User.findById(tokenData._id)
        req._id = _id
        assert(req._id, 401, '请先登陆')
        next()
      } catch (error) {
        console.log(error);
        
        res.status(403).json({
          code: 1,
          msg: '登陆失效，请重新登陆'
        })
        return
      }
    } else {
      assert(false, 401, '没有登陆')
    }
  }
}