import { createRouter, createWebHistory } from "vue-router"

import Home from "../pages/Home.vue"
import Work from "../pages/Work.vue"
import Project from "../pages/Project.vue"
import About from "../pages/About.vue"
import Contact from "../pages/Contact.vue"
import Photography from "../pages/Photography.vue"

const routes = [
  { path: "/", component: Home },
  { path: "/work", component: Work },
  { path: "/work/:slug", component: Project },
  { path: "/photos", component: Photography },
  { path: "/about", component: About },
  { path: "/contact", component: Contact },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
