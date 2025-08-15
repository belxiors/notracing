<template>
  <div class="request-entry-container">
    <h2>Request Race Entry</h2>
    <form @submit.prevent="submitForm">
      <div class="form-grid">
        <div class="form-field">
          <label for="name">Name</label>
          <InputText id="name" v-model="form.name" :class="{ 'p-invalid': errors.name }" />
          <small v-if="errors.name" class="p-error">{{ errors.name }}</small>
        </div>
        <div class="form-field">
          <label for="email">Email</label>
          <InputText id="email" v-model="form.email" :class="{ 'p-invalid': errors.email }" />
          <small v-if="errors.email" class="p-error">{{ errors.email }}</small>
        </div>
        <div class="form-field">
          <label for="subject">Subject</label>
          <InputText
            id="subject"
            v-model="form.subject"
            :class="{ 'p-invalid': errors.subject }"
            maxlength="50"
          />
          <small class="char-counter">{{ form.subject.length }}/50</small>
          <small v-if="errors.subject" class="p-error">{{ errors.subject }}</small>
        </div>
        <div class="form-field">
          <label for="message">Message</label>
          <Textarea
            id="message"
            v-model="form.message"
            :class="{ 'p-invalid': errors.message }"
            rows="5"
            maxlength="500"
          />
          <small class="char-counter">{{ form.message.length }}/500</small>
          <small v-if="errors.message" class="p-error">{{ errors.message }}</small>
        </div>
      </div>
      <Button label="Send" type="submit" :disabled="!isFormValid" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'

const router = useRouter()

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const errors = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const validateField = (field: keyof typeof form.value) => {
  switch (field) {
    case 'name':
      errors.value.name = form.value.name ? '' : 'Name is required.'
      break
    case 'email':
      errors.value.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)
        ? ''
        : 'A valid email is required.'
      break
    case 'subject':
      errors.value.subject = form.value.subject ? '' : 'Subject is required.'
      break
    case 'message':
      errors.value.message = form.value.message ? '' : 'Message is required.'
      break
  }
}

watch(
  form,
  (newForm) => {
    for (const field in newForm) {
      validateField(field as keyof typeof form.value)
    }
  },
  { deep: true },
)

const isFormValid = computed(() => {
  return (
    form.value.name &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) &&
    form.value.subject &&
    form.value.message
  )
})

const submitForm = () => {
  for (const field in form.value) {
    validateField(field as keyof typeof form.value)
  }
  if (isFormValid.value) {
    console.log('Form submitted:', form.value)
    router.push({ name: 'request-success' })
  }
}
</script>

<style scoped>
.request-entry-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #dee2e6;
  border-radius: 8px;
}

.form-grid {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field label {
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.p-error {
  color: #f44336;
  margin-top: 0.25rem;
}

.char-counter {
  text-align: right;
  font-size: 0.875rem;
  color: #6c757d;
  margin-top: 0.25rem;
}

.p-invalid {
  border-color: #f44336 !important;
}
</style>
