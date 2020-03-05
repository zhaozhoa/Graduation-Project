const infoRouter = [{
    path: '/sellInfoList',
    name: 'sellInfoList',
    component: () => import('../views/info/sellInfoList.vue'),
    meta: {
      title: '出售列表页',
    }
  },
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
]

export default infoRouter