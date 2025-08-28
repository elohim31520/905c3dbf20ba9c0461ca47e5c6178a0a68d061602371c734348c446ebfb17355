import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { lodashImports } from './config/lodash-imports.js'
import './plugin/vant-style-resolver.ts'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		// vueDevTools(),
		UnoCSS(),
		AutoImport({
			resolvers: [VantResolver()],
			imports: [
				'vue',
				'vue-router',
				{
					from: 'vant',
					imports: ['showToast', 'showDialog', 'showConfirmDialog', 'showNotify', 'showImagePreview'],
				},
				{
					from: 'lodash-es',
					imports: lodashImports,
				},
			],
			dts: 'src/auto-imports.d.ts',
		}),
		Components({
			resolvers: [VantResolver()],
			dts: 'src/components.d.ts',
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		port: 5177,
	},
})
