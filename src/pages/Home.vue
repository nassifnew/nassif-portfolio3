<script setup>
import Reveal from "../components/layout/ui/Reveal.vue"
import { computed } from "vue"
import { projects } from "../data/projects"
import WordEmphasis from "../components/ui/WordEmphasis.vue"

import { resolveWorkImage } from "../utils/resolveWorkImage"
const featured = computed(() => projects.slice(0, 3))
</script>

<template>
  <section>
    <Reveal>
      <div class="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-8 md:p-12">

        <div
          class="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-[#C6A75E]/10 blur-3xl"
        ></div>

        <div
          class="absolute inset-0 bg-gradient-to-br from-white via-white to-zinc-50"
        ></div>
        <div class="relative z-10 max-w-4xl">

          <p class="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Branding • Social • Print • Production
          </p>
          <h1 class="mt-6 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05] text-zinc-900">
            I design
            <span class="relative inline-block">
              <span class="relative z-10">
                <WordEmphasis text="brand identities" :start="0.15" :delay="0.12" />
              </span>
              <span
                class="absolute left-0 -bottom-1 h-[2px] w-full bg-[#C6A75E] scale-x-0 animate-underline"
              ></span>
            </span>
            that stay consistent from screen to print to fabric.
          </h1>



          <p class="mt-6 text-zinc-600 leading-relaxed max-w-2xl">
            I create visual systems for client brands, social media campaigns,
            and production-ready print files. Clean typography, strong layouts,
            real-world execution.
          </p>

          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink
              to="/work"
              class="group relative inline-flex items-center justify-center rounded-full bg-[#1C1C1C] px-6 py-3 text-sm font-medium text-white transition hover:bg-black"
            >
              <span class="relative z-10">View Work</span>
              <span class="absolute inset-0 rounded-full border border-transparent transition group-hover:border-[#C6A75E]"></span>
            </RouterLink>

            <RouterLink
              to="/photos"
              class="rounded-full border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition hover:border-[#C6A75E] hover:text-zinc-900"
            >
              Photography
            </RouterLink>
          </div>

        </div>
      </div>
    </Reveal>

    <Reveal>
      <div class="mt-14">
        <div class="flex items-end justify-between">
          <div>
            <p class="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
              Featured Work
            </p>
            <h2 class="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
              Selected projects
            </h2>
          </div>

          <RouterLink
            to="/work"
            class="text-sm font-medium text-zinc-700 hover:text-zinc-900 transition"
          >
            View all →
          </RouterLink>
        </div>

        <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink
            v-for="p in featured"
            :key="p.slug"
            :to="`/work/${p.slug}`"
            class="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white hover:shadow-md transition"
          >
            <div class="aspect-[4/3] overflow-hidden bg-zinc-50 relative">
              <img
                :src="resolveWorkImage(p.cover)"
                :alt="p.title"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div
                class="absolute inset-x-0 bottom-0 h-1 opacity-0 transition group-hover:opacity-100"
                style="background: linear-gradient(90deg, transparent, #C6A75E, transparent);"
              ></div>
            </div>

            <div class="p-5">
              <div class="flex items-start justify-between">
                <h3 class="font-semibold tracking-tight text-zinc-900">
                  {{ p.title }}
                </h3>
                <span class="text-sm text-zinc-500">{{ p.year }}</span>
              </div>
              <p class="mt-2 text-sm text-zinc-600 line-clamp-2">
                {{ p.description }}
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </Reveal>
  </section>
</template>
