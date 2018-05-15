import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ComingSoon from '../components/coming_soon.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/coming_soon',
      name: 'ComingSoon',
      component: ComingSoon
    }
  ]
})
