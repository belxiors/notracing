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
  logo: string
}

// Mock data - in a real application, this would be fetched from an API
const races: Race[] = [
  {
    id: 1,
    name: 'Marathon du Mont-Blanc',
    date: '2024-06-30',
    location: 'Chamonix, France',
    logo: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Hardrock 100',
    date: '2024-07-12',
    location: 'Silverton, Colorado',
    logo: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'UTMB',
    date: '2024-08-26',
    location: 'Chamonix, France',
    logo: 'https://via.placeholder.com/150',
  },
]

const participants = ref([
  { id: 1, name: 'John Doe', dateAdded: '2024-07-20', reason: 'Injury' },
  { id: 2, name: 'Jane Smith', dateAdded: '2024-07-21', reason: 'Work conflict' },
  { id: 3, name: 'Peter Jones', dateAdded: '2024-07-22', reason: 'Personal reasons' },
])

const route = useRoute()
const router = useRouter()
const race = ref<Race | null>(null)

onMounted(() => {
  const raceId = parseInt(route.params.id as string)
  race.value = races.find((r) => r.id === raceId) || null
})

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
