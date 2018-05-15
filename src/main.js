// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import store from './store/index.js'
import 'element-ui/lib/theme-chalk/index.css'
import '../node_modules/weui/dist/style/weui.min.css'
Vue.config.productionTip = false
Vue.use(ElementUi);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
