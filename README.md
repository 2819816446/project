# CNode

> A Vue.js project , 根据cnode社区提供的API接口,仿写的cnode项目；项目涉及vue全家桶+axios实现登录、
拦截、登出功能，以及利用axios的http拦截器拦截request、response请求和响应。

## 准备
该项目是利用了cnode社区 提供的accesstoken作为登录token，通过token唯一标识你是否登入；通过这个项目
学习系统登录及拦截、注销、token失效（因为API的accesstoken不是存储在cookie，没有失效时间；因此只在
注销时对accesstoken进行失效处理。）

需要注册cnode社区，获取AccessToken:通过([Cnode社区]https://cnodejs.org/) 注册账号，然后在设置页面
拉到最下面就可以看到自己的accesstoken，以及对应二维码

([Cnode API] https://cnodejs.org/api)
([Axios Api操作指南] https://www.kancloud.cn/yunye/axios/234845)


better-scroll 用于首页，文章列表，主要熟悉下用法，本应用运用时还存在“scroll溢出”问题。
(http://ustbhuangyi.github.io/better-scroll/doc/)

weui  用于快速搭建页面。(https://weui.io/)
vue-element 主要也是熟悉其用法，用到Message组件模块 (http://element-cn.eleme.io/#/zh-CN/)


## 技术栈
* Vue 2.0
* vue-router
* vuex
* axios
* better-scroll
* weui
* vue-element



## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
