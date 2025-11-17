<template>
  <div class="auth-page">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" />
      </div>
      <div>
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" />
      </div>
      <div class="actions">
        <button type="submit">Login</button>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import * as auth from '../services/auth'
import Logger from '../utils/logger'

const router = useRouter()
const form = reactive({ email: '', password: '' })
const error = ref('')
const success = ref('')

async function onSubmit() {
  error.value = ''
  success.value = ''
  if (!form.email || !form.password) {
    error.value = 'Email and password are required.'
    return
  }

  const res = await auth.login(form.email, form.password)
  if (res.ok) {
    try {
      await router.push({ path: '/' })
    } catch (e: any) {
      Logger.error(`Failed to redirect after login: ${e.toString()}`)
    }
  } else {
    error.value = res.error || 'Login failed.'
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
