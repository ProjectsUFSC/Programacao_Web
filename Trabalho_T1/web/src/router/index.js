
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Cadastro from '../pages/Signup.vue';
import Home from '../pages/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/cadastro',
        name: 'Cadastro',
        component: Cadastro,
    },
    {
        path:'/home',
        name: 'Home',
        component: Home,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    });

export default router;
