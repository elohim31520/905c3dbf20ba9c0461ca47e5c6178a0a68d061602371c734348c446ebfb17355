import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'
import { Lazyload } from 'vant'
import GoogleSignInPlugin from 'vue3-google-signin'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

import 'vant/es/toast/style'
import 'vant/es/dialog/style'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(head)
app.use(i18n)
app.use(Lazyload)
app.use(GoogleSignInPlugin, {
	clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})

app.mount('#app')
