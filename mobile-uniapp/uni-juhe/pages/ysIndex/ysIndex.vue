<template>
	<view class="container">
		<searchInput @search="search" :placeholder="placeholder"></searchInput>
		<showItemGroup type="ys"  ref="showItem"></showItemGroup>
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
				placeholder:"搜索影视",
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
			jump(){
				uni.navigateTo({url:"/pages/read/read"})
			},
			search(val){
				console.log(val)
				uni.navigateTo({url:`/pages/search/search?query=${val}&type=ys`})
			}
		}
	}
</script>

<style>
	
	
	
</style>
