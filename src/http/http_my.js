/**
 * http配置
 */

import axios from 'axios'
import store from '../store/index.js'
import router from '../router/index.js'
import { Message } from 'element-ui';

// axios 配置
axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'https://cnodejs.org/api/v1';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.accesstoken) {
            // config.headers.Authorization = `token ${store.state.accesstoken}`;
            config.headers['X-Token'] = store.state.accesstoken; // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        console.log("拦截请求：1");
        console.log(config);
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        console.log("响应：1");
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面response.error_msg 要
                    console.log("出错响应：11");
                     Message({
                        message: "actoken出错",
                        type: 'error',
                        duration: 4 * 1000
                      });

                    store.commit("logout");
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })

                    location.reload();// 为了重新实例化vue-router对象 避免bug
            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response.data)
    });

export default axios;
