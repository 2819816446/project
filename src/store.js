
import Vuex from 'vuex'
import Vue from 'vue'
import axios from '../node_modules/axios/dist/axios.min.js'


Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        articleLists:[],
        articleNum:0,
        pullDownloading:false,
        article:{ create_at: '2017-04-13', author: { loginname: 'undefined' } },
        loginname:"",
        token:""
    },
    mutations: {
        // mutation 类似method 定义方法（一般为同步的）
        addArticleLists(state,data){
            state.articleLists = data;

        },

        addArticleNum(state){
            state.articleNum+=20;
        },

        addArticle(state,res){
            // res.data = res.data.data;
            state.article = res.data;
        },

        setLoginname(state,value){
             localStorage.setItem("loginname",value);
        },
        getLoginname(state){
            state.loginname = localStorage.getItem("loginname");
            return state.loginname;
             
        },
        // 登入(loginname 存入localStorage {token: "2819816446"})
        login(state,data){
            localStorage.token = data;
            state.token = data.loginname;
        },

        // 退出 (loginname 清除)
        logout(state){
            localStorage.removeItem('token');
             state.token = null;
        }
    },

    getters:{

    },

    actions:{
            // 类似method 定义方法（一般为异步的）
        getArticleLists(context){
            context.commit("addArticleNum");
            let num = context.getters.getArticleNum;
            console.log(num);

            axios.get('https://cnodejs.org/api/v1/topics', {
                params: {
                  page : 1,
                  limit:num,
                  mdrender:false
                }
              })
              .then(function (response) {
                console.log(response);
                context.commit('addArticleLists',response.data.data);
              })
              .catch(function (error) {
                console.log(error);
              });


        },

        // 更新最新的20条数据 上拉刷新
        refreshData(context){
            axios.get('https://cnodejs.org/api/v1/topics', {
                params: {
                  page : 1,
                  limit:20,
                  mdrender:false
                }
              })
              .then(function (response) {
                console.log(response);
                context.commit('addArticleLists',response.data.data);
              })
              .catch(function (error) {
                console.log(error);
              });

        },

        setArticle(context,url){
            // var url = String(url);
            console.log(url);
            axios.get(url,{
                params:{
                    mdrender:true,
                }
            }).then(function(res){
                // res.data 才是真实返回的数据  而不是data
                console.log(res.data.success)
                if (res.data.success === true) {
                    context.commit('addArticle',res.data);
                }else {
                    console.log('Sorry, Something wrong happened when getting the remote data')
                }

            }).catch(function(res) {
                console.log('ArticleDetail.vue: ', res);
            });
        }
    }




})