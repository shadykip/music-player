<template>
    <div v-if="show" class="modal fade show" tabindex="-1" style="display: block;" @click.self="closeModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <slot></slot> <!-- Slot for dynamic content -->
          </div>
          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
            <button type="button" class="btn btn-primary" @click="submitAction">Submit</button>
          </div> -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Modal state
  const show = ref(false)
  const title = ref('')
  
  const closeModal = () => {
    show.value = false
  }
  
  const openModal = (modalTitle) => {
    title.value = modalTitle
    show.value = true
  }
  
  const submitAction = () => {
    
  }
  
  defineExpose({
    openModal,
    closeModal
  })
  </script>
  
  <style scoped>
 .modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1040;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
  display: block;
}

.modal-dialog {
  position: relative;
  margin: 1.75rem auto;
  max-width: 500px;
}

.modal-content {
  background-color: #fff;
  border-radius: 0.3rem;
  box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.1);
}
  </style>
  