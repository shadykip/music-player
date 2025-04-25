<template>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="signup-username" class="form-label">Username</label>
        <input type="text" id="signup-username" class="form-control" v-model="username" required />
      </div>
      <div class="mb-3">
        <label for="signup-email" class="form-label">Email</label>
        <input type="email" id="signup-email" class="form-control" v-model="email" required />
      </div>
      <div class="mb-3">
        <label for="signup-password" class="form-label">Password</label>
        <input type="password" id="signup-password" class="form-control" v-model="password" required />
      </div>
      <button type="submit" class="btn btn-warning w-100">Sign Up</button>
    </form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const username = ref('')
  const email = ref('')
  const password = ref('')
  
  const handleSubmit = () => {
    // Call the signup logic here
    console.log('Sign up with', username.value, email.value, password.value)
  }
  </script>
  