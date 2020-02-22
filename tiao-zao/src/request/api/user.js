import base from "./base";
import axios from '../http'
import qs from 'qs'

function axiosGet(url, params) {
  return axios({
   method: 'get',
     url: `${base.sq}/users/${url}`,
     data: qs.stringify(params),
     withCredentials: true
  })
}

function axiosPost(url, params) {
  return axios({
    method: 'post',
    url: `${base.sq}/users/${url}`,
    data: qs.stringify(params),
    withCredentials: true
  })
}

const userApi = {
  // 检查注册的用户名是否已经存在
  hasUserName(params) {
    return axiosPost('hasUserName', params)
  },
  // 注册
  register(params) {
    return axiosPost('register', params)
  },
  // 获取登陆验证图片
  getVerificationPic() {
    return axiosGet('verificationPic')
  },
  login(params) {
    return axiosPost('login', params)
  },
  // 获取电话验证码
  getPhoneVerification(params) {
    return axiosPost('phoneVerification', params)
  },
  // 校验电话验证码
  checkPhoneVerification(params) {
     return axiosPost('checkPhoneVerification', params)
  },
  resetPassword(params) {
    return axiosPost('resetPassword', params)
  }
}

export default userApi