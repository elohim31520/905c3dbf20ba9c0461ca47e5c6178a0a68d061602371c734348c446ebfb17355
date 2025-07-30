<template>
	<div class="bg-#fff w-full-limited fixed left-1/2 -translate-x-1/2 bottom-0 z-50 grid cols-5 px-5">
		<div
			v-for="(tab, index) in tabItems"
			:key="index"
			class="flex-center flex-col py-12.5"
			:class="{ 'bg-gradient-to-r from-[#EC09F8] to-[#B732FF] bg-clip-text text-transparent': activeTab === tab.name }"
			@click="handleClick(tab.name)"
		>
			<SvgIcon size="1.5rem" :name="activeTab === tab.name ? tab.activeIcon : tab.inactiveIcon" class="mb-2" />
			<span class="text-12">
				{{ tab.name }}
			</span>
		</div>
	</div>
</template>

<script setup>
	import { computed, ref, watch, onMounted } from 'vue'
	import { useRoute, useRouter } from 'vue-router'

	import SvgIcon from '@/components/SvgIcon/index.vue'

	const route = useRoute()
	const router = useRouter()

	const activeTab = ref('home')

	const tabItems = [
		{
			name: 'home',
			inactiveIcon: 'icon_voice',
			activeIcon: 'icon_voice_a',
		},
		{
			name: 'transaction',
			inactiveIcon: 'icon_add',
			activeIcon: 'icon_add',
		},
		{
			name: 'activity',
			inactiveIcon: 'icon_gift',
			activeIcon: 'icon_gift_a',
		},
		{
			name: 'chat',
			inactiveIcon: 'icon_message',
			activeIcon: 'icon_message_a',
		},
		{
			name: 'my',
			inactiveIcon: 'icon_user',
			activeIcon: 'icon_user_a',
		},
	]

	watch(
		() => route.path,
		(newPath) => {
			const [, currentTab] = newPath.split('/')
			if (currentTab && tabItems.some((tab) => tab.name === currentTab)) {
				activeTab.value = currentTab
			}
		},
		{ immediate: true }
	)

	const handleClick = (name) => {
		if (activeTab.value !== name) {
			activeTab.value = name
			router.push({ name })
		}
	}
</script>

<style lang="scss" scoped></style>
