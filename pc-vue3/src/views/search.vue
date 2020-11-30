<template>
	<div>
		<template v-if="queryType==='all' || queryType === 'mh'">
			<dGroupTitle placeholder="搜索漫画" id="mh" :img="img_manhua" title="漫画" v-model:inpVal="val_manhua"
			             @clickFn="manhuaClick"></dGroupTitle>
			<div class="no_data" v-if="mhlist.length === 0">
				没有找到你想要的
			</div>
			<template v-for="(item1,index1) in Math.ceil(mhlist.length / 5)">
				<div class="group_item_box">
					<template v-for="(item2,index2) in 5">
						<dManhua v-if="index1 * 5 + index2 < mhlist.length" :data='mhlist[index1 * 5 + index2]'></dManhua>
					</template>
				</div>
			</template>
		</template>

		<template v-if="queryType==='all' || queryType === 'xs'">
			<dGroupTitle placeholder="搜索小说" id="xs" :img="img_xiaoshuo" title="小说" v-model:inpVal="val_xiaoshuo"
			             @clickFn="xiaoshuoClick"></dGroupTitle>
			<div class="no_data" v-if="xslist.length === 0">
				没有找到你想要的
			</div>
			<div class="group_item_box">
				<template v-for="item in xslist">
					<dXiaoshuo :data='item'></dXiaoshuo>
				</template>
			</div>
		</template>

		<template v-if="queryType==='all' || queryType === 'ys'">
			<dGroupTitle placeholder="搜索影视" id="ys" :img="img_yinshi" title="影视" v-model:inpVal="val_yinshi"
			             @clickFn="yinshiClick"></dGroupTitle>
			<div class="no_data" v-if="yslist.length === 0">
				没有找到你想要的
			</div>
			<template v-for="(item1,index1) in Math.ceil(yslist.length / 4)">
				<div class="group_item_box">
					<template v-for="(item2,index2) in 4">
						<dYinshi v-if="(index1 * 4 + index2) < yslist.length" :data='yslist[index1 * 4 + index2]'></dYinshi>
					</template>
				</div>
			</template>
		</template>
		<FloorJump v-if="queryType==='all'"></FloorJump>
	</div>
</template>

<script>

    import dGroupTitle from "@/components/d-group-title.vue"
    import dManhua from "@/components/d-manhua"
    import dXiaoshuo from "@/components/d-xiaoshuo"
    import dYinshi from "@/components/d-yinshi"
    import FloorJump from "@/components/floorJump"
    import {
        searchAll as all,
        searchYs as ys,
        searchMh as mh,
        searchXs as xs,
    } from "@/api/api";

    export default {
        name: "home",
        components: {
            dGroupTitle,
            dManhua,
            dXiaoshuo,
            dYinshi,
            FloorJump
        },
        data() {
            return {
                img_manhua: require("@/assets/img/logo/manhua.png"),
                img_xiaoshuo: require("@/assets/img/logo/wenxue.png"),
                img_yinshi: require("@/assets/img/logo/yinshi.png"),
                val_manhua: "",
                val_yinshi: "",
                val_xiaoshuo: "",
                mhlist: [],
                yslist: [],
                xslist: [],
                l: null,  // 保存loading变量
                queryType: "all", // query : "all" | "mh" | "xs" | "ys"
                queryString: ""
            }
        },
        created() {
            this.queryType = this.$route.params.type;
            this.queryString = this.$route.params.queryString;
            this.search();
        },
        watch: {
            "$route.params": {
                handler() {
                    this.queryType = this.$route.params.type;
                    this.queryString = this.$route.params.queryString;
                    this.val_manhua = "";
                    this.val_yinshi = ""
                    this.val_xiaoshuo = ""

                    this.search();
                },
                deep: true
            }
        },
        methods: {
            manhuaClick() {
                if (!this.val_manhua) {
                    return
                }
                this.$router.push({
                    name: "Search",
                    params: {type: "mh", queryString: this.val_manhua},
                    query: {time: +new Date()}
                })
            },
            yinshiClick() {
                if (!this.val_xiaoshuo) {
                    return
                }
                this.$router.push({
                    name: "Search",
                    params: {type: "mh", queryString: this.val_xiaoshuo},
                    query: {time: +new Date()}
                })
            },
            xiaoshuoClick() {
                if (!this.val_yinshi) {
                    return
                }
                this.$router.push({
                    name: "Search",
                    params: {type: "mh", queryString: this.val_yinshi},
                    query: {time: +new Date()}
                })
            },
            search() {
                let SearchFn;
                switch (this.queryType) {
                    case "all":
                        SearchFn = all
                        break;
                    case "ys":
                        this.val_yinshi = this.$route.params.queryString;
                        SearchFn = ys
                        break;
                    case "xs":
                        this.val_xiaoshuo = this.$route.params.queryString;
                        SearchFn = xs
                        break;
                    case "mh":
                        this.val_manhua = this.$route.params.queryString;
                        SearchFn = mh
                        break;
                    default:
                        return;
                }

                this.showLoading()
                SearchFn(this.queryString).then((res) => {

                    this.mhlist = res.list || res.mhlist || []
                    this.yslist = res.list || res.yslist || []
                    this.xslist = res.list || res.xslist || []

                    this.closeLoading()
                }).catch(() => {
                    this.errLoading()
                })
            },

            showLoading() {
                this.l = this.$loading()
            },
            closeLoading() {
                this.l.close()
            },
            errLoading() {
                this.l.err();
            }
        }
    }
</script>

<style scoped>
	.group_item_box {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		width: 100%;
	}

	.no_data {
		width: 100%;
		height: 150px;
		line-height: 150px;
		font-size: 40px;
		text-align: center;
	}

</style>