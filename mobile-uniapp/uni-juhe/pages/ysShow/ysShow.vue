<template>
	<view>

		<view v-if="!loadingShow">
			<!-- #ifdef APP-PLUS -->
			<video class="video" :src="successUrl.m3u8url" controls></video>

			<!-- #endif -->

			<!-- #ifndef APP-PLUS -->
			<view class="video video-js vjs-big-play-centered" ref="video"></view>
			<!-- <web-view :src="successUrl.onlineurl"></web-view> -->

			<!-- #endif -->
			<view class="hr container"></view>
			<view class="list container">
				<view v-for="(item,itemindex) in list" :key="item.url" class="list_item hidden1" :class="[index === itemindex ? 'active' : '']" @click="itemClick(item,itemindex)">
					{{item.num || ""}}
				</view>
			</view>
		</view>

		<d-loading v-if="loadingShow" @reload="reload" ref="loading"></d-loading>

	</view>

</template>

<script>
	import {
		detailsYs
	} from "@/api/api.js"
	import storage from "@/utils/storage.js"
	export default {
		data() {
			return {
				successUrl: {},
				url: "",
				index: "",
				loadingShow: false,
				baseData: {},
				list: [],
				canWatch: false,
				videojs:null
			}
		},
		onLoad(options) {
			console.log("ysShow", options)
			this.url = options.url1;
			this.index = parseInt(options.index);
			this.init();
		},
		watch: {
			index() {
				if (this.canWatch) {
					this.successUrl = this.list[this.index]
					
					// #ifdef H5
						this.videojs.dispose()
						this.$nextTick(function(){
							this.creatVideo()
						})
					// #endif
					this.setStorage()
					
				}
			}
		},
		onHide() {
			this.setStorage()
		},
		onUnload() {
			// #ifdef H5
				this.videojs.dispose()
			// #endif
			this.setStorage()
		},
		methods: {
			reload() {
				this.closeLoading();
				this.$nextTick(function() {
					this.init();
				})
			},
			init() {
				this.showLoading()
				detailsYs(this.url).then(([error, data]) => {
					const res = data.data
					if (error || res.code !== 0) {
						return this.errLoading()
					}
					this.baseData = res.data;
					this.list = res.list;
					this.canWatch = true;
					this.successUrl = this.list[this.index]
					this.closeLoading()
					uni.setNavigationBarTitle({title:this.baseData.name})
					this.setStorage()

					// #ifdef H5
					this.$nextTick(() => {
						this.creatVideo()
					})
					// #endif
				})
			},
			showLoading() {
				this.loadingShow = true
			},
			closeLoading() {
				this.loadingShow = false
			},
			errLoading() {
				this.$nextTick(() => {
					this.$refs.loading.errFn();
				})
			},
			// #ifdef H5
			creatVideo(){
				let video = document.createElement('video')
				video.id = 'video'
				video.style = 'width: 100%;height: 100%;'
				video.controls = true
				let source = document.createElement('source')
				source.src = this.successUrl.m3u8url
				video.appendChild(source)
				this.$refs.video.$el.appendChild(video)
				this.videojs = videojs('video')
			},
			// #endif
			itemClick(item, index) {
				this.index = index;
				console.log(item,this.index,index)
			},
			setStorage(){
				storage.SetStorage("ysHistory",{
					coverImg:this.baseData.cover,
					lastNum:this.successUrl.num,
					name:this.baseData.name,
					url1:this.url,
					index:this.index
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.video {
		width: 100%;
		height: 400rpx;
	}

	.hr {
		margin: 16rpx 0;
		width: 100%;
		height: 2px;
		background-color: #5fe6dd;
	}

	.list {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.list_item {
			width: 48%;
			border-radius: 10rpx;
			padding: 20rpx;
			border: 2rpx solid #5fe5dd;
			font-size: 24rpx;
			margin-bottom: 16rpx;
			text-align: center;
			
			&.active{
				background-color: #5fe5dd;
				color: #fff;
			}
		}
	}
</style>
