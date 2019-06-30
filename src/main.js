import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import './styles/index.less'
import '../node_modules/nprogress/nprogress.css'
import axios from 'axios'
import { getUser, removeUser } from '@/utils/auth'
import JSONbig from 'json-bigint'
import store from './store'

Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
axios.defaults.transformResponse = [(data) => {
  try {
    return JSONbig.parse(data)
  } catch (error) {
    return data
  }
}]

Vue.use(ElementUI)

Vue.prototype.$http = axios
// 请求拦截器
axios.interceptors.request.use(function (config) {
  const user = getUser()
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
    // config.headers.Authorization = `Bearer 123`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (typeof response.data === 'object' && response.data.data) {
    return response.data.data
  } else {
    return response.data
  }
}, function (error) {
  if (error.response.status === 401) {
    removeUser()
    router.push({ name: 'login' })
  }
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
