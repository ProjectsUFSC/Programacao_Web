import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; 
import Login from '../components/Login.vue'; 
import Register from '../components/Register.vue'; 
import ScanQRCode from '../components/ScanQRCode.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/scan', component: ScanQRCode }
];

const router = createRouter({
  history: createWebHistory(), // Enables clean URLs
  routes,
});

export default router;
