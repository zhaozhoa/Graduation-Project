/**
 * 产品所有接口
 */

 import base from './base'
 import axios from '../http';
 import qs from 'qs'

 const productApi = {
  //  获取产品分类
  getProductCategories(params) {
    return axios.post(`${base.sq}/productsCategories`, qs.stringify(params))
  },

  // 获取分类下面的产品
  getCategoryProducts(categoryId) {
    return axios.post(`$(base.sq)/categoryProducts`, qs.stringify(categoryId))
  }
 }

 export default productApi