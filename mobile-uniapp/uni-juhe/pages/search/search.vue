<template>
	<view class="container">
		<serachSuccess v-if="!show" :queryString="query" :type="type" :baseData="list" :msg="msg"></serachSuccess>
		<d-loading v-if="show" @reload="reload"></d-loading>
	</view>
</template>

<script>
	import api from "@/api/api.js"
	import serachSuccess from "@/components/serach_success.vue"
	export default {
		data() {
			return {
				query:"",
				msg:"",
				type:"",
				show:false,
				serchFnName:"",
				list:[]
			}
		},
		components:{
			serachSuccess
		},
		onLoad(option) {
			this.query = option.query;
			this.type = option.type;
			switch(this.type){
				case "xs":
				this.msg = "小说";
				this.serchFnName = "searchXs"
				break;
				case "ys":
				this.msg = "影视"
				this.serchFnName = "searchYs"
				break;
				case "mh":
				this.msg = "漫画"
				this.serchFnName = "searchMh"
				break;
			}
			
			this.loadData()
		},
		onPullDownRefresh() {
			this.reload();
		},
		methods: {
			reload(){
				this.closeLoading();
				this.$nextTick(()=>{
					this.loadData();
					uni.stopPullDownRefresh();
				})
				
			},
			loadData(){
				this.showLoading();
				api[this.serchFnName](this.query).then(([error,data])=>{
					let res = data.data
					if(res.code===0){
						this.list = res.list;
					}
					else{
						this.list = [];
					}
					this.closeLoading();
				})
			},
			showLoading(){
				this.show = true;
			},
			closeLoading(){
				this.show = false;
			}
		}
	}
</script>

<style>

</style>
