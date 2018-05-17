<template>
  <div id="app">
    <router-view/>
    <Footer-Bar></Footer-Bar>
  </div>
</template>

<script>
  // import 时加 ./ 相对路径
  import AsideNav from './components/AsideNav.vue';
  import ComingSoon from './components/coming_soon.vue';
  import FooterBar from './components/FooterBar.vue';
  import ArticleItem from './components/ArticleItem.vue';
  import ArticleDetail from './components/ArticleDetail.vue';
  export default {
    name: 'App',
    components: {
      'aside-nav':AsideNav,
      'coming_soon':ComingSoon,
      'Footer-Bar':FooterBar,
      "Article-Item":ArticleItem,
      'Article-Detail':ArticleDetail
    },
  }
</script>

<style>

  

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}
</style>
