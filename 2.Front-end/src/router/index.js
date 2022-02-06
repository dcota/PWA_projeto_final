/*
MEIW - Programação Web Avançada - projeto final
Auhtor: Duarte Cota
Description: implementation of routes and related constrains
*/

import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Enrollment from '../views/Enrollment.vue'
import Admin from '../views/Admin.vue'
import Notif from '../views/Notif.vue'
import store from '../store/store'
import News from '../views/News.vue'
import { IS_USER_AUTHENTICATED_GETTER, GET_USER_LEVEL_GETTER } from '../store/storeconstants'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { auth: false }
    },
    {
        path: '/News',
        name: 'News',
        component: News,
        meta: { auth: false }
    },
    {
        path: '/Login',
        name: 'Login',
        component: Login,
        meta: { auth: false }
    },
    {
        path: '/Enrollment',
        name: 'Enrollment',
        component: Enrollment,
        meta: { auth: false }
    },
    {
        path: '/Admin',
        name: 'Admin',
        component: Admin,
        meta: { auth: true }
    },
    {
        path: '/Notif',
        name: 'Notif',
        component: Notif,
        meta: { auth: true }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.auth && !store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`] || store.getters[`auth/${GET_USER_LEVEL_GETTER}`] == 'student') {
        next('/Login')
    } else if (!to.meta.auth && store.getters[`auth/${IS_USER_AUTHENTICATED_GETTER}`] && store.getters[`auth/${GET_USER_LEVEL_GETTER}`] == "admin") {
        next('/Admin')
    }
    else {
        next()
    }
})

export default router
