<template>
  <div id="app">
    <Article-Item></Article-Item>
    <Footer-Bar></Footer-Bar>
    <router-view/>
  </div>
</template>

<script>
  // import 时加 ./ 相对路径
  import AsideNav from './components/AsideNav.vue';
  import ComingSoon from './components/coming_soon.vue';
  import FooterBar from './components/FooterBar.vue';
  import ArticleItem from './components/ArticleItem.vue'
  export default {
    name: 'App',
    components: {
      'aside-nav':AsideNav,
      'coming_soon':ComingSoon,
      'Footer-Bar':FooterBar,
      "Article-Item":ArticleItem
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
