<template>
	<view class="show_item_box sd" @click="clickFn">
		<image src="https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2149390620,3709233930&fm=179&app=35&f=JPEG?w=244&h=326&s=1E340D8C4AB635AF66B01DC40300A0B0" mode="aspectFill"></image>
		<view class="show-bottom">
			<view class="item-text">遮天</view>
			<view class="item-text">
				观看至:
				<view>{{"第一章 九龙拉棺"}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import randerErrImg from "@/utils/randerErrImg.js"
	export default{
		name:"itemShow",
		components:{
			
		},
		props:["data"],
		data(){
			return{
				
			}
		},
		computed:{},
		created() {
			
		},
		mounted() {
			
		},
		methods:{
			clickFn(){
				this.$emit("clickFn",this.data)
			},
			randerErrImg
		}
	}
</script>

<style lang="scss" scoped>
.show_item_box{
	margin-bottom: 30rpx;
	width: 48%;
	height: 450rpx;
	position: relative;
	flex-grow: 0;
	flex-shrink: 0;
	
	image{
		width: 100%;
		height: 100%;	
	}
	
	.show-bottom{
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		height: 50%;
		background-color: rgba($color: #000000, $alpha: 0.5);
		padding: 6%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		.item-text{
			text-align: center;
			font-size: 32rpx;
			color: #ffffff;
		}
	}
}

	/* ifdef MP-WEIXIN  */
	item_show{
		width: 48%;
	}
	
	.show_item_box{
		width: 100%;
	}
	/* endif  */
</style>
