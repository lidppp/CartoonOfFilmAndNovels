<template>
	<view class="search-input-box">
		<input class="search-input sd" confirm-type="search" :confirm-hold="false" @confirm="search" v-model="inputVal" :placeholder="placeholder" />
	</view>
</template>

<script>
	export default{
		name:"",
		components:{
			
		},
		props:[
			"placeholder",
		],
		data(){
			return{
				inputVal:""
			}
		},
		computed:{},
		created() {
			
		},
		mounted() {
			
		},
		methods:{
			getVal(){
				return this.inputVal
			},
			search(){
				uni.hideKeyboard()
				this.$emit("search",this.inputVal);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search-input-box{
		margin-top: 20px;
		justify-content: space-between;
		
		.search-input{
			/* #ifdef MP-WEIXIN */
			height: 50rpx;
			/* #endif */
			/* #ifndef MP-WEIXIN */
			height: 80rpx;
			/* #endif */
			border: 1rpx solid #5fe5dd;
			padding: 20rpx 40rpx;
			border-radius: 56rpx;
			text-align: center;
		}
	}

</style>
