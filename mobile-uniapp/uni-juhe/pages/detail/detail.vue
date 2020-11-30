<template>
	<view>
		<Details v-if="!loadingShow" :type="type" :baseData="listData" @itemClick="itemClick"></Details>
		
		<d-loading v-if="loadingShow" ref="loading" @reload="reload"></d-loading>
	</view>
</template>

<script>
	import Details from "@/components/details.vue"
	import api from "@/api/api.js"
	export default {
		data() {
			return {
				url: "",
				listFnName: "",
				type: "",
				listData: {},
				loadingShow:false,
				itemJumpUrl:""
			};
		},
		components: {
			Details
		},
		onLoad(option) {
			this.url = option.url;
			this.type = option.type;
			switch (option.type) {
				case "xs":
					this.listFnName = "detailsXs";
					this.itemJumpUrl = "/pages/read/read"
					break;
				case "ys":
					this.listFnName = "detailsYs"
					this.itemJumpUrl = "/pages/ysShow/ysShow"
					break;
				case "mh":
					this.listFnName = "detailsMh"
					this.itemJumpUrl = "/pages/mhShow/mhShow"
					break;
			}
			
			this.initList()
		},
		methods:{
			initList(){
				this.showLoading();
				api[this.listFnName](this.url).then(([err,data])=>{
					let res = data.data;
					if(res.code === 0){
						this.listData = res;
						console.log(res)
						uni.setNavigationBarTitle({
							title:res.data.name
						})
						this.closeLoading();
					}else{
						this.errLoading()
					}
				}).catch(()=>{
					this.errLoading()
				})
			},
			reload(){
				this.closeLoading();
				this.$nextTick(()=>{
					this.initList()
				})
			},
			showLoading(){
				this.loadingShow = true;
			},
			closeLoading(){
				this.loadingShow = false;
			},
			errLoading(){
				this.$refs.loading.errFn();
			},
			itemClick(data,index){
				console.log(data,index)
				uni.navigateTo({
					url:this.itemJumpUrl+`?index=${index}&url1=${this.url}`
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
