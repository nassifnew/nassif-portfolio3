<template>
  <div class="min-h-screen bg-white text-zinc-900 text-[15px]">
    <div class="mx-auto max-w-6xl px-4 py-8">
      <div class="grid gap-8 lg:grid-cols-[320px_1fr]">
        <aside class="lg:sticky lg:top-8 h-fit">
          <Sidebar />
        </aside>

        <main class="min-w-0">
          <TopNav />

          <div class="mt-8">
            <RouterView v-slot="{ Component }">
              <Transition
                mode="out-in"
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 translate-y-2"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-2"
              >
                <component :is="Component" />
              </Transition>
            </RouterView>
          </div>

          <Footer class="mt-12" />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from "./components/layout/Sidebar.vue"
import TopNav from "./components/layout/ui/TopNav.vue"
import Footer from "./components/layout/Footer.vue"
</script>
