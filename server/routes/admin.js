const express = require('express');
const router = express.Router();
const md5 = require('blueimp-md5')
const jwt = require('jsonwebtoken')
const decodeJwt = require('../middleware/decodeJwt')
const assert = require('http-assert')

const Admin = require('../models/admin')
const { secret:jwtsecret } = require('../utils/getSecret')

const {
  host2: host
} = require('../utils/getLocalIp')




/* login*/
router.post('/login', async (req, res) => {
  
  let {
    account,
    password
  } = req.body

  let data = await Admin.findOne({
    account
  }, {password: 1})
  
  assert(data, 422, '用户名和密码不匹配')
  assert(data.password === md5(password), 422, '用户名和密码不匹配')
  let cecret = await jwtsecret
  // 用户_id 存入 token
  const token = jwt.sign({
    _id: data._id
  }, cecret, {
     expiresIn: '1h'
  })
  
  res.json({
    code: 0,
    msg: 'ok',
    data: {
      token
    }
  })

});

router.get('/info', decodeJwt(Admin), async (req, res) => {
  let {
    _id
  } = req
  let result = await Admin.findById(_id)
  result.avatar = host + result.avatar
  res.json({
    code: 0,
    msg: 'ok',
    data: result
  })
  
})


module.exports = router;
