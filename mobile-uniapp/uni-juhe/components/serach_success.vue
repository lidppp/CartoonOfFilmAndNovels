<template>
	<view>
		<view class="msg">
			<text style="color: #5fe5dd;margin-right: 10rpx;">{{queryString}}</text>
			搜索结果: 共 {{baseData.length}} 条
			<text style="margin-left: 10rpx;">下拉刷新</text>
		</view>
		
		<view class="group-title">
			<view class="border"></view>
			<view class="text">{{msg}}</view>
		</view>
		
		<template v-if="type=='mh' || type=='xs'">
			<searchItem @clickFn="clickFn" v-for="(item,index) in baseData" :key="index" :type="type" :baseData="item"></searchItem>
		</template>
		
		<template  v-if="type=='ys'">
			<view class="ys-box">
				<searchItemYs @clickFn="clickFn" v-for="(item,index) in baseData" :key="index" :baseData="item"></searchItemYs>
			</view>
		</template>
		
	</view>
</template>

<script>
	import searchItem from "./search_item.vue"  // 小说漫画
	import searchItemYs from "./search_item_ys.vue" // 影视
	export default{
		name:'detail',
		props:["msg","queryString","baseData","type"],
		components:{
			searchItem,
			searchItemYs
		},
		methods:{
			clickFn(url){
				console.log("是否触发")
				uni.navigateTo({
					url:"/pages/detail/detail?url="+url+"&type="+this.type,
					
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.msg{
		font-size: 32rpx;
		color: #777777;
		margin-bottom: 32rpx;
	}
	
	.group-title{
		display: flex;
		line-height: 48rpx;
		margin-bottom: 30rpx;
		.border{
			width: 12rpx;
			margin-right: 30rpx;
			background: #5fe5dd;
			border-radius: 16rpx;
			height: 48rpx;
		}
	}
	
	.ys-box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
</style>
