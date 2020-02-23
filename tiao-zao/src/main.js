import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Storage from 'vue-ls';
import api from './request/api'
import './mock'





let options = {
  namespace: '', // key prefix
  name: 'ls', // name variable Vue.[ls] or this.[$ls],
  storage: 'session', // storage name session, local, memory
};
Vue.use(Storage, options)
import "amfe-flexible";
// import './mock/index'
import md5 from 'js-md5'
Vue.prototype.md5 = md5
import TabBar from './components/tabBar.vue'
import '../src/assets/reset.css'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios
Vue.prototype.httpurl = 'http://tzmy.beijiait.com:8099/tradepromo-service/'
// Vue.prototype.httpurl = 'http://localhost:8081/'
// 注册全局组件

// 引入封装的接口文件
Vue.prototype.$api = api


Vue.component('TabBar', TabBar)
import { Dialog, Toast  } from 'vant';


Vue.use(Dialog).use(Toast)

Vue.config.productionTip = false



// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (to.meta.LoginCheck) {
    if (Vue.ls.get('user')) {
      next()
    }
    else {
      next({
        name: 'login'
      })
    }
  } 
  next()

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
