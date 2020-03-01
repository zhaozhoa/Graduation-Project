import Vue from 'vue'
import VueRouter from 'vue-router'
import loginRouter from './loginRouter'
import MeRouter from './MeRouter'
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
  ...MeRouter,

  
  // {
  //   path: '/productList',
  //   name: 'productList',
  //   component: () => import('../views/product/productList.vue'),
  //   meta: {
  //     title: '产品列表'
  //   },
  // },
  // {
  //   path: '/productDetail/:GoodsId',
  //   name: 'productDetail',
  //   component: () => import('../views/product/productDetail.vue'),
  //   meta: {
  //     title: '产品详情'
  //   },
  // },
  // {
  //   path: '/productShow',
  //   name: 'productShow',
  //   component: () => import('../views/product/productShow.vue'),
  //   meta: {
  //     title: '产品详情'
  //   },
  // },
  
  
  
  ...loginRouter

]

const router = new VueRouter({
  routes
})

export default router
