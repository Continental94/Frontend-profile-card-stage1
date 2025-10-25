// vue-app/src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/auth/login', name: 'login', component: LoginView },
    { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
  ],
});

// MANDATORY SECURITY CHECK (Route Guard)
router.beforeEach((to, from, next) => {
  const SESSION_KEY = 'ticketapp_session';
  const isAuthenticated = !!localStorage.getItem(SESSION_KEY);
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // REQUIRED: Redirect to login if trying to access protected route
    // Note: You should also show a toast, but this is the core redirection logic
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;