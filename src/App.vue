<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
import SideMenu from './components/SideMenu.vue'

const showMenu = ref(false)
</script>

<template>
	<div class="min-h-screen flex flex-col max-w-[480px] mx-auto bg-gray-100">
		<AppHeader v-model:show-menu="showMenu" />

		<SideMenu v-model="showMenu" />

		<main class="flex-grow">
			<RouterView />
		</main>
	</div>
</template>

<style scoped>
.router-link-exact-active {
	@apply bg-gray-200 text-blue-600 font-semibold;
}
</style>