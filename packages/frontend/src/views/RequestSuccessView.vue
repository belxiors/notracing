<template>
  <div class="request-success-container">
    <div class="success-card">
      <i class="pi pi-check-circle success-icon"></i>
      <h2>Request Sent Successfully!</h2>
      <p>
        Your request has been sent to the seller. Please keep an eye on your email for their
        response.
      </p>
      <Button label="Back to Home" @click="goToHome" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()

const goToHome = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.request-success-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.success-card {
  text-align: center;
  padding: 3rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  max-width: 500px;
}

.success-icon {
  font-size: 4rem;
  color: #4caf50;
  margin-bottom: 1.5rem;
}
</style>
