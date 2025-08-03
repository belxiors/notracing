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
import { ref } from 'vue'
import RaceCard from '@/components/RaceCard.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const email = ref('')

const races = ref([
  {
    id: 1,
    name: 'City Marathon',
    date: '2025-10-15',
    location: 'Metropolis',
    price: '€50',
    image: 'https://i.imgur.com/3aG1YfM.png',
    description:
      'The annual city marathon is back! Join us for a scenic run through the heart of Metropolis.',
  },
  {
    id: 2,
    name: 'Coastal Half Marathon',
    date: '2025-11-02',
    location: 'Sunny Bay',
    price: '€35',
    image: 'https://i.imgur.com/3aG1YfM.png',
    description:
      'Enjoy breathtaking ocean views as you run along the beautiful coastline of Sunny Bay.',
  },
  {
    id: 3,
    name: 'Mountain Trail Run',
    date: '2025-09-20',
    location: 'Green Valley',
    price: '€45',
    image: 'https://i.imgur.com/3aG1YfM.png',
    description:
      'Challenge yourself with this demanding trail run through the stunning Green Valley mountains.',
  },
])

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
