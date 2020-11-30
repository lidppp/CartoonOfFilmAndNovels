<template>
	<div>
		<dGroupTitle id="mh" :img="img_manhua" title="漫画" v-model:inpVal="val_manhua" placeholder="搜索漫画" @clickFn="manhuaClick"></dGroupTitle>

			<template v-for="(item1,index1) in Math.ceil(mhlist.length / 5)">
				<div class="group_item_box">
					<template v-for="(item2,index2) in 5">
						<dManhua  v-if="index1 * 5 + index2 < mhlist.length"  :data='mhlist[index1 * 5 + index2]'></dManhua>
					</template>
				</div>
			</template>

		<dGroupTitle id="xs" :img="img_xiaoshuo" title="小说" v-model:inpVal="val_xiaoshuo" placeholder="搜索小说" @clickFn="xiaoshuoClick"></dGroupTitle>
		<div class="group_item_box">
			<template v-for="item in xslist">
				<dXiaoshuo  :data='item'></dXiaoshuo>
			</template>
		</div>

		<dGroupTitle id="ys" :img="img_yinshi" title="影视" v-model:inpVal="val_yinshi"  placeholder="搜索影视" @clickFn="yinshiClick"></dGroupTitle>
		<div class="group_item_box">
			<template v-for="(item1,index1) in Math.ceil(yslist.length / 4)">
				<div class="group_item_box">
					<template v-for="(item2,index2) in 4">
						<dYinshi  v-if="index1 * 4 + index2 < yslist.length"  :data='yslist[index1 * 4 + index2]'></dYinshi>
					</template>
				</div>
			</template>

		</div>

		<FloorJump></FloorJump>
	</div>
</template>

<script>

    import dGroupTitle from "@/components/d-group-title.vue"
    import dManhua from "@/components/d-manhua"
    import dXiaoshuo from "@/components/d-xiaoshuo"
    import dYinshi from "@/components/d-yinshi"
    import FloorJump from "@/components/floorJump"
    import {searchIndex} from "@/api/api";

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
                l: null  // 保存loading变量
            }
        },
        created() {
            this.showLoading()
            searchIndex().then((res) => {
                this.mhlist = res.mhlist.list;
                this.yslist = res.yslist.list;
                this.xslist = res.xslist.list;
                this.closeLoading()
            }).catch(() => {
                this.errLoading()
            })
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
                 if (!this.val_yinshi) {
                    return
                }
                this.$router.push({
                    name: "Search",
                    params: {type: "ys", queryString: this.val_yinshi},
                    query: {time: +new Date()}
                })
            },
            xiaoshuoClick() {
                if (!this.val_xiaoshuo) {
                    return
                }
                this.$router.push({
                    name: "Search",
                    params: {type: "xs", queryString: this.val_xiaoshuo},
                    query: {time: +new Date()}
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


</style>