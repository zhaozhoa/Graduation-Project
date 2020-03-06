const infoRouter = [{
    path: '/sellInfoList',
    name: 'sellInfoList',
    component: () => import('../views/info/sellInfoList.vue'),
    meta: {
      title: '出售列表页',
    }
  },
  {
    path: '/sellInfoDetail/:_id',
    name: 'sellInfoDetail',
    component: () => import('../views/info/sellInfoDeatil.vue'),
    meta: {
      title: '出售消息详情'
    },
  },
  {
    path: '/otherInfoList/:category',
    name: 'otherInfoList',
    component: () => import('../views/info/otherInfoList.vue'),
    meta: {
      title: '出售消息详情'
    },
  },
  {
    path: '/otherInfoDeatil/:_id',
    name: 'otherInfoDeatil',
    component: () => import('../views/info/otherInfoDeatil.vue'),
    meta: {
      title: '出售消息详情'
    },
  },
]

export default infoRouter