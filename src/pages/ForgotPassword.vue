<template>
  <div class="auth-page">
    <h2>Forgot Password</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" />
      </div>
      <div class="actions">
        <button type="submit">Send reset link</button>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import * as auth from '../services/auth'

const form = reactive({ email: '' })
const error = ref('')
const success = ref('')

async function onSubmit() {
  error.value = ''
  success.value = ''
  if (!form.email) {
    error.value = 'Email is required.'
    return
  }

  const res = await auth.forgotPassword(form.email)
  if (res.ok) {
    success.value = 'If that email exists, a reset link was sent (mock).'
  } else {
    error.value = res.error || 'Request failed.'
  }
}
</script>

<style scoped>
.error { color: #c53030 }
.success { color: #2f855a }
.auth-page { max-width: 420px; margin: 2rem auto }
label { display:block; margin-top:0.5rem }
input { width:100%; padding:0.5rem; margin-top:0.25rem }
.actions { margin-top:1rem }
</style>
