import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Lazyload } from 'vant'
import GoogleSignInPlugin from 'vue3-google-signin'

import App from './App.vue'
import router from './router'

import 'vant/es/toast/style'
import 'vant/es/dialog/style'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Lazyload)
app.use(GoogleSignInPlugin, {
	clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})

app.mount('#app')
