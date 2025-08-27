<template>
	<div class="flex-y-center justify-center color-primary" @click="router.push(to)" v-bind="$attrs">
		點我看更多
		<SvgIcon name="icon_arrow_right" size="1rem" />
	</div>
</template>

<script setup lang="ts">
	import { useRouter } from 'vue-router'

	const router = useRouter()

	defineProps<{
		to: string
	}>()
</script>
