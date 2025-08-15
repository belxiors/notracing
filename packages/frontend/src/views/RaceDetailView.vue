<template>
  <div class="race-detail-container">
    <div v-if="race">
      <RaceCard :race="race" :is-clickable="false" />
      <div class="participants-table">
        <h2>Available Entries</h2>
        <DataTable :value="participants">
          <Column field="name" header="Name"></Column>
          <Column field="dateAdded" header="Date Added"></Column>
          <Column field="reason" header="Reason"></Column>
          <Column header="Action">
            <template #body="slotProps">
              <Button label="Request Entry" @click="requestEntry(slotProps.data.id)" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
    <div v-else>
      <p>Race not found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RaceCard from '@/components/RaceCard.vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

interface Race {
  id: number
  name: string
  date: string
  location: string
  image: string
  description: string
  price: string
}

interface Participant {
  id: number
  name: string
  dateAdded: string
  reason: string
}

const route = useRoute()
const router = useRouter()
const race = ref<Race | null>(null)
const participants = ref<Participant[]>([])

const fetchRaceDetails = async () => {
  const raceId = route.params.id
  try {
    const [raceResponse, participantsResponse] = await Promise.all([
      fetch(`http://localhost:3000/api/races/${raceId}`, {
        headers: { 'X-API-KEY': 'super-secret-key' },
      }),
      fetch(`http://localhost:3000/api/races/${raceId}/participants`, {
        headers: { 'X-API-KEY': 'super-secret-key' },
      }),
    ])

    if (!raceResponse.ok || !participantsResponse.ok) {
      throw new Error('Failed to fetch race details')
    }

    race.value = await raceResponse.json()
    participants.value = await participantsResponse.json()
  } catch (error) {
    console.error(error)
  }
}

onMounted(fetchRaceDetails)

const requestEntry = (participantId: number) => {
  router.push({ name: 'request-entry', params: { raceId: race.value?.id, participantId } })
}
</script>

<style scoped>
.race-detail-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.participants-table {
  margin-top: 2rem;
}
</style>
