<template>
  <div class="user-page-container">
    <div v-if="user" class="card">
      <h2>User Profile</h2>
      <div class="user-info">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Date of Birth:</strong> {{ user.dob }}</p>
      </div>
      <div class="race-entries">
        <h3>Your Race Entries</h3>
        <div v-if="user.raceEntries.length > 0" class="race-list">
          <RaceCard v-for="race in user.raceEntries" :key="race.id" :race="race" />
        </div>
        <p v-else>You have no race entries for sale.</p>
      </div>
    </div>
    <div v-else class="card">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RaceCard from '@/components/RaceCard.vue'

interface Race {
  id: number
  name: string
  date: string
  location: string
  image: string
  description: string
  price: string
}

interface User {
  name: string
  email: string
  dob: string
  raceEntries: Race[]
}

const user = ref<User | null>(null)
const message = ref('Loading user data...')

onMounted(async () => {
  const token = sessionStorage.getItem('authToken')
  if (!token) {
    message.value = 'You are not authorized to view this page.'
    return
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
      headers: {
        'X-AUTH-TOKEN': token,
      },
    })
    if (response.ok) {
      user.value = await response.json()
    } else {
      const data = await response.json()
      message.value = data.error || 'Failed to fetch user data.'
    }
  } catch {
    message.value = 'Failed to connect to the server.'
  }
})
</script>

<style scoped>
.user-page-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.card {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.user-info {
  margin-bottom: 2rem;
}

.race-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
