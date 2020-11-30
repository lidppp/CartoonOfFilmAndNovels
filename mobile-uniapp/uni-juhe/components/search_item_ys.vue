<template>
	<view class="search_item_box sd" @click="clickFn">
		<view class="title hidden2">
			{{baseData.name || ""}}
		</view>
		<view class="hidden1">
			{{baseData.time || ""}}
		</view>
		<view class="hidden1">
			{{baseData.genre || ""}}
		</view>
		<image src="/static/img/play_active.png" mode="aspectFit"></image>
	</view>
</template>

<script>
	export default {
		props:["baseData"],
		data() {
			return {
				
			};
		},
		methods:{
			clickFn(){
				this.$emit("clickFn",this.baseData.url)
			}
		}
	}
</script>

<style lang="scss">
.search_item_box{
	margin-bottom: 30rpx;
	width: 48%;
	height: 364rpx;
	display: flex;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	padding: 20rpx;
	
	.title{
		font-size: 38rpx;
		color: #5ef5dd;
		
	}
	
	.tag{
		font-size: 32rpx;
		color: #000;
		margin: 16rpx;
	}
	
	image{
		width: 80rpx;
		height: 80rpx;
		margin: 0 auto;
	}
	
	// .msg-box{
	// 	width: 90%;
	// 	height: 100%;
	// 	display: flex;
	// 	flex-direction: column;
	// 	justify-content: space-around;
	// 	padding: 20rpx;
		
		
	// }
}
</style>
