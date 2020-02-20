/**
 * 采购需求 模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '../http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const needBuy = {
  // 采购需求的搜索    
  onSearch(url, params) {
    return axios.post(url, qs.stringify(params));
  }
}

export default needBuy;