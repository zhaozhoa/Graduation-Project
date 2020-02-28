const express = require('express')
const path = require('path');
//引入 数据库 Schema
const Info = require('../models/info')
const router = express.Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')
const assert = require('http-assert')
// 引入封装的解析jwt的中间件
const decodeJwt = require('../middleware/decodeJwt')
const upload = multer({
  dest: path.join(__dirname, '../', 'uploads')
})

const host = 'http://localhost:3000'

// 读取 token 签名
// 读取取token的加密文件

let secret
fs.readFile(__dirname + '../../.secret', (err, data) => {
  if (err) {
    console.log(err);
    return
  } else {
    secret = data.toString()
  }
})

// 检查注册的用户名是否已经存在
router.post('/publise', decodeJwt(), upload.array('file', 5), async (req, res) => {
  /**
   * 1. 通过token 拿到用户_id
   * 2. 拿到上传的图片地址并放到数组里面
   * 3. 插入发布信息
   */
  let {
    _id: owner_id
  } = req
  let img = []
  if (req.files.length !== 0) {
    req.files.forEach(item => {
      img.push(`${host}/uploads/${item.filename}`)
    })
  }
  let {
    category,
    title,
    price,
    description,
    contact
  } = req.body

  let info = new Info({
    category,
    title,
    price,
    description,
    owner_id,
    img,
    contact
  })
  try {
    let result = await info.save()
    if (result) {
      res.json({
        code: 0,
        msg: 'ok'
      })
    } else {
      res.status(500).json({
        code: 1,
        msg: 'error'
      })
    }
  } catch (err) {
    assert(false, 500, '服务器忙')
  }
})



// 获取用户信息
router.post('/getUserData', decodeJwt(), async (req, res) => {
  let {
    _id
  } = req
  try {
    let result = await User.findOne({
      _id
    }, {
      nickName: 1,
      avatar: 1
    })
    if (result) {
      res.json({
        code: 0,
        msg: 'ok',
        data: result
      })
    } else {
      assert(false, 500, '服务器出错')
    }

  } catch (err) {
    console.log(err);
    assert(false, 500, '服务器出错')

  }

})

// 上传用户头像
router.post('/uploadAvatar', decodeJwt(), upload.single('file'), async (req, res) => {
  assert(req.file, '413', '上传失败')
  let path = `${host}/uploads/${req.file.filename}`
  try {
    await User.updateOne({
      _id: req._id
    }, {
      avatar: path
    })
  } catch (err) {
    assert(req.file, '413', '上传失败')
  }
  if (req.file) {
    res.json({
      code: 0,
      msg: 'ok',
      data: {
        path
      }
    })
  }


})



module.exports = router
