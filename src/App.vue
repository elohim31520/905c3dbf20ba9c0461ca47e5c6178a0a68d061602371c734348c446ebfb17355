<template>
	<div
		class="min-h-screen flex flex-col max-w-[480px] mx-auto bg-gray-100"
		:class="{ 'pb-100': route.name !== 'info' }"
	>
		<AppHeader class="mb-10" v-if="showHeader" />

		<SideMenu />

		<main class="flex-grow">
			<RouterView v-slot="{ Component, route }">
				<keep-alive :include="keepAliveRoutes">
					<component :is="Component" :key="route.name" />
				</keep-alive>
			</RouterView>
		</main>

		<Footer />
	</div>
</template>

<script setup lang="ts">
	import { computed, onMounted, onUnmounted, nextTick, ref, watch } from 'vue'
	import { RouterView, useRoute, useRouter } from 'vue-router'
	import AppHeader from '@/components/AppHeader.vue'
	import SideMenu from '@/components/SideMenu.vue'
	import Footer from '@/components/Footer/index.vue'
	import emitter from '@/modules/emitter'
	import { useHead } from '@vueuse/head'
	import { useI18n } from 'vue-i18n'

	const route = useRoute()
	const router = useRouter()
	const showHeader = computed(() => route.path !== '/my')

	const keepAliveRoutes = ref<string[]>([])

	router.getRoutes().forEach((routeItem) => {
		if (routeItem.meta.keepAlive && typeof routeItem.name === 'string') {
			keepAliveRoutes.value.push(routeItem.name)
		}
	})

	const refreshView = async (routeName: string) => {
		const index = keepAliveRoutes.value.indexOf(routeName)
		if (index > -1) {
			keepAliveRoutes.value.splice(index, 1)
			await nextTick()
			keepAliveRoutes.value.push(routeName)
		}
	}

	onMounted(() => {
		emitter.on('refresh', refreshView)
	})

	onUnmounted(() => {
		emitter.off('refresh', refreshView)
	})

	// Add i18n logic
	const { locale } = useI18n()
	watch(
		locale,
		(newLocale) => {
			useHead({
				htmlAttrs: {
					lang: newLocale === 'zh-TW' ? 'zh-TW' : 'en',
				},
			})
		},
		{ immediate: true }
	)
</script>

<style>
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.2s ease;
	}

	.fade-enter-from,
	.fade-leave-to {
		opacity: 0;
	}
</style>
