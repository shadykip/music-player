<template>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="login-email" class="form-label">Email</label>
        <input type="email" id="login-email" class="form-control" v-model="email" required />
      </div>
      <div class="mb-3">
        <label for="login-password" class="form-label">Password</label>
        <input type="password" id="login-password" class="form-control" v-model="password" required />
      </div>
      <button type="submit" class="btn w-100 btn-warning">Login</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const email = ref('')
  const password = ref('')
  
  const handleSubmit = () => {
    // Call the login logic here
    console.log('Login with', email.value, password.value)
  }
  </script>
  