<template>
	<div class="avatar-generator-page bg-[#f0f2f5] min-h-screen p-20">
		<div class="max-w-[600px] mx-auto bg-white rounded-lg shadow-lg p-25">
			<h1 class="text-24 font-bold text-center mb-5 color-#333">卡通頭像生成器</h1>
			<p class="text-center text-14 color-#888 mb-20">上傳您的照片，生成專屬的卡通風格虛擬形象</p>

			<!-- 步驟指示器 -->
			<div class="flex justify-between items-center mb-20 text-12 text-center">
				<div class="flex-1" :class="step >= 1 ? 'text-blue-500 font-bold' : 'text-gray-400'">
					<div class="mb-5">第一步</div>
					<div>上傳圖片</div>
				</div>
				<div class="w-50 h-2 bg-gray-200 mx-10">
					<div class="h-full bg-blue-500 transition-all" :style="{ width: step > 1 ? '100%' : '0' }"></div>
				</div>
				<div class="flex-1" :class="step >= 2 ? 'text-blue-500 font-bold' : 'text-gray-400'">
					<div class="mb-5">第二步</div>
					<div>生成頭像</div>
				</div>
				<div class="w-50 h-2 bg-gray-200 mx-10">
					<div class="h-full bg-blue-500 transition-all" :style="{ width: step > 2 ? '100%' : '0' }"></div>
				</div>
				<div class="flex-1" :class="step === 3 ? 'text-green-500 font-bold' : 'text-gray-400'">
					<div class="mb-5">完成</div>
					<div>下載頭像</div>
				</div>
			</div>

			<!-- 上傳區域 -->
			<div
				v-if="!uploadedImage"
				class="upload-area border-2 border-dashed border-gray-300 rounded-lg text-center p-30 cursor-pointer hover:border-blue-500 transition-all"
				@click="triggerFileInput"
				@dragover.prevent
				@drop.prevent="handleFileDrop"
			>
				<input ref="fileInput" type="file" class="hidden" accept="image/*" @change="handleFileSelect" />
				<SvgIcon name="upload" size="3rem" class="mx-auto color-gray-400 mb-10" />
				<p class="text-16 color-#555">點擊此處或拖曳圖片至此</p>
				<p class="text-12 color-#999 mt-5">支援 JPG, PNG, WEBP 格式</p>
			</div>

			<!-- 圖片預覽和結果 -->
			<div v-else class="image-preview-area text-center">
				<div class="grid grid-cols-2 gap-15 items-center">
					<!-- 原始圖片 -->
					<div class="relative">
						<img :src="uploadedImage" alt="Uploaded Preview" class="w-full rounded-lg shadow-md" />
						<div class="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-12 px-8 py-3 rounded-br-lg">
							原始圖片
						</div>
					</div>

					<!-- 生成的頭像 -->
					<div class="relative">
						<div
							v-if="isLoading"
							class="w-full aspect-square bg-gray-100 rounded-lg flex flex-col justify-center items-center"
						>
							<van-loading type="spinner" color="#1989fa" size="48px" />
							<p class="mt-15 text-14 color-#555">{{ loadingText }}</p>
							<div class="w-80% bg-gray-200 rounded-full h-8 mt-10">
								<div class="bg-blue-500 h-8 rounded-full transition-all" :style="{ width: uploadProgress + '%' }"></div>
							</div>
						</div>
						<div v-else-if="generatedAvatar" class="relative">
							<img :src="generatedAvatar" alt="Generated Avatar" class="w-full rounded-lg shadow-md" />
							<div class="absolute top-0 left-0 bg-green-500 bg-opacity-80 text-white text-12 px-8 py-3 rounded-br-lg">
								生成成功
							</div>
						</div>
						<div v-else class="w-full aspect-square bg-gray-100 rounded-lg flex flex-col justify-center items-center">
							<SvgIcon name="photo" size="3rem" class="mx-auto color-gray-400 mb-10" />
							<p class="text-14 color-#999">待生成頭像</p>
						</div>
					</div>
				</div>
			</div>

			<!-- 操作按鈕 -->
			<div class="actions mt-25 text-center">
				<van-button
					v-if="!uploadedImage"
					type="primary"
					round
					block
					size="large"
					@click="triggerFileInput"
					icon="photograph"
				>
					選擇圖片
				</van-button>

				<div v-if="uploadedImage && !generatedAvatar && !isLoading" class="flex gap-15">
					<van-button type="default" round block size="large" @click="reset">重新選擇</van-button>
					<van-button type="success" round block size="large" @click="generateAvatar" icon="fire">開始生成</van-button>
				</div>

				<div v-if="generatedAvatar" class="flex gap-15">
					<van-button type="default" round block size="large" @click="reset">再試一次</van-button>
					<van-button type="primary" round block size="large" @click="downloadAvatar" icon="down">下載頭像</van-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref, computed } from 'vue'
	import { uploadImageAndGenerateAvatar } from '@/api/avatar'
	import { showLoadingToast, closeToast } from 'vant'

	const fileInput = ref(null)
	const uploadedImage = ref(null)
	const uploadedFile = ref(null)
	const generatedAvatar = ref(null)
	const isLoading = ref(false)
	const loadingText = ref('圖片上傳中...')
	const uploadProgress = ref(0)

	const step = computed(() => {
		if (generatedAvatar.value) return 3
		if (isLoading.value || uploadedImage.value) return 2
		return 1
	})

	const triggerFileInput = () => {
		fileInput.value?.click()
	}

	const handleFileSelect = (event) => {
		const file = event.target.files[0]
		if (file) {
			processFile(file)
		}
	}

	const handleFileDrop = (event) => {
		const file = event.dataTransfer.files[0]
		if (file) {
			processFile(file)
		}
	}

	const processFile = (file) => {
		if (!file.type.startsWith('image/')) {
			showToast('請上傳圖片檔案')
			return
		}
		uploadedFile.value = file
		const reader = new FileReader()
		reader.onload = (e) => {
			uploadedImage.value = e.target.result
		}
		reader.readAsDataURL(file)
	}

	const generateAvatar = async () => {
		if (!uploadedFile.value) return
		isLoading.value = true
		uploadProgress.value = 0
		loadingText.value = '圖片上傳中...'
		generatedAvatar.value = null

		const loadingToast = showLoadingToast({
			message: '處理中...',
			forbidClick: true,
			duration: 0,
		})

		try {
			const resultUrl = await uploadImageAndGenerateAvatar(uploadedFile.value, (progress) => {
				uploadProgress.value = progress
				if (progress >= 100) {
					loadingText.value = 'AI 正在繪製中...'
				}
			})
			generatedAvatar.value = resultUrl
			showToast({
				type: 'success',
				message: '頭像生成成功！',
			})
		} catch (error) {
			console.error('Avatar generation failed:', error)
			showToast({
				type: 'fail',
				message: error.message || '生成失敗，請稍後再試',
			})
			reset()
		} finally {
			isLoading.value = false
			closeToast()
		}
	}

	const downloadAvatar = () => {
		if (!generatedAvatar.value) return
		const a = document.createElement('a')
		a.href = generatedAvatar.value
		// 由於瀏覽器安全策略，CORS 圖片可能無法直接下載
		// a.download = 'my-cartoon-avatar.png'
		a.target = '_blank'
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		showToast('開始下載...')
	}

	const reset = () => {
		uploadedImage.value = null
		uploadedFile.value = null
		generatedAvatar.value = null
		isLoading.value = false
		uploadProgress.value = 0
		if (fileInput.value) {
			fileInput.value.value = ''
		}
	}
</script>

<style scoped>
	.avatar-generator-page {
		font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	}
	.upload-area {
		transition:
			background-color 0.3s,
			border-color 0.3s;
	}
	.upload-area:hover {
		background-color: #f8f9fa;
		border-color: #007bff;
	}
</style>
