<template>
  <div class="auth-shell">
    <div class="auth-box">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-shell { display:flex; align-items:center; justify-content:center; min-height:70vh }
.auth-box { width:100%; max-width:420px; padding:2rem; border:1px solid #eee; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.04) }
</style>
