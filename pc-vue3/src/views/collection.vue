<template>
    <div>
        <dGroupTitle v-if="mhlist.length" :hiddenInput="true" id="mh" :img="img_manhua" title="漫画" v-model:inpVal="val_manhua" placeholder="搜索漫画" @clickFn="manhuaClick"></dGroupTitle>

        <template v-for="(item1,index1) in Math.ceil(mhlist.length / 5)">
            <div class="group_item_box">
                <template v-for="(item2,index2) in 5">
                    <dManhua  v-if="index1 * 5 + index2 < mhlist.length"  :data='mhlist[index1 * 5 + index2]'></dManhua>
                </template>
            </div>
        </template>

        <dGroupTitle v-if="xslist.length" :hiddenInput="true" id="xs" :img="img_xiaoshuo" title="小说" v-model:inpVal="val_xiaoshuo" placeholder="搜索小说" @clickFn="xiaoshuoClick"></dGroupTitle>
        <div class="group_item_box">
            <template v-for="item in xslist">
                <dXiaoshuo  :data='item'></dXiaoshuo>
            </template>
        </div>

        <dGroupTitle  v-if="yslist.length" :hiddenInput="true" id="ys" :img="img_yinshi" title="影视" v-model:inpVal="val_yinshi"  placeholder="搜索影视" @clickFn="yinshiClick"></dGroupTitle>
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
    <div v-if="!mhlist.length && !xslist.length && !yslist.length" style="font-size: 24px;font-weight: bold; color: #5fe5dd;margin-top: 50px;text-align:center;">您还没有收藏, 快去收藏吧</div>
</template>

<script>
    import dGroupTitle from "@/components/d-group-title.vue"
    import dManhua from "@/components/d-manhua"
    import dXiaoshuo from "@/components/d-xiaoshuo"
    import dYinshi from "@/components/d-yinshi"
    import FloorJump from "@/components/floorJump"
    import {mapState} from "vuex"
    export default {
        name: "collection",
        components: {
            dGroupTitle,
            dManhua,
            dXiaoshuo,
            dYinshi,
            FloorJump
        },
        computed:{
            ...mapState("collection", {
                collectionData:(state)=>state.data
            })
        },
        watch:{
            collectionData(){
                this.formatHistoryData()
            }
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
            this.formatHistoryData();
        },
        methods: {
            formatHistoryData(){
                for(let i in this.collectionData){
                    let pushArr;
                    switch (this.collectionData[i].type) {
                        case "mh":
                            pushArr = "mhlist"
                            break;
                        case "ys":
                            pushArr = "yslist"
                            break;
                        case "xs":
                            pushArr = "xslist"
                            break;
                    }
                    this[pushArr].push({
                        ...this.collectionData[i].data.data,
                        url:this.collectionData[i].data.url
                    })
                }
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
