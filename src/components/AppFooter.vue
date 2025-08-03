<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-links">
        <router-link to="/">Home</router-link>
        <router-link to="/how-it-works">How It Works</router-link>
        <router-link to="/about-us">About Us</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <div class="footer-social">
        <a href="#"><i class="pi pi-facebook"></i></a>
        <a href="#"><i class="pi pi-twitter"></i></a>
        <a href="#"><i class="pi pi-instagram"></i></a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #f8f9fa;
  padding: 2rem 0;
  border-top: 1px solid #dee2e6;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-links a {
  margin-right: 1.5rem;
  text-decoration: none;
  color: #495057;
}

.footer-social a {
  margin-left: 1rem;
  color: #495057;
}
</style>
