<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import Loading from './components/Loading.vue'
import { useLoadingStore } from './stores/loading'

const layouts: Record<string, any> = {
  default: DefaultLayout,
  auth: AuthLayout,
}

const route = useRoute()
const Layout = computed(() => {
  const key = (route.meta.layout as string) || 'default'
  return layouts[key] ?? DefaultLayout
})

const loading = useLoadingStore()
const showLoading = computed(() => {
  return loading.loadingCount > 0 || Object.values(loading.loadingMap).some(Boolean)
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <component :is="Layout">
      <component :is="Component" />
    </component>
  </RouterView>

  <Loading v-if="showLoading" />
</template>

<style scoped>
  .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
