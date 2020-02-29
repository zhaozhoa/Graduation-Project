import Vue from 'vue'
import VueRouter from 'vue-router'
import loginRouter from './loginRouter'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/Me/About.vue'),
    meta: {
      title: '我的',
      // 是否需要登录权限
      LoginCheck: true
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('../views/Me/setting.vue'),
    meta: {
      title: '设置',
      // 是否需要登录权限
      LoginCheck: true
    }
  },
  {
    path: '/myProduct',
    name: 'myProduct',
    component: () => import('../views/Me/myProduct.vue'),
    meta: {
      title: '我的产品',
      // 是否需要登录权限
      LoginCheck: true
    }
  },
  {
    path: '/myTradeInfo',
    name: 'myTradeInfo',
    component: () => import('../views/Me/myTradeInfo.vue'),
    meta: {
      title: '我的贸易信息',
      // 是否需要登录权限
      LoginCheck: true
    }
  },
  {
    path: '/myCart',
    name: 'myCart',
    component: () => import('../views/Me/myCart.vue'),
    meta: {
      title: '我的购物车',
      // 是否需要登录权限
      LoginCheck: true
    }
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/Me/publish.vue'),
    meta: {
      title: '发布',
      LoginCheck: true
    },
  },
  {
    path: '/modifyInfo/:_id',
    name: 'modifyInfo',
    component: () => import('../views/Me/modifyInfo.vue'),
    meta: {
      title: '修改发布消息',
      LoginCheck: true
    },
  },

  {
    path: '/companyIndex/',
    name: 'companyIndex',
    component: () => import('../views/company/index.vue'),
    meta: {
      title: '公司'
    }
  },
  {
    path: '/companySearchList',
    name: 'companySearchList',
    component: () => import('../views/company/company-search-list.vue'),
    meta: {
      title: '搜索列表'
    },
  },
  {
    path: '/needBuySearchList',
    name: 'needBuySearchList',
    component: () => import('../views/needBuy/needBuySearchList.vue'),
    meta: {
      title: '搜索列表'
    },
  },
  {
    path: '/needBuyInfo/:INFORMATION_ID',
    name: 'needBuyInfo',
    component: () => import('../views/needBuy/needBuyInfo.vue'),
    meta: {
      title: '详情'
    },
  },
  {
    path: '/TradePromotionExhibition',
    name: 'TradePromotionExhibition',
    component: () => import('../views/tradeActivities/tradePromotionExhibition.vue'),
    meta: {
      title: '贸促会展'
    },
  },
  {
    path: '/exhibitionDetails',
    name: 'exhibitionDetails',
    component: () => import('../views/tradeActivities/exhibitionDetails.vue'),
    meta: {
      title: '展会详情'
    },
  },
  {
    path: '/enrollSurface/params/:params/TRADE_ID/:TRADE_ID',
    name: 'EnrollSurface',
    component: () => import('../views/tradeActivities/enrollSurface.vue'),
    meta: {
      title: '报名表',
      // 是否需要登录权限
      // LoginCheck: true
    },
  },
  {
    path: '/productList',
    name: 'productList',
    component: () => import('../views/product/productList.vue'),
    meta: {
      title: '产品列表'
    },
  },
  {
    path: '/productDetail/:GoodsId',
    name: 'productDetail',
    component: () => import('../views/product/productDetail.vue'),
    meta: {
      title: '产品详情'
    },
  },
  {
    path: '/productShow',
    name: 'productShow',
    component: () => import('../views/product/productShow.vue'),
    meta: {
      title: '产品详情'
    },
  },
  {
    path: '/service',
    name: 'service',
    component: () => import('../views/service/service.vue'),
    meta: {
      title: '综合服务'
    },
  },
  {
    path: '/WarningInfo',
    name: 'WarningInfo',
    component: () => import('../views/service/warningInfo.vue'),
    meta: {
      title: '贸易预警',
      
    },
  },
  {
    path: '/consultation',
    name: 'consultation',
    component: () => import('../views/service/consultation.vue'),
    meta: {
      title: '商事调解仲裁咨询'
    },
  },
  {
    path: '/policySearchList',
    name: 'policySearchList',
    component: () => import('../views/PolicyReg/policySearchList.vue'),
    meta: {
      title: '政策法规'
    },
  },
  {
    path: '/policyInfo',
    name: 'policyInfo',
    component: () => import('../views/PolicyReg/policyInfo.vue'),
    meta: {
      title: '详情'
    },
  },
  
  
  ...loginRouter

]

const router = new VueRouter({
  routes
})

export default router
