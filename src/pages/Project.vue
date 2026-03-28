<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue"
import { useRoute, RouterLink } from "vue-router"
import { projects } from "../data/projects"
import { resolveWorkImage } from "../utils/resolveWorkImage"

const route = useRoute()

const project = computed(() =>
  projects.find((p) => p.slug === route.params.slug)
)

const openIndex = ref(-1)
const isOpen = computed(() => openIndex.value >= 0)

const imageModules = import.meta.glob(
  "../assets/work/**/*.{png,jpg,jpeg,webp}",
  { eager: true, import: "default" }
)

function normalizeAssetPath(path) {
  return path
    .replace(/^\.?\/*src\/assets\//, "")
    .replace(/^assets\//, "")
    .replace(/^\/+/, "")
}

function resolveImage(path) {
  if (!path) return ""
  // external URLs
  if (path.startsWith("http://") || path.startsWith("https://")) return path

  const normalized = normalizeAssetPath(path) // -> "work/white_tower/Image 2.jpeg"
  const key = `../assets/${normalized}` // -> "../assets/work/white_tower/Image 2.jpeg"

  return imageModules[key] || path
}

function open(i) {
  openIndex.value = i
}
function close() {
  openIndex.value = -1
}
function next() {
  if (!project.value) return
  openIndex.value = (openIndex.value + 1) % project.value.images.length
}
function prev() {
  if (!project.value) return
  openIndex.value =
    (openIndex.value - 1 + project.value.images.length) %
    project.value.images.length
}

function handleKey(e) {
  if (!isOpen.value) return
  if (e.key === "Escape") close()
  if (e.key === "ArrowRight") next()
  if (e.key === "ArrowLeft") prev()
}

onMounted(() => window.addEventListener("keydown", handleKey))
onBeforeUnmount(() => window.removeEventListener("keydown", handleKey))

watch(isOpen, (v) => {
  document.documentElement.style.overflow = v ? "hidden" : ""
})

const currentIndex = computed(() => {
  if (!project.value) return -1
  return projects.findIndex((p) => p.slug === project.value.slug)
})

const prevProject = computed(() => {
  if (currentIndex.value <= 0) return null
  return projects[currentIndex.value - 1]
})

const nextProject = computed(() => {
  if (currentIndex.value < 0 || currentIndex.value >= projects.length - 1)
    return null
  return projects[currentIndex.value + 1]
})
</script>

<template>
  <section v-if="project">
    <div class="text-sm text-zinc-500">
      <RouterLink to="/work" class="hover:text-zinc-900 transition">
        Work
      </RouterLink>
      <span class="mx-2">/</span>
      <span class="text-zinc-700">{{ project.title }}</span>
    </div>

    <div class="mt-6 flex flex-col gap-4">
      <div class="flex items-start justify-between gap-4">
        <h1 class="text-3xl md:text-4xl font-semibold tracking-tight">
          {{ project.title }}
        </h1>
        <span class="text-sm text-zinc-500">{{ project.year }}</span>
      </div>

      <p class="text-zinc-600 max-w-2xl leading-relaxed">
        {{ project.description }}
      </p>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="rounded-2xl border border-zinc-200 bg-white p-5">
          <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500">Problem</p>
          <p class="mt-2 text-sm text-zinc-700 leading-relaxed">{{ project.problem }}</p>
        </div>

        <div class="rounded-2xl border border-zinc-200 bg-white p-5">
          <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500">Strategy</p>
          <p class="mt-2 text-sm text-zinc-700 leading-relaxed">{{ project.strategy }}</p>
        </div>

        <div class="rounded-2xl border border-zinc-200 bg-white p-5">
          <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500">Result</p>
          <p class="mt-2 text-sm text-zinc-700 leading-relaxed">{{ project.result }}</p>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="c in project.categories"
          :key="c"
          class="rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600"
        >
          {{ c }}
        </span>
      </div>

      <div class="mt-2 flex flex-wrap gap-2">
        <span
          v-for="d in project.deliverables"
          :key="d"
          class="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700"
        >
          {{ d }}
        </span>
      </div>
    </div>

    <div class="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        v-for="(img, i) in project.images"
        :key="img + i"
        @click="open(i)"
        class="group overflow-hidden rounded-3xl border border-zinc-200 bg-white hover:shadow-md transition"
      >
        <img
          :src="resolveWorkImage(img)"
          alt=""
          loading="lazy"
          class="w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
      </button>
    </div>

    <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <RouterLink
        v-if="prevProject"
        :to="`/work/${prevProject.slug}`"
        class="rounded-2xl border border-zinc-200 bg-white p-5 hover:bg-zinc-50 transition"
      >
        <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Previous
        </p>
        <p class="mt-2 font-semibold tracking-tight text-zinc-900">
          {{ prevProject.title }}
        </p>
        <p class="mt-1 text-sm text-zinc-600">
          {{ prevProject.categories.join(" • ") }}
        </p>
      </RouterLink>

      <RouterLink
        v-if="nextProject"
        :to="`/work/${nextProject.slug}`"
        class="rounded-2xl border border-zinc-200 bg-white p-5 hover:bg-zinc-50 transition"
      >
        <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Next
        </p>
        <p class="mt-2 font-semibold tracking-tight text-zinc-900">
          {{ nextProject.title }}
        </p>
        <p class="mt-1 text-sm text-zinc-600">
          {{ nextProject.categories.join(" • ") }}
        </p>
      </RouterLink>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
        @click.self="close"
      >
        <div class="absolute top-5 left-5 right-5 flex items-center justify-between gap-3">
          <p class="text-sm text-white/70">
            {{ openIndex + 1 }} / {{ project.images.length }}
          </p>

          <button
            @click="close"
            class="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
          >
            Close (Esc)
          </button>
        </div>

        <button
          @click.stop="prev"
          class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 px-4 py-3 text-white hover:bg-white/20 transition"
          aria-label="Previous"
        >
          ‹
        </button>

        <button
          @click.stop="next"
          class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/10 px-4 py-3 text-white hover:bg-white/20 transition"
          aria-label="Next"
        >
          ›
        </button>

        <div class="h-full w-full flex items-center justify-center p-6">
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
            mode="out-in"
          >
            <img
              :key="project.images[openIndex]"
              :src="resolveWorkImage(project.images[openIndex])"
              class="max-h-[85vh] max-w-[92vw] object-contain rounded-2xl border border-white/10 shadow-2xl"
              alt=""
            />
          </Transition>
        </div>
      </div>
    </Transition>
  </section>

  <section v-else class="rounded-2xl border border-zinc-200 bg-white p-6">
    <h2 class="text-xl font-semibold tracking-tight">Project not found</h2>
    <p class="mt-2 text-zinc-600">
      This project doesn’t exist. Go back to
      <RouterLink to="/work" class="underline">Work</RouterLink>.
    </p>
  </section>
</template>
