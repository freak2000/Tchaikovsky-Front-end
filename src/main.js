import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import './assets/icon/iconfont'
import ElementUI from 'element-ui'
import './assets/css/index.scss'
import Axios from 'axios'
import '../theme/index.css'

Vue.prototype.$target = 'http://localhost:8852/' // 本地后端地址
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = process.env.BASE_API
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router: router,
  store: new Vuex.Store(store),
  render: h => h(App)
})
