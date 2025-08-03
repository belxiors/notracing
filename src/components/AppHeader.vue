<template>
  <header class="app-header">
    <div class="container">
      <div class="logo">
        <router-link to="/">Not Racing</router-link>
      </div>
      <nav class="main-nav">
        <router-link to="/how-it-works">How it works</router-link>
        <router-link to="/verify-identity">Log in</router-link>
        <router-link to="/verify-identity" class="p-button p-component p-button-info"
          >Not Racing?</router-link
        >
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts"></script>

<style scoped>
.app-header {
  background-color: #fff;
  border-bottom: 1px solid #dee2e6;
  padding: 1rem 0;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo a {
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  color: #000;
}

.main-nav a {
  margin-left: 1.5rem;
  text-decoration: none;
  color: #495057;
  vertical-align: middle;
}

.main-nav .p-button {
  color: #ffffff;
}
</style>
