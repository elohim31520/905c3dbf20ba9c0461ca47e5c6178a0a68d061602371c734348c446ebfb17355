<template>
	<div class="w-full-limited overflow-hidden">
		<div class="min-h-screen bg-[#f5f5f5] pb-85">
			<div
				ref="headerWrapper"
				class="transition-all duration-300"
				:class="{ 'fixed top-0 left-0 right-0 z-50 w-full-limited pc:left-[calc(50%-240px)]': isScrolled }"
			>
				<div
					class="bg-[url('/my/bg.webp')] bg-cover bg-center bg-no-repeat p-15 pt-40 text-white transition-all duration-300 ease-in-out"
					:class="isScrolled ? 'h-140 pt-75' : 'h-260 pt-50'"
				>
					<!-- User Info -->
					<div class="flex-y-center transition-all duration-300 ease-in-out" :class="{ '-translate-y-40': isScrolled }">
						<div class="relative">
							<img
								:src="userInfo.avatar"
								alt="avatar"
								class="rounded-full transition-all duration-300 ease-in-out"
								:class="isScrolled ? 'w-40 h-40' : 'w-70 h-70'"
							/>
						</div>

						<div class="ml-12 flex-1 flex-col">
							<div class="color-white">
								<div class="flex items-center">
									<span class="font-500">{{ userInfo.name }}</span>
									<span
										class="ml-5 bg-#FDE9FF text-#BA05C3 flex-y-center justify-center rounded-full font-500 text-12 px-5 py-1"
									>
										Lv.{{ userInfo.level }}
									</span>
								</div>
								<div class="flex-y-center color-#FAC9FF text-12 mt-1 font-500">
									<span class="flex-y-center gap-5">
										ID:{{ userInfo.username }}
										<SvgIcon name="icon_room" size="1rem" />
									</span>
								</div>
							</div>

							<!-- Followers -->
							<div v-show="!isScrolled" class="flex-y-center transition-all duration-300 ease-in-out mt-17">
								<div class="flex flex-col">
									<span class="font-500">{{ userInfo.following }}</span>
									<span class="color-#FAC9FF text-10">Following</span>
								</div>
								<div class="flex-y-center flex-col ml-15">
									<span class="font-500">{{ userInfo.fans }}</span>
									<span class="color-#FAC9FF text-10">Followers</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div class="transition-all duration-300 ease-in-out" :class="isScrolled ? '-mt-40' : '-mt-80'">
					<!-- Wallet Info -->
					<div
						class="flex-y-center justify-between transition-all duration-300 ease-in-out bg-white"
						:class="isScrolled ? 'rounded-t-20 p-10' : 'rounded-full px-12 mx-10 py-9 mb-20'"
					>
						<div class="flex-y-center font-bold">
							<SvgIcon class="color-primary" name="icon_dollar_fill" size="1.6rem" />
							<span class="ml-5 font-600 text-20 lh-20 color-primary">
								{{ userInfo.balance }}
							</span>
							<SvgIcon class="color-primary ml-5" name="icon_arrow_right" size="1rem" />
						</div>
						<div class="flex-y-center gap-2 text-white text-12 font-500">
							<div class="flex-y-center gap-3 bg-gradient-to-r from-[#FF9021] to-[#FFB60C] rounded-15 px-5 py-4" @click="goTo('/login')">
								<SvgIcon name="icon_user" size="1.2rem" color="#fff" />
								Login
							</div>
							<div class="flex-y-center gap-3 ml-5 bg-gradient-to-r from-[#f472b6] to-[#ec4899] rounded-15 px-5 py-4" @click="goTo('/register')">
								<SvgIcon name="icon_room_w" size="1.2rem" />
								Register
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="bg-white" :style="{ paddingTop: isScrolled ? headerHeight + 'px' : '0px' }">
				<!-- My Portfolio -->
				<div class="m-10" v-if="isLogin">
					<h3 class="font-500 mb-20 color-primary">My Portfolio</h3>
					<div class="w-full h-[300px]">
						<PortfolioChart />
					</div>
				</div>
			</div>
		</div>

		<Footer />
	</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import Footer from '@/components/Footer/index.vue'
import { useRouter } from 'vue-router'
import PortfolioChart from '@/components/PortfolioChart/index.vue'
import { isAuthenticated } from '@/modules/auth'

const router = useRouter()

const goTo = (path) => {
	if (!path) return
	router.push(path)
}

const isScrolled = ref(false)
const headerWrapper = ref(null)
const headerHeight = ref(0)
const isLogin = ref(isAuthenticated())

const handleScroll = () => {
	isScrolled.value = window.scrollY > 50
}

watch(isScrolled, async (newVal) => {
	if (newVal) {
		await nextTick()
		if (headerWrapper.value) {
			headerHeight.value = headerWrapper.value.offsetHeight
		}
	}
})

onMounted(() => {
	window.addEventListener('scroll', handleScroll, { passive: true })
	// check on initial load
	handleScroll()
})

onUnmounted(() => {
	window.removeEventListener('scroll', handleScroll)
})

const userInfo = ref({
	username: 'llooepw12',
	name: 'Amy',
	level: '99',
	avatar: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=256&h=256&fit=crop',
	following: 333,
	fans: '12.5k',
	balance: '3,456,456',
	playCount: 13,
	totalPlayCount: 133156,
	gender: 0,
})
</script>
