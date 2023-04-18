import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import routesconfig from './config'

import NotFound from '../views/notfound/NotFound.vue'
import Login from '../views/Login.vue'
import Register from '../views/register.vue'
import Index from '../views/index.vue'



const routes = [
    {
        path: '/',
        // redirect: '/index',
        component: Index,
    },
    // {
    //     path: '/index',
    //     component: Index
    // },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: "/:pathMatch(.*)*",
        name: "Notfound",
        component: NotFound
    }
]



const router = createRouter({
    // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes,
})


routesconfig.forEach((item)=>{
    router.addRoute('home',item)
})



// router.beforeEach((to, from, next) => {
//     const token = localStorage.getItem('token')
//     console.log(token)
//     if (!token && to.name !== 'login') {
//         next({ name: 'login' })
//     }
//     //  else if (token && to.name === 'login') {
//     //     next({ name: 'home' })
//     // }
//     else {
//         //动态分配 路由
//         next()
//     }
// })

router.afterEach((to,from)=>{
    // document.title = to.meta.title || '主页'
})

export default router