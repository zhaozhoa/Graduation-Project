/** 
 * api接口的统一出口
 */


// 文章模块接口
import needBuy from './needBuy';

// 首页模块接口
import homeApi from './home'

// 二手产品信息接口
import infoApi from './info'

import userApi from './user'



// 导出接口
export default {
  needBuy,
  homeApi,
  infoApi,
  userApi
}