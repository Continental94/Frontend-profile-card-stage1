<template>
  <div id="app">
    <header>
      <div class="container" style="display: flex; justify-content: space-between; align-items: center;">
        <h1>Infinity TicketApp</h1>
        <nav style="display: flex; align-items: center;">
          <router-link to="/" class="nav-link" style="margin-right: 15px; color: var(--color-primary); text-decoration: none; font-weight: bold;">Home</router-link>
          
          <button v-if="$route.meta.requiresAuth" 
                  class="btn btn-danger" 
                  @click="logoutAndRedirect">
            Logout
          </button>
        </nav>
      </div>
    </header>

    <main class="container">
      <router-view />
    </main>

    <footer>
      <div class="container" style="text-align: center;">
        <p>&copy; 2025 Infinity TicketApp. All rights reserved. | Max Width: 1440px</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
// Import the required logout function from your new utility file
import { handleLogout } from './utils/authUtils'; 

const router = useRouter();
const route = useRoute(); // Use useRoute to access $route info

const logoutAndRedirect = () => {
  handleLogout(); // Clears localStorage session
  
  // REQUIRED: Redirects to the landing page / after logout
  // Your task says: Logout should clear the session and return the user to the landing page.
  router.push('/'); 
};
</script>

<style>
/* NOTE: This App.vue component must reference the shared style.css
  Make sure this line is in your vue-app/src/main.js or similar entry file:
  import './style.css' 
*/
</style>