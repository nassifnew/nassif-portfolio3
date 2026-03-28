import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import "./style.css"
import "@fontsource/manrope/400.css"
import "@fontsource/manrope/500.css"
import "@fontsource/manrope/600.css"
import "@fontsource/manrope/700.css"

createApp(App).use(router).mount("#app")
