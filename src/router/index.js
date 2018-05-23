import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'
import HelloWorld from '@/components/HelloWorld'
import ComingSoon from '../components/coming_soon.vue'
import ArticleItem from '../components/ArticleItem.vue'
import ArticleDetail from '../components/ArticleDetail.vue'
import UserDetail from '../components/userDetail.vue'
import Login from '../components/login.vue'
import Message from '../components/message.vue'
import Publish from '../components/publish.vue'


Vue.use(Router)


  const routes = [
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
      meta: {
        requireAuth: true,
      },
      component: UserDetail
    },   
    {
      path: '/coming_soon',
      name: 'ComingSoon',
      component: ComingSoon
    },
    {
      path: '/message',
      name: 'Message',
      meta: {
        requireAuth: true,
      },      
      component: Message
    },
    {
      path: '/publish',
      name: 'Publish',
      meta: {
        requireAuth: true,
      },      
      component: Publish
    },    
    {
      path: '/login',
      name: 'Login',
      component: Login
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

  /*注意：在组件里使用时，this.$router和this.$route的区别！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！*/
 // this.$router  为全局的路由信息，里面包含的许多 方法，对象字段信息等 比如 this.$router.push()....还有store.state等信息
 // this.$route   为当前路由的信息；有当前路由的name，params,query,fullPath等等
 
 //组件里可以使用 this.$store 访问和操作state数据 （this.$store.state 、 this.$store.commit("")、this.$store.dispath("") 等等。。。）


// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit("login", window.localStorage.getItem('token'))
}

const router = new Router({
    routes
});

router.beforeEach((to, from, next) => {
  // var hasToken = router.app.$options.components.App.store.state.token;
  console.log(router); //console router 然后找state的位置
  var hasToken = router.app.$options.store.state.accesstoken;
  console.log("hasToken"+hasToken);
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (hasToken) {
            // next();
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})


export default router;