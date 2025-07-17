<template>
	<header class="w-100% flex-y-center bg-white h-60 shadow-primary">
		<div class="font-bold text-24 ml-10 color-primary">TrackTrade</div>
		<div @click.prevent="$emit('update:showMenu', true)" class="p-2 ml-auto mr-10">
			<van-icon name="wap-nav" size="24" />
		</div>
	</header>
</template>

<script lang="ts" setup>
import VanIcon from 'vant/lib/icon'
import 'vant/lib/icon/style'

const props = defineProps<{
	showMenu: boolean
}>()

const emit = defineEmits<{
	(e: 'update:showMenu', value: boolean): void
}>()
</script>
