<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
    <div class="container max-w-6xl flex items-center justify-between py-4">
      <RouterLink to="/" class="flex flex-col leading-tight">
        <span class="text-lg font-semibold tracking-tight">Mohammad Nassif</span>
        <span class="text-sm text-zinc-400">Graphic Designer</span>
      </RouterLink>

      <nav class="hidden md:flex items-center gap-6 text-sm">
        <RouterLink class="hover:text-white text-zinc-300" to="/work">Work</RouterLink>
        <RouterLink class="hover:text-white text-zinc-300" to="/photos">Photos</RouterLink>
        <RouterLink class="hover:text-white text-zinc-300" to="/about">About</RouterLink>
        <RouterLink class="hover:text-white text-zinc-300" to="/contact">Contact</RouterLink>

        <a
          href="/cv.pdf"
          class="ml-2 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-zinc-100 hover:bg-white/10 transition"
        >
          Download CV
        </a>
      </nav>

      <RouterLink
        to="/work"
        class="md:hidden inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
      >
        Work
      </RouterLink>
    </div>
  </header>
</template>
