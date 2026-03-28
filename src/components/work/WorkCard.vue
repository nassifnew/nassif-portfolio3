<script setup>
const props = defineProps({ project: Object })


import { resolveWorkImage } from "../../utils/resolveWorkImage"


function normalizeAssetPath(path) {
  return (path || "")
    .replace(/^\.?\/*src\/assets\//, "")
    .replace(/^assets\//, "")
    .replace(/^\/+/, "")
}
const imageModules = import.meta.glob(
  "../assets/work/**/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
)

function resolveImage(path) {
  if (!path) return ""
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return imageModules[`../assets/${path}`] || ""
}

</script>

<template>
  <RouterLink
    :to="`/work/${project.slug}`"
    class="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white hover:shadow-md transition"
  >
    <div class="relative aspect-[4/3] overflow-hidden bg-zinc-50">
      <img
        :src="resolveWorkImage(project.cover)"
        :alt="project.title"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        loading="lazy"
      />

      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 h-1 opacity-0 transition group-hover:opacity-100"
        style="background: linear-gradient(90deg, transparent, #C6A75E, transparent);"
      ></div>
    </div>

    <div class="p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-semibold tracking-tight text-zinc-900">
          {{ project.title }}
        </h3>
        <span class="text-sm text-zinc-500">{{ project.year }}</span>
      </div>

      <p class="mt-2 text-sm text-zinc-600 line-clamp-2">
        {{ project.description }}
      </p>

      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="c in project.categories"
          :key="c"
          class="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-600"
        >
          {{ c }}
        </span>
      </div>
    </div>
  </RouterLink>
</template>
