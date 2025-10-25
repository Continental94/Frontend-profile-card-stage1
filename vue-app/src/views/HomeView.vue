<template>
  <div>
    <div class="hero wavy-bg">
      
      <div class="decorative-circle" style="top: 10%; left: 10%;"></div>

      <div style="padding: 80px 0; max-width: 600px;">
        <h1>Your Simple, Powerful Ticket Management Solution</h1>
        <p>Track, manage, and resolve issues seamlessly across all departments.</p>
        
        <div style="margin-top: 20px;">
          <router-link to="/auth/login" class="btn btn-primary" style="margin-right: 10px;">Login</router-link>
          <router-link to="/auth/signup" class="btn btn-secondary">Get Started</router-link>
        </div>
      </div>
    </div>

    <div class="features-section" style="display: flex; gap: 20px; padding: 40px 0; justify-content: space-around;">
      <div class="card" style="flex: 1;">
        <h3>Easy Creation</h3>
        <p>Log new issues in seconds with mandatory validation.</p>
      </div>
      <div class="card" style="flex: 1;">
        <h3>Status Tags</h3>
        <p>Instantly see ticket status with required color codes.</p>
      </div>
      <div class="card" style="flex: 1;">
        <h3>Secure Access</h3>
        <p>Protected routes with a session token in local storage.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// This is a simple static view, so no script logic is required.
</script>

<style scoped>
/* You can add any component-specific styling here if needed, 
   but the core design is inherited from the global style.css. */
.hero {
    position: relative; /* Ensure the absolute positioned decorative circle works */
}
</style>