<template>
  <div class="check-email-container">
    <div class="card">
      <h2>Check Your Email</h2>
      <p>
        We've sent a verification link to your email address. Please check your inbox and click the
        link to complete the process.
      </p>
      <div class="actions">
        <Button label="Resend Verification Email" @click="resendEmail" class="p-button-secondary" />
        <Button label="Back to Home" @click="goHome" />
      </div>
      <p v-if="emailResent" class="resent-message">A new verification email has been sent.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'

const router = useRouter()
const emailResent = ref(false)

const resendEmail = () => {
  // In a real application, this would trigger an API call to resend the email
  emailResent.value = true
}

const goHome = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped>
.check-email-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.card {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 400px;
}

.actions {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.resent-message {
  margin-top: 1rem;
  color: #28a745;
  font-weight: bold;
}
</style>
