<script setup>
import { computed, onMounted, onBeforeUnmount, ref, watch } from "vue"

const modules = import.meta.glob("../../public/photos/*.{jpg,jpeg,png,webp}", {
  eager: true,
})

const basePhotos = Object.values(modules).map((m) => m.default)

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const photos = ref(shuffle(basePhotos))

const openIndex = ref(-1)
const isOpen = computed(() => openIndex.value >= 0)

function open(i) {
  openIndex.value = i
}

function close() {
  openIndex.value = -1
}

function next() {
  openIndex.value = (openIndex.value + 1) % photos.value.length
}

function prev() {
  openIndex.value =
    (openIndex.value - 1 + photos.value.length) % photos.value.length
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
</script>

<template>
  <section>
    <div class="flex items-end justify-between gap-6">
      <div>
        <h2 class="text-3xl font-semibold tracking-tight">Photography</h2>
        <p class="mt-2 text-zinc-500 max-w-xl">
          A curated selection of portrait, event, and creative photography.
        </p>
      </div>

      <button
        @click="photos = shuffle(basePhotos)"
        class="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm hover:bg-zinc-50 transition"
      >
        Shuffle
      </button>
    </div>

    <div class="mt-10 columns-2 sm:columns-3 lg:columns-4 gap-5 space-y-5">
      <button
        v-for="(src, i) in photos"
        :key="src"
        @click="open(i)"
        class="group relative w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white hover:shadow-md transition break-inside-avoid"
      >
        <img
          :src="src"
          loading="lazy"
          alt=""
          class="w-full object-cover transition duration-500 group-hover:scale-[1.04]"
        />
        <div
          class="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black/30 to-transparent"
        ></div>
      </button>
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
            {{ openIndex + 1 }} / {{ photos.length }}
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
              :key="photos[openIndex]"
              :src="photos[openIndex]"
              class="max-h-[85vh] max-w-[92vw] object-contain rounded-2xl border border-white/10 shadow-2xl"
              alt=""
            />
          </Transition>
        </div>
      </div>
    </Transition>
  </section>
</template>
