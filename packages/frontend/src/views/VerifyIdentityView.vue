<template>
  <div class="verify-identity-container">
    <h1>Verify Your Identity</h1>
    <p>
      Please enter your email address below. We will send you a secure link to verify your identity.
    </p>
    <div class="input-container">
      <InputText
        id="email"
        v-model="email"
        type="email"
        placeholder="Enter your email"
        :class="{ 'p-invalid': emailError }"
      />
      <Button label="Send Link" @click="sendVerificationLink" />
    </div>
    <small v-if="emailError" class="p-error">{{ emailError }}</small>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const email = ref('')
const emailError = ref('')
const router = useRouter()

const validateEmail = () => {
  if (!email.value) {
    emailError.value = 'Email is required.'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Invalid email format.'
    return false
  }
  emailError.value = ''
  return true
}

const sendVerificationLink = async () => {
  if (validateEmail()) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.value }),
      })
      if (response.ok) {
        router.push({ name: 'check-email' })
      } else {
        const data = await response.json()
        emailError.value = data.error || 'An unknown error occurred.'
      }
    } catch {
      emailError.value = 'Failed to connect to the server.'
    }
  }
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

.p-error {
  display: block;
  margin-top: 0.5rem;
  color: red;
}
</style>
