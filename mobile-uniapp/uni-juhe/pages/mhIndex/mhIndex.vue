<template>
	<view class="container">
		<searchInput  @search="search" :placeholder="placeholder" ></searchInput>
		<showItemGroup type="mh" ref="showItem"></showItemGroup>
	</view>
</template>

<script>
	import searchInput from "@/components/search.vue"
	import showItemGroup from "@/components/item_show_group.vue"
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				href2:"/pages/search/index/index",
				placeholder:"搜索漫画",
				show:false
			}
		},
		components:{
			searchInput,
			showItemGroup
		},
		onPullDownRefresh() {
			this.$refs.showItem.getStorage();
			uni.stopPullDownRefresh();
		},
		onShow() {
			uni.startPullDownRefresh()
		},
		methods: {
			showloading(){
				this.show = true;
				console.log(this.show)
				setTimeout(()=>(console.log(this.show),this.show=false),5000)
			},
			jump(){
				uni.navigateTo({url:"/pages/read/read"})
			},
			search(val){
				console.log(val)
				uni.navigateTo({url:`/pages/search/search?query=${val}&type=mh`})
			}
		}
	}
</script>

<style>
	
	
	
</style>
