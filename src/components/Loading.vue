<template>
  <output class="app-loading" aria-live="polite" aria-busy="true">
    <div class="backdrop" />
    <div class="spinner-wrap">
      <div class="spinner" aria-hidden="true" />
      <div class="label">Loading…</div>
    </div>
  </output>
</template>

<script setup lang="ts">
</script>

<style scoped>
 .app-loading {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  pointer-events: auto;
 }

 .backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(4px) saturate(1.05);
 }

  .spinner-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  background: rgba(0,0,0,0.75);
  color: #fff;
  transform: translateZ(0);
 }

 .spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 4px solid rgba(255,255,255,0.12);
  border-top-color: #ffffff;
  animation: spin 900ms linear infinite;
  box-shadow: 0 6px 20px rgba(0,0,0,0.35);
 }

 .label {
  font-size: 0.95rem;
  color: rgba(255,255,255,0.95);
  font-weight: 600;
 }

 @keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
 }
</style>
