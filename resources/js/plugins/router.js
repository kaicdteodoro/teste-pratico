import {createRouter, createWebHistory} from 'vue-router';

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: () => import('../components/Home.vue')
        },
        {
            name: 'salarial',
            path: '/salarial',
            component: () => import('../components/Salarial.vue')
        },
        {
            name: 'sequencia',
            path: '/sequencia',
            component: () => import('../components/Sequencia.vue')
        },
        {
            name: 'fibonacci',
            path: '/fibonacci',
            component: () => import('../components/Fibonacci.vue')
        },
    ],
})
