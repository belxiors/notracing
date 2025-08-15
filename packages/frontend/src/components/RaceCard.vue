<template>
  <div @click="handleClick" :class="{ 'clickable-card': isClickable }">
    <Card class="race-card">
      <template #header>
        <img :src="race.image" alt="Race Image" style="width: 100%" />
      </template>
      <template #title>{{ race.name }}</template>
      <template #subtitle>{{ race.location }} - {{ race.date }}</template>
      <template #content>
        <p>{{ race.description }}</p>
      </template>
      <template #footer>
        <Tag value="Event" />
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import { useRouter } from 'vue-router'

const props = defineProps({
  race: {
    type: Object,
    required: true,
  },
  isClickable: {
    type: Boolean,
    default: true,
  },
})

const router = useRouter()

const handleClick = () => {
  if (props.isClickable) {
    router.push({ name: 'race-detail', params: { id: props.race.id } })
  }
}
</script>

<style scoped>
.race-card {
  margin-bottom: 1rem;
}

.clickable-card {
  cursor: pointer;
}
</style>
