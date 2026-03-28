<script setup>
import { ref } from "vue"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Copy,
  Send,
  FileDown,
  Sparkles,
} from "lucide-vue-next"

const EMAIL = "mhammad.nassif@gmail.com"
const PHONE_DISPLAY = "+964 751 012 8113"
const PHONE_TEL = "+9647510128113"
const LOCATION = "Erbil, Iraq"
const LINKEDIN =
  "https://www.linkedin.com/in/mhammad-nassif?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"

function mailto(subject = "", body = "") {
  const s = encodeURIComponent(subject)
  const b = encodeURIComponent(body)
  window.location.href = `mailto:${EMAIL}?subject=${s}&body=${b}`
}

function submit(e) {
  const form = e.target
  mailto(
    "Portfolio inquiry",
    `Name: ${form.name.value}\nEmail: ${form.email.value}\n\nMessage:\n${form.message.value}`
  )
}
</script>

<template>
  <section>
    <div class="max-w-3xl">
      <p class="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
        Contact
      </p>

      <h1 class="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">
        Let’s build something clean and memorable.
      </h1>

      <p class="mt-4 text-zinc-600 leading-relaxed">
        Send your project details. I’ll reply as soon as possible.
      </p>
    </div>

    <div class="mt-10 rounded-3xl border border-zinc-200 bg-white p-8">

      <div class="flex items-center gap-2">
        <Sparkles class="h-5 w-5 text-[#C6A75E]" />
        <h2 class="text-xl font-semibold tracking-tight text-zinc-900">
          Send a message
        </h2>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="submit">

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label class="block">
            <span class="text-sm font-medium text-zinc-700">Name</span>
            <input
              name="name"
              required
              class="mt-2 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm transition focus:border-[#C6A75E] focus:ring-4 focus:ring-[#C6A75E]/10"
              placeholder="Your name"
            />
          </label>

          <label class="block">
            <span class="text-sm font-medium text-zinc-700">Email</span>
            <input
              name="email"
              type="email"
              required
              class="mt-2 w-full rounded-2xl border border-zinc-200 px-4 py-3 text-sm transition focus:border-[#C6A75E] focus:ring-4 focus:ring-[#C6A75E]/10"
              placeholder="your@email.com"
            />
          </label>
        </div>

        <label class="block">
          <span class="text-sm font-medium text-zinc-700">Message</span>
          <textarea
            name="message"
            required
            class="mt-2 w-full rounded-2xl border border-zinc-200 px-6 py-5 text-sm transition focus:border-[#C6A75E] focus:ring-4 focus:ring-[#C6A75E]/10 resize-none"
            rows="8"
            placeholder="Tell me about your project (brand, timeline, references)…"
          ></textarea>
        </label>

        <div class="flex flex-wrap gap-4 pt-2">
          <button
            type="submit"
            class="inline-flex items-center gap-2 rounded-full bg-[#1C1C1C] px-6 py-3 text-sm font-medium text-white hover:bg-black transition"
          >
            <Send class="h-4 w-4" />
            Send Email
          </button>

          <a
            href="/cv.pdf"
            class="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium hover:border-[#C6A75E] transition"
          >
            <FileDown class="h-4 w-4" />
            Download CV
          </a>
        </div>

      </form>
    </div>

    <div class="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="rounded-2xl border border-zinc-200 p-6 flex items-center gap-4">
        <Mail class="h-5 w-5 text-[#C6A75E] shrink-0" />
        <div class="min-w-0">
          <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">Email</p>
          <a
            :href="`mailto:${EMAIL}`"
            class="mt-1 block font-medium text-zinc-900 hover:text-[#C6A75E] transition truncate"
            :title="EMAIL"
          >
            {{ EMAIL }}
          </a>
        </div>
      </div>


      <div class="rounded-2xl border border-zinc-200 p-6 flex items-center gap-4">
        <Phone class="h-5 w-5 text-[#C6A75E]" />
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">Phone</p>
          <a :href="`tel:${PHONE_TEL}`" class="font-medium text-zinc-900">
            {{ PHONE_DISPLAY }}
          </a>
        </div>
      </div>

      <div class="rounded-2xl border border-zinc-200 p-6 flex items-center gap-4">
        <Linkedin class="h-5 w-5 text-[#C6A75E]" />
        <div>
          <p class="text-xs uppercase tracking-[0.2em] text-zinc-500">LinkedIn</p>
          <a :href="LINKEDIN" target="_blank" class="font-medium text-zinc-900">
            View profile →
          </a>
        </div>
      </div>
    </div>

  </section>
</template>
