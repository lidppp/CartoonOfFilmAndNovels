<template>
	<view class="item-show-group">
		<template v-for="(item,index) in arr">
			<view class="show_item_box sd" :key="index" @click="clickFn(item)" @longpress="remove(item)">
				<image :src="item.coverImg" mode="aspectFill"></image>
				<view class="show-bottom">
					<view class="item-text">{{item.name}}</view>
					<view class="item-text">
						观看至:
						<view>{{item.lastNum}}</view>
					</view>
				</view>
			</view>
			<!-- <itemShow style="width: 48%;" class="item" :key="index"></itemShow> -->
		</template>
		<view class="nothing" v-if="arr.length === 0">
			<view>暂无记录</view>
			<view></view>
		</view>
	</view>
</template>

<script>
	import randerErrImg from "@/utils/randerErrImg.js"
	import storage from "@/utils/storage.js"
	export default{
		name:"itemShowGroup",
		components:{
		},
		props:["type"],
		data(){
			return{
				arr:[],
				jumpPageUrl:"",
			}
		},
		computed:{},
		created() {
			switch(this.type){
				case "xs":
				this.jumpPageUrl = "/pages/read/read"
				break;
				case "mh":
				this.jumpPageUrl = "/pages/mhShow/mhShow"
				break;
				case "ys":
				this.jumpPageUrl = "/pages/ysShow/ysShow"
				break;
				
			}
			this.getStorage()
		},
		methods:{
			clickFn(data){
				uni.navigateTo({
					url:this.jumpPageUrl+`?index=${data.index}&url1=${data.url1}`
				})
			},
			randerErrImg,
			getStorage(){
				this.arr = storage.GetStorage(this.type+"History")
			},
			remove(data){
				uni.showModal({
					title:"删除",
					content:"是否删除本条记录",
					confirmText:"删除",
					confirmColor:"#ff3131",
					success:(res)=>{
						if(res.confirm){
							// 用户点击确定
							let flag = storage.RemoveStorage(this.type+"History",data)
							if(flag){
								uni.startPullDownRefresh()
								uni.showToast({
									title:"删除成功"
								})
							}else{
								uni.showToast({
									title:"删除失败",
									icon:"none"
								})
							}
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.item-show-group{
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	margin-top: 30rpx;
	width: 100%;
}

.nothing{
	line-height: 108rpx;
	text-align: center;
	width: 100%;
	color: #8a8a8a;
}
	
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
</style>
