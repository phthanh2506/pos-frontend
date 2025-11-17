<template>
  <div>
    <h2>Reset Password</h2>
    <form @submit.prevent="onSubmit">
      <div>
        <label for="password">New password</label>
        <input id="password" type="password" v-model="form.password" />
      </div>
      <div>
        <label for="confirm">Confirm password</label>
        <input id="confirm" type="password" v-model="form.confirm" />
      </div>
      <div class="actions">
        <button type="submit">Set new password</button>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import * as auth from '../services/auth'

const route = useRoute()
const token = (route.params.token as string) || ''

const form = reactive({ password: '', confirm: '' })
const error = ref('')
const success = ref('')

async function onSubmit() {
  error.value = ''
  success.value = ''
  if (!form.password) {
    error.value = 'Password is required.'
    return
  }
  if (form.password !== form.confirm) {
    error.value = 'Passwords do not match.'
    return
  }

  const res = await auth.resetPassword(token, form.password)
  if (res.ok) {
    success.value = 'Password has been reset (mock).'
  } else {
    error.value = res.error || 'Reset failed.'
  }
}
</script>

<style scoped>
.error { color: #c53030 }
.success { color: #2f855a }
.actions { margin-top:1rem }
label { display:block; margin-top:0.5rem }
input { width:100%; padding:0.5rem; margin-top:0.25rem }
</style>
