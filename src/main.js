import Vue from 'vue'
import App from './App.vue'
// 引入全局elementUI相关组件 
// 利用官方插件按需引用Button组件
import ElementUI from 'element-ui';
//import {Button} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import  router from '../router'
// 引入公共样式
import './assets/less/index.less'
// 引入store
import store from '../store'
//引入axios
import http from 'axios'
//引入mock模拟数据
import '../api/mock.js'


Vue.config.productionTip = false

Vue.prototype.$http = http


//导航定位
router.beforeEach((to,from,next) => {
  store.commit('getToken')
  const token = store.state.user.token
  //登入拦截
  if(!token && to.name !=='login'){
     next({name:'login'})
  }
  //拦截二次登入
  else if(token && to.name==='login'){
    next({ name:'home'})
  }else{
    next()
  }
})
// 全局使用ElementUI
Vue.use(ElementUI);
new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
