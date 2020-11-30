<template>
	<view class="container">
		<view class="msg">
			<image class="cover" :src="baseData.data.cover" mode="aspectFit"></image>
			<view class="basemsg">
				<view class="name">
					{{baseData.data.name || ""}}
				</view>
				<view class="author">
					{{baseData.data.performer || baseData.data.author || ""}}
				</view>
				<view class="time">
					{{baseData.data.time || ""}}
				</view>
				<view class="tag">
					{{ baseData.data.tag || baseData.data.status || (baseData.data.genre+baseData.data.region+baseData.data.Language) || ""}}
				</view>
			</view>
		</view>
		<view class="introduce" :class="[showIntroduce ? 'showIntroduce' : '']">
			{{baseData.data.introduce || ""}}
		</view>
		<view class="detail_butotn" @click="showMoreIntroduce">{{this.showIntroduce ?'隐藏详情' :'显示详情'}}</view>
		<view class="hr"></view>
		<view class="list">
			<view v-for="(item,index) in baseData.list" :key="item.url" class="list_item hidden1" @click="itemClick(item,index)">
				{{item.num || ""}}
			</view>
		</view>
	</view>
	
</template>

<script>
	export default{
		props:["baseData"],
		data(){
			return {
				showIntroduce:false
			}
		},
		methods:{
			showMoreIntroduce(){
				this.showIntroduce = !this.showIntroduce
			},
			itemClick(data,index){
				this.$emit("itemClick",data,index)
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.msg{
		display: flex;
		.cover{
			width: 40%;
			height: 450rpx;
		}
		
		
		.basemsg{
			width: 60%;
			flex: 0 0 auto;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			view{
				text-align: center;
				font-size: 30rpx;
			}
			
			.name{
					font-size: 34rpx;
					color: #5fe5dd;
			}
		}
		
	}
	.introduce{
		height: 2rem;
		overflow: hidden;
		
		&.showIntroduce{
			height: auto;
		}
	}
	
	.detail_butotn{
		border: 0;
		text-align: center;
		color: #5fe5dd;
		height: 2rem;
		line-height: 2rem;
	}
	
	.hr{
		margin: 16rpx 0;
		width: 100%;
		height: 2px;
		background-color: #5fe6dd;
	}
	
	.list{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.list_item{
			width: 48%;
			border-radius: 10rpx;
			padding: 20rpx;
			border: 2rpx solid #5fe5dd;
			font-size: 24rpx;
			margin-bottom: 16rpx;
			text-align: center;
		}
	}
	
</style>
