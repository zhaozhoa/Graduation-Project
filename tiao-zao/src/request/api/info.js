/**
 * 二手产品信息接口
 */

 import base from './base'
 import axios from '../http';
 import qs from 'qs'

 function axiosGet(url, params) {
   return axios({
     method: 'get',
     url: `${base.sq}/info/${url}`,
     params: params,
     withCredentials: true
   })
 }

 function axiosPost(url, params) {
   return axios({
     method: 'post',
     url: `${base.sq}/info/${url}`,
     data: qs.stringify(params),
     withCredentials: true
   })
 }

 function axiosPostUpload(url, params) {
   return axios({
     method: 'post',
     url: `${base.sq}/info/${url}`,
     data: params,
     withCredentials: true,
     headers: {
       "Content-Type": "multipart/form-data"
     }
   })
 }

 const infoApi = {
  //  获取产品分类
  getProductCategories(params) {
    return axios.post(`${base.sq}/productsCategories`, qs.stringify(params))
  },

  // 获取分类下面的产品
  getCategoryProducts(categoryId) {
    return axios.post(`$(base.sq)/categoryProducts`, qs.stringify(categoryId))
  },

  // 发布产品信息
  publish(params) {
    return axiosPostUpload('publise', params)
  }
 }

 export default infoApi