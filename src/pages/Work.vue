<script setup>
import { computed, ref } from "vue"
import { projects } from "../data/projects"
import WorkCard from "../components/work/WorkCard.vue"
import FilterChips from "../components/work/FilterChips.vue"

import { resolveWorkImage } from "../utils/resolveWorkImage"
const allCategories = computed(() => {
  const set = new Set()
  projects.forEach((p) => p.categories.forEach((c) => set.add(c)))
  return ["All", ...Array.from(set)]
})

const active = ref("All")

const filtered = computed(() => {
  if (active.value === "All") return projects
  return projects.filter((p) => p.categories.includes(active.value))
})

const featured = computed(() =>
  filtered.value.filter((p) => p.featured).slice(0, 1)
)

const rest = computed(() => {
  const featuredSlug = featured.value[0]?.slug
  return filtered.value.filter((p) => p.slug !== featuredSlug)
})
</script>

<template>
  <section>
    <div class="flex items-end justify-between gap-4">
      <div>
        <h2 class="text-3xl font-semibold tracking-tight">Work</h2>
        <p class="mt-2 text-zinc-500 max-w-2xl">
          Selected branding systems, social campaigns, and print-ready production work.
        </p>
      </div>
    </div>

    <div class="mt-6">
      <FilterChips v-model="active" :items="allCategories" />
    </div>

    <div v-if="featured.length" class="mt-10">
      <RouterLink
        :to="`/work/${featured[0].slug}`"
        class="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white hover:shadow-md transition"
      >
        <div class="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr]">
          <div class="relative overflow-hidden bg-zinc-50">
            <img
              :src="resolveWorkImage(featured[0].cover)"
              :alt="featured[0].title"
              class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div
              class="pointer-events-none absolute inset-x-0 bottom-0 h-1 opacity-100"
              style="background: linear-gradient(90deg, transparent, #C6A75E, transparent);"
            ></div>
          </div>

          <div class="p-6 lg:p-8">
            <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500">
              Featured Project
            </p>

            <h3 class="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">
              {{ featured[0].title }}
            </h3>

            <p class="mt-2 text-sm text-zinc-600">
              {{ featured[0].description }}
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span
                v-for="c in featured[0].categories"
                :key="c"
                class="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-xs text-zinc-600"
              >
                {{ c }}
              </span>
            </div>

            <div class="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-900">
              View Case Study
              <span class="text-[#C6A75E]">→</span>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <WorkCard v-for="p in rest" :key="p.slug" :project="p" />
    </div>
  </section>
</template>
