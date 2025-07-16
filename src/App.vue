<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
	<div class="min-h-100vh flex flex-col max-w-480 mx-auto">
		<header class="flex-shrink-0">
			<div class="wrapper">
				<nav>
					<RouterLink to="/">首頁</RouterLink>
					<RouterLink to="/about">關於</RouterLink>
					<RouterLink to="/transaction">交易</RouterLink>
				</nav>
			</div>
		</header>

		<RouterView />
	</div>
</template>
