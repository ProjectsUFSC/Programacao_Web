
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Cadastro from '../pages/Signup.vue';

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
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    });

export default router;
