<template>
	<div class="min-h-screen flex flex-col max-w-[480px] mx-auto bg-gray-100 pb-100">
		<AppHeader v-model:show-menu="showMenu" class="mb-10" v-if="showHeader" />

		<SideMenu v-model="showMenu" />

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
	import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
	import { RouterView, useRoute, useRouter } from 'vue-router'
	import AppHeader from '@/components/AppHeader.vue'
	import SideMenu from '@/components/SideMenu.vue'
	import Footer from '@/components/Footer/index.vue'
	import emitter from '@/modules/emitter'

	const showMenu = ref(false)
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
</script>
