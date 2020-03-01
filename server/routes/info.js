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

// 用户发布信息
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

// 分页查询用户发布信息列表
router.post('/getInfoList', decodeJwt(), async (req, res) => {
  let {
    category,
    currentPage,
    showCount
  } = req.body
  
  let owner_id = req._id
  try {
    // 查询总条数
    let count = await Info.countDocuments({
      category,
      owner_id
    })

    let result = await Info.find({
      category,
      owner_id
    }, {
      description:0
    }).limit(parseInt(showCount)).skip((parseInt(currentPage) - 1) * showCount).sort({'createdTime': -1})

    res.json({
      code: 0,
      total: count,
      data: result
    })
  } catch (error) {
    console.log(error);
    
  }

})

// 查询单个用户发布的信息
router.post('/getInfo', async (req, res) => {
  let {_id} = req.body
  let result = await Info.findById(_id)
  
  assert(result, 500, '系统忙，请稍后重试')
  res.json({
    code: 0,
    msg: 'ok',
    data: result
  })
})

// 修改用户发布的信息
router.post('/modifyInfo', decodeJwt(), upload.array('file', 5), async (req, res) => {
  let {
    category,
    title,
    price,
    description,
    contact,
    status,
    img,
    info_id
  } = req.body
  if (req.files.length !== 0) {
    req.files.forEach(item => {
      img.push(`${host}/uploads/${item.filename}`)
    })
  }
  try {
    let result = await Info.updateOne({_id:info_id}, {
      category: parseInt(category),
      title,
      price,
      description,
      contact,
      status: parseInt(status),
      img
    })
    res.json({
      code: 0,
      msg: 'ok',
      data: ''
    })
  } catch (err) {
    assert(false , err.code, err.message)
  }
})



module.exports = router
