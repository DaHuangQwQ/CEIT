import http from './http'
import * as url from "url";

export const getArticleList = () => http({
    url: '/article/getList',
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

export const getArticle = (id) => http({
    url: '/article/get',
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data:{
        id
    }
})

export const upArticle = (id) => http({
    url: '/api/article',
    method: 'put',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data: {
        ...id
    }
})


export const addArticle = (data) => http({
    url: '/article/create',
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data
})


export const addUser = (data) => http({
    url: '/user/register',
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data
})

export const getUserList = (begin,end) => http({
    url: '/user/list',
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data:{
        begin,
        end
    }
})

export const userVerify = (data) => http({
    url: '/user/login',
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data
})



export const getLoginUser = () => http({
    url: '/user/get',
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
})


export const getMyArticle = () => http({
    url: '/article/my',
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

export const getOtherArticle = (username) => http({
    url: '/article/other',
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    data:{
        username
    }
})


export const getTagArticle = (tag) => http({
    url: '/article/tag',
    method: 'post',
    data: {
        tag
    }
})



export const likeOn = (article) => http({
    url: '/like/on',
    method: 'post',
    data:{
        article
    }
})


export const likeCount = (article) => http({
    url: '/like/count',
    method: 'post',
    data:{
        article
    }
})

export const isMyLike = (article) => http({
    url: '/like/is',
    method: 'post',
    data: {
        article
    }
})