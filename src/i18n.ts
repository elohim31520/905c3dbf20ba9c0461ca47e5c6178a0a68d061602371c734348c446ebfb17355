import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zhTW from './locales/zh-TW.json'

const getBrowserLanguage = (): string => {
	const userLang = navigator.language || (navigator as any).userLanguage
	if (userLang.toLowerCase().startsWith('zh')) {
		return 'zh-TW'
	}
	return 'en'
}

const i18n = createI18n({
	legacy: false, // Use Composition API
	locale: getBrowserLanguage(), // Set locale based on browser language
	fallbackLocale: 'en', // Fallback to English if translation is missing
	messages: {
		en,
		'zh-TW': zhTW,
	},
})

export default i18n
