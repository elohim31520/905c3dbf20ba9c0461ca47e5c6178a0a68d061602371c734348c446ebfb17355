import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { Lazyload } from 'vant'
import GoogleSignInPlugin from 'vue3-google-signin'

import App from './App.vue'
import router from './router'

import 'vant/es/toast/style'
import 'vant/es/dialog/style'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(head)
app.use(Lazyload)
app.use(GoogleSignInPlugin, {
	clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})

app.mount('#app')
