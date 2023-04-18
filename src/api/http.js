import axios from "axios";

const http = axios.create({
    baseURL: 'http://api.dahuang.pro/api',
    // baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    timeout: 10000,
})

// 拦截器
http.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem("token")
    // config.headers.cookie = "";
    return config;
}, function (error) {

    return Promise.reject(error);
});

// Add a response interceptor
http.interceptors.response.use(function (response) {
    let code = response.data.code

    // if(code === 40100){
    //     alert("未登入")
    // }

    return response;
}, function (error) {

    return Promise.reject(error);
});

export default http