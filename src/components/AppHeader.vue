<template>
	<header class="w-100% flex-y-center bg-white shadow-md h-60 shadow-[0_0_20px_0_rgba(0,0,0,0.2)]">
			<div class="font-bold text-24 ml-10">TrackTrade</div>
			<div @click.prevent="$emit('update:showMenu', true)" class="p-2 ml-auto mr-10">
				<van-icon name="wap-nav" size="24" />
			</div>
	</header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VanIcon from 'vant/lib/icon'
import 'vant/lib/icon/style'

export default defineComponent({
	name: 'AppHeader',
	components: {
		VanIcon,
	},
	props: {
		showMenu: {
			type: Boolean,
			required: true,
		},
	},
	emits: ['update:showMenu'],
})
</script>