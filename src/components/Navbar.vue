<template>
    <div>
      <!-- Navbar with Login/Signup buttons -->
      <div class="fixed-top shadow-sm">
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
          <div class="container">
            <a class="navbar-brand" href="#">VuePlayer</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <button @click="openLoginModal" class="nav-link">Login</button>
                </li>
                <li class="nav-item">
                  <button @click="openSignupModal" class="nav-link">Signup</button>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Library
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Create Library</a></li>
                    <li><a class="dropdown-item" href="#">Playlists</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Favorites</a></li>
                  </ul>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
  
      <!-- Modal component -->
      <Modal ref="modal">
        <!-- Modal content based on the modalType state -->
        <template v-slot:default>
            <div v-if="modalType === 'Login'">
                <LoginForm />
            </div>
            <div v-else-if="modalType === 'Sign Up'">
                <SignupForm />
            </div>
          <!-- <component :is="modalType === 'Login' ? 'LoginForm' : 'SignupForm'" /> -->
        </template>
      </Modal>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Modal from '@/components/Modal.vue'
  import LoginForm from '@/components/auth/LoginForm.vue'
  import SignupForm from '@/components/auth/SignupForm.vue'
  
 
  const modalType = ref('') 
  
  // Modal reference
  const modal = ref(null)
  
  // Open Login Modal
  const openLoginModal = () => {
    modalType.value = 'Login' 
    modal.value.openModal('Login') 
  }
  
  // Open Signup Modal
  const openSignupModal = () => {
    modalType.value = 'Sign Up' 
    modal.value.openModal('Sign Up')
  }
  </script>
  
  <style scoped>

  </style>
  