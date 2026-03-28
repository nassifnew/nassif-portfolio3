<script setup>
import { useRoute } from "vue-router"
import { ref, nextTick } from "vue"

const route = useRoute()
const open = ref(false)

function isActive(path) {
  if (path === "/") return route.path === "/"
  return route.path.startsWith(path)
}

function toggle() {
  open.value = !open.value
}

function close() {
  open.value = false
}

function beforeEnter(el) {
  el.style.height = "0"
  el.style.opacity = "0"
}

async function enter(el) {
  await nextTick()
  const h = el.scrollHeight
  el.style.height = h + "px"
  el.style.opacity = "1"
}

function afterEnter(el) {
  el.style.height = "auto"
}

function beforeLeave(el) {
  el.style.height = el.scrollHeight + "px"
  el.style.opacity = "1"
}

function leave(el) {
  // force reflow
  void el.offsetHeight
  el.style.height = "0"
  el.style.opacity = "0"
}
</script>

<template>
  <header class="relative rounded-2xl border border-zinc-200 bg-white/90 backdrop-blur">
    <div class="px-6 py-4 flex items-center justify-between">
      <RouterLink to="/" @click="close" class="group">
        <p
          class="text-xs font-semibold uppercase tracking-widest transition"
          :class="route.path === '/' ? 'text-[#C6A75E]' : 'text-zinc-500 group-hover:text-zinc-900'"
        >
          Portfolio
        </p>
        <p class="mt-1 text-sm text-zinc-600 group-hover:text-zinc-900 transition">
          Branding • Social • Print • Photography
        </p>
      </RouterLink>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center gap-6 text-sm">
        <RouterLink
          to="/work"
          class="relative pb-1 transition"
          :class="isActive('/work') ? 'text-[#C6A75E]' : 'text-zinc-600 hover:text-zinc-900'"
        >
          Work
          <span v-if="isActive('/work')" class="absolute left-0 -bottom-0.5 h-px w-full bg-[#C6A75E]"></span>
        </RouterLink>

        <RouterLink
          to="/photos"
          class="relative pb-1 transition"
          :class="isActive('/photos') ? 'text-[#C6A75E]' : 'text-zinc-600 hover:text-zinc-900'"
        >
          Photos
          <span v-if="isActive('/photos')" class="absolute left-0 -bottom-0.5 h-px w-full bg-[#C6A75E]"></span>
        </RouterLink>

        <RouterLink
          to="/about"
          class="relative pb-1 transition"
          :class="isActive('/about') ? 'text-[#C6A75E]' : 'text-zinc-600 hover:text-zinc-900'"
        >
          About
          <span v-if="isActive('/about')" class="absolute left-0 -bottom-0.5 h-px w-full bg-[#C6A75E]"></span>
        </RouterLink>

        <RouterLink
          to="/contact"
          class="relative pb-1 transition"
          :class="isActive('/contact') ? 'text-[#C6A75E]' : 'text-zinc-600 hover:text-zinc-900'"
        >
          Contact
          <span v-if="isActive('/contact')" class="absolute left-0 -bottom-0.5 h-px w-full bg-[#C6A75E]"></span>
        </RouterLink>

        <a
          href="/cv.pdf"
          class="ml-4 rounded-full bg-[#1C1C1C] px-4 py-2 text-white text-sm font-medium hover:bg-black transition"
        >
          Download CV
        </a>
      </nav>

      <button
        @click="toggle"
        class="md:hidden relative w-10 h-10 flex flex-col justify-center items-center"
        aria-label="Toggle menu"
      >
        <span
          class="block h-0.5 w-6 bg-zinc-900 transition"
          :class="open ? 'rotate-45 translate-y-1.5' : ''"
        ></span>
        <span
          class="block h-0.5 w-6 bg-zinc-900 my-1 transition"
          :class="open ? 'opacity-0' : ''"
        ></span>
        <span
          class="block h-0.5 w-6 bg-zinc-900 transition"
          :class="open ? '-rotate-45 -translate-y-1.5' : ''"
        ></span>
      </button>
    </div>

    <Transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div
        v-if="open"
        class="md:hidden overflow-hidden border-t border-zinc-200 bg-white px-6"
        style="transition: height 220ms ease, opacity 220ms ease;"
      >
        <div class="py-6 space-y-6 text-lg">
          <RouterLink
            to="/work"
            @click="close"
            class="block transition"
            :class="isActive('/work') ? 'text-[#C6A75E]' : 'text-zinc-800'"
          >
            Work
          </RouterLink>

          <RouterLink
            to="/photos"
            @click="close"
            class="block transition"
            :class="isActive('/photos') ? 'text-[#C6A75E]' : 'text-zinc-800'"
          >
            Photos
          </RouterLink>

          <RouterLink
            to="/about"
            @click="close"
            class="block transition"
            :class="isActive('/about') ? 'text-[#C6A75E]' : 'text-zinc-800'"
          >
            About
          </RouterLink>

          <RouterLink
            to="/contact"
            @click="close"
            class="block transition"
            :class="isActive('/contact') ? 'text-[#C6A75E]' : 'text-zinc-800'"
          >
            Contact
          </RouterLink>

          <a
            href="/cv.pdf"
            class="inline-flex items-center justify-center rounded-full bg-[#1C1C1C] px-6 py-3 text-white text-sm font-medium hover:bg-black transition"
          >
            Download CV
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
