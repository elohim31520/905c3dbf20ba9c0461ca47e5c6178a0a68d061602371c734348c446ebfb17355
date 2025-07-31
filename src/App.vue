<template>
	<div class="min-h-screen flex flex-col max-w-[480px] mx-auto bg-gray-100 pb-100">
		<AppHeader v-model:show-menu="showMenu" class="mb-10" v-if="showHeader" />

		<SideMenu v-model="showMenu" />

		<main class="flex-grow">
			<RouterView />
		</main>

		<Footer />
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import SideMenu from '@/components/SideMenu.vue'
import Footer from '@/components/Footer/index.vue'

const showMenu = ref(false)
const route = useRoute()
const showHeader = computed(() => route.path !== '/my')
</script>