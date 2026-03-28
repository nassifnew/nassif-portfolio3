<template>
  <div>
    <div class="flex items-center justify-between text-sm">
      <span class="text-zinc-700">{{ label }}</span>
      <span class="text-zinc-500">{{ Math.round(value * 100) }}%</span>
    </div>
    <div class="mt-2 h-2 rounded-full bg-zinc-100 overflow-hidden">
      <div class="h-full bg-zinc-900" :style="{ width: `${value * 100}%` }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  value: Number,
})
</script>
