<template>
  <div class="email-verified-container">
    <div class="card">
      <div v-if="loading">
        <h2>Verifying your email...</h2>
        <p>Please wait a moment.</p>
      </div>
      <div v-else>
        <div v-if="success">
          <h2>Email Verified!</h2>
          <p>Redirecting to your user page in {{ countdown }} seconds...</p>
        </div>
        <div v-else>
          <h2>Verification Failed</h2>
          <p>{{ message }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const success = ref(false)
const message = ref('')
const countdown = ref(3)

onMounted(async () => {
  const token = route.params.token as string
  if (!token) {
    loading.value = false
    success.value = false
    message.value = 'No verification token found.'
    return
  }

  try {
    const response = await fetch(`http://localhost:3000/api/validate-token/${token}`)
    const data = await response.json()
    if (response.ok) {
      success.value = true
      sessionStorage.setItem('authToken', data.token)
      const interval = setInterval(() => {
        countdown.value--
        if (countdown.value === 0) {
          clearInterval(interval)
          router.push({ name: 'user-page' })
        }
      }, 1000)
    } else {
      success.value = false
      message.value = data.error || 'An unknown error occurred.'
    }
  } catch (error) {
    success.value = false
    message.value = 'Failed to connect to the server.'
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.email-verified-container {
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
</style>
