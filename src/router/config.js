import articleList from "../views/article/index.vue";
import articleView from "../views/article/view.vue";
import user from  "../views/person/index.vue"
import roadMap from "../views/roadMap/index.vue";
import view from "../views/roadMap/view.vue";
import write from "../views/write/index.vue";
import talentMarket from "../views/talentMarket/index.vue"
import home from "../views/user/home.vue"

const routes = [
    {
        path: '/article',
        component: articleList
    },
    {
        path: '/article/:id',
        component: articleView
    },
    {
        path: '/user',
        component: user
    },
    {
        path: '/roadmap',
        component: roadMap
    },
    {
        path: '/roadmap/:id',
        component: view
    },
    {
        path: '/write',
        component: write
    },
    {
        path: '/talent',
        component: talentMarket
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/settings',
        component: () => import('../views/settings/index.vue')
    },
    {
        path: '/search',
        component: () => import('../views/search/index.vue')
    },
    {
        path: '/search/:id',
        component: () => import('../views/search/index.vue')
    },
    {
        path: '/:id',
        component: () => import('../views/user/userView.vue')
    },
]

export default routes