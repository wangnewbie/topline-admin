import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import './styles/index.less'
import '../node_modules/nprogress/nprogress.css'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0'

Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
