<template>
  <div>
    <div class="hero-section">
      <div class="hero-content">
        <h1>The safest way to buy and sell tickets</h1>
        <form @submit.prevent="subscribe" class="p-fluid">
          <div class="p-inputgroup">
            <InputText type="email" v-model="email" placeholder="Enter your email" />
            <Button type="submit" label="Subscribe" />
          </div>
        </form>
      </div>
    </div>
    <div class="container">
      <h2>Available Race Entries</h2>
      <div class="race-list">
        <RaceCard v-for="race in races" :key="race.id" :race="race" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RaceCard from '@/components/RaceCard.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

interface Race {
  id: number
  name: string
  location: string
  date: string
  price: string
  image: string
  description: string
}

const email = ref('')
const races = ref<Race[]>([])

const fetchRaces = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/races', {
      headers: {
        'X-API-KEY': 'super-secret-key',
      },
    })
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    races.value = await response.json()
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
  }
}

onMounted(() => {
  fetchRaces()
})

const subscribe = () => {
  if (email.value) {
    alert(`Subscribed with ${email.value}`)
    email.value = ''
  }
}
</script>

<style scoped>
.hero-section {
  background-image: url('https://i.imgur.com/3aG1YfM.png');
  background-size: cover;
  background-position: center;
  color: #fff;
  text-align: center;
  padding: 4rem 0;
}

.hero-content {
  max-width: 600px;
  margin: 0 auto;
}

.container {
  padding: 2rem;
}

.race-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
</style>
