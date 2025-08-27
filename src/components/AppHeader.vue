<template>
	<header class="w-100% flex-y-center bg-white h-60 shadow-primary">
		<div class="w-100 h-100% bg-[url('/logo.webp')] bg-no-repeat bg-center bg-contain scale-up ml-10"></div>
		<div @click.prevent="uiStore.showMenu" class="p-2 ml-auto mr-10">
			<van-icon name="wap-nav" size="24" />
		</div>
	</header>
</template>

<script lang="ts" setup>
	import VanIcon from 'vant/lib/icon'
	import { useUIStore } from '@/stores/ui'

	const uiStore = useUIStore()
</script>

<style scoped>
	.scale-up {
		background-size: 130%;
	}
</style>
