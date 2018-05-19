import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import ComingSoon from '../components/coming_soon.vue'
import ArticleItem from '../components/ArticleItem.vue'
import ArticleDetail from '../components/ArticleDetail.vue'
import UserDetail from '../components/userDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页（文章列表）
    {
      path: '/',
      name: 'ArticleItem',
      component: ArticleItem
    }, 
    //  文章详情页
    {
      path: '/topic/:id',
      name: 'ArticleDetail',
      component: ArticleDetail
    },
    // 用户详情页
     {
      path: '/user/:loginname',
      name: 'UserDetail',
      component: UserDetail
    },   
    {
      path: '/coming_soon',
      name: 'ComingSoon',
      component: ComingSoon
    },
    // {
    //   path: '/topic/:id',
    //   name: 'ArticleRoute',
    //   components: {
    //   main: ArticleCom,
    //   side: SideSec,
    // },
  //   {
  //     path: '/user/:name',
  //     name: 'UserRoute',
  //     components: {
  //     main: UserCom,
  //   },
  //  {
  //     path: '/user/:name',
  //     redirect: '/user:name',
  // }
  ]
})
