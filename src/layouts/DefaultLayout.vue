<template>
  <div class="default-shell">
    <header class="app-header">
      <nav>
        <router-link to="/">Home</router-link>
        |
        <router-link to="/login">Login</router-link>
        |
        <router-link to="/register">Register</router-link>
        |
        <router-link to="/forgot">Forgot</router-link>
      </nav>
    </header>

    <main class="content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.app-header { padding: 1rem; border-bottom: 1px solid #eee }
.content { padding: 1.5rem }
nav a { margin: 0 0.25rem }
</style>
