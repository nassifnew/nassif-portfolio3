<script setup>
import { onMounted, ref } from "vue"

const visible = ref(false)
const el = ref(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer.disconnect()
      }
    },
    { threshold: 0.15 }
  )

  observer.observe(el.value)
})
</script>

<template>
  <div
    ref="el"
    :class="[
      'transition duration-900 ease-out',
      visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    ]"
  >
    <slot />
  </div>
</template>
