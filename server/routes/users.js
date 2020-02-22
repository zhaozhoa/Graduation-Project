const express = require('express')
//引入 数据库 Schema
const User = require('../models/user')
const md5 = require('blueimp-md5')
const router = express.Router()
const svgCaptcha = require('svg-captcha');


// 检查注册的用户名是否已经存在
router.post('/hasUserName', async (req, res) => {
  
  let {
    userName
  } = req.body

  try {
    let result = await User.findOne({
      userName
    })
    if (!result) {
      res.json({
        code: 0,
        msg: 'ok'
      })
    } else {  
      res.json({
        code: 1,
        msg: '用户已存在',
        data: {
          phone: result.phone,
          userName
        }
      })
    }
  } catch (error) {
    console.log(`用户查询：${error}`);
    res.json({
      code: -1,
      msg: '数据库查询失败'
    })
  }
  
})



router.post('/register', async (req, res) => {
  let {
    userName,
    password,
    phone
  } = req.body
  let user = new User ({
    userName,
    password: md5(password),
    phone
  })
  try {
    let result = await user.save()
    if (result) {
      res.json({
        code:0,
        msg: 'ok'
      })
    }else {
      res.json({
        code:1,
        msg:'error'
      })
    }
    
  } catch (error) {
    console.log(`注册${error}`);
    res.json({
      code: 1,
      msg: 'error'
    })
  }
})

// 获取图片验证码
router.get('/verificationPic', (req, res) => {
  
   let codeConfig = {
     size: 4, // 验证码长度
     ignoreChars: '0o1i', // 验证码字符中排除 0o1i
     noise: 2, // 干扰线条的数量
     height: 37.5,
     width: 101

   }
   let captcha = svgCaptcha.create(codeConfig);

   req.session.captcha = captcha.text.toLowerCase(); //存session用于验证接口获取文字码

   let codeData = {
     img: captcha.data
   }
   res.json(codeData);
})

router.post('/login',  async (req, res) => {
  let {userName, password, code} = req.body
  if(req.session.captcha !== code.toLowerCase()) {
    res.json({
      code: 2,
      msg: '验证码有误'
    })
    return
  }
  let data = await User.findOne({userName})
  
  if (!data) {
    res.json({
      code:1,
      msg: '用户名和密码不匹配'
    })
    return
  }
  if (data.password !== md5(password)) {
    res.json({
      code: 1,
      msg: '用户名和密码不匹配'
    })
    return
  }
  res.json({
    code: 0,
    msg: 'ok',
    data: {
      userName,
      phone: data.phone
    }
  })
  req.session.user = userName
  
})

// 获取短信验证码
let phoneCode
router.post('/phoneVerification', async (req, res) => {
  phoneCode = parseInt(Math.random() * 10000)
  res.json({
    data: phoneCode
  })
})

// 校验短信验证码
router.post('/checkPhoneVerification', async (req, res) => {
  let {code} = req.body
  if (parseInt(code) === phoneCode) {
    res.json({
      code: 0,
      msg: 'ok',
      data: ''
    })
  } else {
    res.json({
      code: 1,
      msg: '验证码错误',
      data: ''
    })
  }
})

// 修改密码
router.post('/resetPassword', async (req, res) => {
  
})

module.exports = router
