<script setup>
import { computed } from "vue"

const props = defineProps({
  text: { type: String, required: true },
  delay: { type: Number, default: 0.12 },
  start: { type: Number, default: 0.15 },
})

const words = computed(() => props.text.split(" ").filter(Boolean))
</script>

<template>
  <span class="inline-flex flex-wrap gap-x-2">
    <span
      v-for="(w, i) in words"
      :key="`${w}-${i}`"
      class="word-emphasis"
      :style="{ animationDelay: `${start + i * delay}s` }"
    >
      {{ w }}
    </span>
  </span>
</template>

<style scoped>
.word-emphasis {
  display: inline-block;
  opacity: 0;
  transform: translateY(10px);
  animation: wordIn 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes wordIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
