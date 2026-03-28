<template>
  <aside class="rounded-3xl border border-zinc-200 bg-white overflow-hidden">
    <div class="relative overflow-hidden">
      <div class="aspect-[4/3]">
        <img
          :src="profile"
          alt="Mohammad Nassif"
          class="h-full w-full object-cover object-[50%_20%]"
          loading="lazy"
        />
      </div>

      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      <div class="absolute bottom-6 left-6 right-6 text-white">
        <h1 class="text-2xl font-semibold tracking-tight leading-tight">
          Mohammad Nassif
        </h1>

        <div class="mt-3 flex items-center gap-3">
          <div class="h-px w-12 bg-[#C6A75E]"></div>
          <p class="text-xs uppercase tracking-[0.2em] text-white/80">
            Graphic Designer
          </p>
        </div>
      </div>
    </div>

    <div class="p-6">
      <p class="text-sm leading-relaxed text-zinc-600">
        Branding systems, social media campaigns, and print-ready layouts built for real production.
      </p>


      <div class="mt-8 flex items-center gap-3">
        <div class="h-px flex-1 bg-zinc-200"></div>
        <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Details
        </p>
        <div class="h-px flex-1 bg-zinc-200"></div>
      </div>

      <div class="mt-6">
        <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Skills
        </p>
        <div class="mt-3 grid grid-cols-2 gap-2">
          <div class="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900">
            Graphic Design
          </div>
          <div class="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900">
            Printing
          </div>
          <div class="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900">
            Social Media
          </div>
          <div class="rounded-2xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-900">
            Photography
          </div>
        </div>
      </div>

      <div class="mt-6 border-t border-zinc-200 pt-6">
        <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Contact
        </p>
        <div class="mt-3 space-y-2 text-sm text-zinc-700">
          <p><span class="text-zinc-500">Phone:</span> +964 751 012 8113</p>
          <p class="break-all">
            <span class="text-zinc-500">Email:</span> mhammad.nassif@gmail.com
          </p>
          <p><span class="text-zinc-500">Location:</span> Erbil, Iraq</p>
        </div>
      </div>

      <div class="mt-6 border-t border-zinc-200 pt-6">
        <p class="text-xs font-semibold uppercase tracking-widest text-zinc-500">
          Languages
        </p>
        <div class="mt-3 space-y-3">
          <LangBar label="Arabic" :value="1.0" />
          <LangBar label="English" :value="0.7" />
          <LangBar label="Kurdish (Sorani)" :value="0.6" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
import profile from "../../assets/profile.jpeg"
import LangBar from "./ui/LangBar.vue"
</script>
