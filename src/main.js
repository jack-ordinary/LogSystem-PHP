/*
 * @Description:
 * @version:
 * @Author: JackLong
 * @Date: 2021-01-20 11:38:47
 * @LastEditors: JackLong
 * @LastEditTime: 2021-08-04 15:42:37
 */
import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// 导入阿里iconfont
import '@/assets/iconfont/iconfont.js'
import '@/assets/iconfont/icon.css'

// 引入Echarts
import * as Echarts from 'echarts'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
//   console.log(process.env.NODE_ENV)
// }

// console.log(process.env.VUE_APP_BASE_API)

// 引入缓存
import Storage from 'vue-ls'

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(Storage)

Vue.config.productionTip = false

Vue.prototype.$apiUrl = 'http://api.itcn99.com/'
Vue.prototype.$echarts = Echarts

new Vue({
  el: '#app',
  router,
  store,
  Storage,
  render: h => h(App)
})
