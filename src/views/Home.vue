<template>
   <div class="container mt-4">
    <h3 class="mb-4">Trending Tracks</h3>
    <div class="row">
      <div v-for="n in 6" :key="n" class="col-md-4 mb-3">
        <div class="card h-100">
          <img src="https://placehold.co/300x200" class="card-img-top" alt="track cover" />
          <div class="card-body">
            <h5 class="card-title">Track Title {{ n }}</h5>
            <p class="card-text text-muted">Artist Name</p>
            <router-link :to="`/player/${n}`" class="btn btn-primary btn-sm">Play</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style>

</style>