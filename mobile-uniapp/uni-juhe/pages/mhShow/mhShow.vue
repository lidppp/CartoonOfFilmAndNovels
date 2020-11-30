<template>
	<view class="container">
		<view v-if="!loadingShow">
			<view class="change">
				<view @click="pre">上一话</view>
				<view @click="jumpList">返回目录</view>
				<view @click="next">下一话</view>
			</view>
			<view v-if="imgErrShow" class="reload" @click="reload">
				点击重新加载
			</view>
			<view>
				<image v-for="item in imgList" :src="item.img" @error="imgerr" mode="widthFix"></image>
			</view>
			<view class="change last">
				<view @click="pre">上一话</view>
				<view @click="next">下一话</view>
			</view>
		</view>
		
		<d-loading v-if="loadingShow" ref="loading" @reload="reload"></d-loading>
	</view>
</template>

<script>
	import {detailsMh,contentMh} from "@/api/api.js"
	import storage from "@/utils/storage.js"
	export default {
		data() {
			return {
				url1:"",
				listIndex:"",
				imgList:[],
				catalogList:[], // 目录列表
				baseData:{},
				loadingShow:false,
				canWatch:false,
				imgErrShow:false
			}
		},
		watch:{
			listIndex(){
				if(this.canWatch){
					console.log("进来了吗")
					this.showLoading();
					this.loadImgList();
					this.setStorage();
				}
				
			}
		},
		onLoad(query) {
			this.url1 = query.url1;
			this.listIndex = parseInt(query.index);
			this.showLoading();
			this.init();
		},
		onHide() {
			this.setStorage()
		},
		onUnload() {
			this.setStorage()
		},
		methods: {
			async init(){
				await detailsMh(this.url1).then(([url1Err,url1Res])=>{
					console.log(url1Err,url1Res)
					if(url1Res.data.code !== 0 || url1Err){
						// 网络请求错误
						this.errLoading()
						return
					}
					this.baseData = url1Res.data.data
					this.catalogList = url1Res.data.list
					uni.setNavigationBarTitle({title:this.baseData.name})
					this.canWatch = true;
					this.setStorage()
				});
				this.loadImgList()
			},
			loadImgList(){
				contentMh(this.catalogList[this.listIndex].url).then(([err,res])=>{
					if(err || res.data.code !== 0){
						if(this.loadingShow){
							this.errLoading()
						}
						return 
					}
					this.imgList = res.data.list
					if(this.loadingShow){
						this.closeLoading()
					}
				});
			},
			reload(){
				this.closeLoading();
				this.$nextTick(()=>{
					this.showLoading();
					this.init();
				})
			},
			pre(){
				if(this.listIndex - 1 >= 0){
					this.listIndex = this.listIndex-1
				}else{
					uni.showModal({
					    title: '提示',
					    content: '已经到第一章了',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			next(){
				if(this.listIndex + 1 < this.catalogList.length){
					this.listIndex = this.listIndex+1
				}else{
					uni.showModal({
					    title: '提示',
					    content: '已经到最后一章了',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}
			},
			imgerr(){
				this.imgErrShow=true;
			},
			jumpList(){
				uni.navigateTo({
					url:"/pages/detail/detail?type=mh&url="+this.url1
				})
			},
			showLoading(){
				this.loadingShow = true;
			},
			closeLoading(){
				this.loadingShow = false;
			},
			errLoading(){
				this.$nextTick(function(){
					console.log(this.$refs.loading)
					this.$refs.loading.errFn();
				})
				
			},
			setStorage(){
				storage.SetStorage("mhHistory",{
					coverImg:this.baseData.cover,
					lastNum:this.catalogList[this.listIndex].num,
					name:this.baseData.name,
					url1:this.url1,
					index:this.listIndex
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.change{
	display: flex;
	height: 3em;
	line-height: 3em;
	justify-content: space-between;
	
	view{
		flex: 1 1 auto;
		text-align: center;
		color: #5fe5dd;
	}
	
	&.last{
		margin-bottom: 40rpx;
	}
}
image{
	width: 100%;
	vertical-align: middle;
}

.reload{
	text-align: center;
	height: 3em;
	line-height: 3em;
}
</style>
