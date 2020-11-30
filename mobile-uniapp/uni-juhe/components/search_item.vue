<template>
	<view class="search_item_box sd" @click="clickFn">
		<image :src="isError || !baseData.cover ? randerErrImg() : baseData.cover" mode="aspectFill" @error="randerErrImgFn" ref="img"></image>
		<view class="msg-box">
			<view class="title hidden2">
				{{baseData.name || ""}}
			</view>
			<view class="hidden1">
				{{baseData.author || ""}}
			</view>
			<view class="hidden3">
				{{baseData.introduce || baseData.latest || ""}}
				
			</view>
			<view class="hidden1">
				{{baseData.tag || ""}}
			</view>
		</view>
	</view>
</template>

<script>
	import randerErrImg from "@/utils/randerErrImg.js"
	export default {
		props:["baseData","type"],
		data() {
			return {
				isError:false
			};
		},
		methods:{
			randerErrImg,
			randerErrImgFn(e){
				this.isError = true
			},
			clickFn(){
				this.$emit("clickFn",this.baseData.url)
			}
		}
	}
</script>

<style lang="scss">
.search_item_box{
	margin-bottom: 30rpx;
	width: 100%;
	height: 368rpx;
	display: flex;
	text-align: center;
	image{
		width: 40%;
		height: 100%;
	}
	
	.msg-box{
		width: 60%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 20rpx;
		
		.title{
			font-size: 38rpx;
			color: #5ef5dd;
		}
	}
}
</style>
