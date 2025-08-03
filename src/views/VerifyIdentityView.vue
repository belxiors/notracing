<template>
  <div class="verify-identity-container">
    <h1>Verify Your Identity</h1>
    <p>
      Please enter your email address below. We will send you a secure link to verify your identity.
    </p>
    <div class="input-container">
      <InputText id="email" v-model="email" type="email" placeholder="Enter your email" />
      <Button label="Send Link" @click="sendVerificationLink" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const email = ref('')

const sendVerificationLink = () => {
  // Here you would typically call an API to send the verification link
  console.log('Verification link sent to:', email.value)
  alert('A verification link has been sent to your email address.')
}
</script>

<style scoped>
.verify-identity-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  text-align: center;
}

.input-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
  gap: 1rem;
}
</style>
