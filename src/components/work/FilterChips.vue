<script setup>
defineProps({
  items: Array,
  modelValue: String,
})
defineEmits(["update:modelValue"])
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="item in items"
      :key="item"
      @click="$emit('update:modelValue', item)"
      class="relative rounded-full px-4 py-2 text-sm font-medium transition"
      :class="
        modelValue === item
          ? 'text-zinc-900'
          : 'text-zinc-600 hover:text-zinc-900'
      "
    >
      <span
        class="absolute inset-0 rounded-full border transition"
        :class="
          modelValue === item
            ? 'border-[#C6A75E] bg-[#C6A75E]/10'
            : 'border-zinc-200 bg-white hover:border-[#C6A75E]/60'
        "
      ></span>

      <span class="relative z-10">
        {{ item }}
      </span>
    </button>
  </div>
</template>
