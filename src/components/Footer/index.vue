<template>
	<div class="bg-#fff w-full-limited fixed left-1/2 -translate-x-1/2 bottom-0 z-50 grid cols-5 px-5">
		<div
			v-for="(tab, index) in tabItems"
			:key="index"
			class="flex-center flex-col py-12.5"
			:class="{ 'bg-gradient-to-r from-[#EC09F8] to-[#B732FF] bg-clip-text text-transparent': activeTab === tab.name }"
			@click="handleClick(tab.name)"
		>
			<SvgIcon size="1.5rem" :name="activeTab === tab.name ? tab.activeIcon : tab.defaultIcon" class="mb-2" />
			<span class="text-12">
				{{ $t(tab.label) }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue'
	import { useRoute, useRouter } from 'vue-router'

	import SvgIcon from '@/components/SvgIcon/index.vue'

	const route = useRoute()
	const router = useRouter()

	const activeTab = computed(() => {
		return route.name || 'home'
	})

	const tabItems = [
		{
			name: 'home',
			label: 'footer.home',
			defaultIcon: 'icon_voice',
			activeIcon: 'icon_voice_a',
		},
		{
			name: 'portfolio',
			label: 'footer.portfolio',
			defaultIcon: 'icon_gift',
			activeIcon: 'icon_gift_a',
		},
		{
			name: 'AddTransaction',
			label: 'footer.record',
			defaultIcon: 'icon_follow2',
			activeIcon: 'icon_follow',
		},
		{
			name: 'info',
			label: 'footer.info',
			defaultIcon: 'icon_message',
			activeIcon: 'icon_message_a',
		},
		{
			name: 'my',
			label: 'footer.my',
			defaultIcon: 'icon_user',
			activeIcon: 'icon_user_a',
		},
	]

	const handleClick = (name: string) => {
		if (activeTab.value !== name) router.push({ name })
	}
</script>
