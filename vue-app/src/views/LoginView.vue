<template>
  <div class="auth-container card">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <label for="username">Username (Test: test)</label>
      <input type="text" id="username" v-model="username" required />

      <label for="password">Password (Test: password)</label>
      <input type="password" id="password" v-model="password" required />
      
      <p v-if="error" class="error-message" style="color: #dc3545; font-weight: bold;">{{ error }}</p>
      
      <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 10px;">Login</button>
    </form>
    
    <p style="margin-top: 20px; text-align: center;">
        New User? <router-link to="/auth/signup">Create Account</router-link>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
// Import the functions from the utility file you will create
import { login, showToast } from '@/utils/authUtils'; 

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const handleSubmit = () => {
    error.value = '';

    if (!username.value || !password.value) {
        error.value = 'Username and password are required.';
        showToast('Login failed: Missing fields.', 'error');
        return;
    }

    const result = login(username.value, password.value);
    
    if (result.success) {
        showToast('Login successful! Redirecting...', 'success'); 
        // REQUIRED: Redirect users to the Dashboard on success
        setTimeout(() => router.push('/dashboard'), 1000);
    } else {
        // REQUIRED: Show inline error AND toast notification
        error.value = result.message;
        showToast('Login failed.', 'error');
    }
};
</script>

<style scoped>
.auth-container {
    max-width: 400px;
    margin: 50px auto;
}
</style>