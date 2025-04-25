import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('authStore', () => {
    // State
    const user = ref(null)                
    const isAuthenticated = ref(false)    // Authentication state
    const token = ref(localStorage.getItem('token') || null)  // Token from localStorage
    const isLoading = ref(false)          // Loading state


      // Register user
  const register = async (username, email, password) => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/register', { username, email, password })
      localStorage.setItem('token', res.data.token)  // Store the token
      token.value = res.data.token
      isAuthenticated.value = true
      user.value = res.data.user   // Store user details
    } catch (error) {
      console.error('Failed to register:', error)
    }
  }

  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password })
      localStorage.setItem('token', res.data.token)  // Store the token
      token.value = res.data.token
      isAuthenticated.value = true
      user.value = res.data.user   // Store user details
    } catch (error) {
      console.error('Failed to login:', error)
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem('token')  // Remove token from localStorage
    token.value = null
    isAuthenticated.value = false
    user.value = null  // Clear user details
  }

    // Get user details
    const fetchUser = async () => {
        if (token.value) {
          try {
            const res = await axios.get('http://localhost:3000/api/auth/me', {
              headers: { Authorization: `Bearer ${token.value}` }
            })
            user.value = res.data.user
            isAuthenticated.value = true
          } catch (error) {
            console.error('Failed to fetch user details:', error)
          }
        }
      }
    
      // Initial fetch to check if user is logged in on app load
      if (token.value) {
        fetchUser()
      }

      return {
        user,
        isAuthenticated,
        token,
        register,
        login,
        logout,
        fetchUser
      }
})