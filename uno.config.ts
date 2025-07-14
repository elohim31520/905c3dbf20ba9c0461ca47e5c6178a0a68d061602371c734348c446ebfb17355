import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
	presets: [presetUno(), presetAttributify(), presetIcons()],
	// 自定義規則
	rules: [
		// 您可以在這裡添加自定義規則
	],
	// 自定義快捷方式
	shortcuts: {
		// 您可以在這裡添加快捷方式
		'flex-center': 'flex items-center justify-center',
	},
	// 主題配置
	theme: {
		colors: {
			// 自定義顏色
		},
	},
})
