/** 
 * api接口的统一出口
 */


// 文章模块接口
import needBuy from './needBuy';

// 首页模块接口
import homeApi from './home'

import productsApi from './product'
import userApi from './user'



// 导出接口
export default {
  needBuy,
  homeApi,
  productsApi,
  userApi
}