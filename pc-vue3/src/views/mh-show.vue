<template>
    <div class="next_pre">
		<span @click="preClick">
					上一话:{{nextAndPre.pre}}
		</span>
        <span class="title">
			{{baseData.name}}-{{(list[index] && list[index].num) || ""}}
		</span>
        <span @click="nextClick">
					下一话:{{nextAndPre.next}}
		</span>
    </div>
    <div class="content-box">
        <template v-for="(item,index) in imgArr">
            <img :src="item.img" @error="imgErr(index)" :ref="'img'+index" alt="">
        </template>
    </div>
    <div class="next_pre">
		<span @click="preClick">
					上一话:{{nextAndPre.pre}}
		</span>
        <span @click="nextClick">
					下一话:{{nextAndPre.next}}
		</span>
    </div>
    <dSelectParts :list="list" :selectIndex="index" @itemClick="itemClick"></dSelectParts>

</template>

<script>
    import randerErrImg from "@/utils/randerErrImg";
    import {detailsMh, contentMh} from "@/api/api";
    import {mapMutations} from "vuex"
    import dSelectParts from "@/components/d-selectParts"

    export default {
        name: "mh-show",
        data() {
            return {
                baseData: {},
                list: [],
                index: 0,
                imgArr: [],
                l: null,
                canWatch: false
            }
        },
        components: {
            dSelectParts
        },
        watch: {
            index() {
                if (this.canWatch) {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    this.changeIndex();
                }
            },
            "$route.params.index": {
                handler() {
                    if (this.$route.name === "mhShow") {
                        this.imgArr = [];
                        this.index = Number(this.$route.params.index)
                    }
                }
            }
        },
        computed: {
            nextAndPre() {

                let obj = {
                    next: "",
                    pre: ""
                }
                if (!this.canWatch) {
                    return obj
                }
                if (this.index + 1 >= this.list.length) {
                    obj.next = "没有了"
                } else {
                    obj.next = this.list[this.index + 1].num
                }

                if (this.index - 1 < 0) {
                    obj.pre = "没有了"
                } else {
                    obj.pre = this.list[this.index - 1].num
                }
                return obj
            }
        },
        created() {
            this.$route.params.list ? this.list = JSON.parse( this.$route.params.list): "";
            this.$route.params.data ? this.baseData = JSON.parse(this.$route.params.data): "";
            this.index = Number(this.$route.params.index)
            this.serchMh();
        },
        methods: {
            ...mapMutations("history", [
                "addHistory",
            ]),
            randerErrImg,
            imgErr(index) {
                this.$refs["img" + index].src = this.randerErrImg()
            },
            async serchMh() {
                let flag;
                this.showLoading()
                if(!this.list.length){
                    await detailsMh(this.$route.params.url).then((res) => {
                        if (res.code !== 0) {
                            return flag = true
                        }
                        this.list = res.list;
                        this.baseData = res.data;
                    }).catch(() => {
                        this.errLoading()
                    })
                }

                await contentMh(this.list[this.index].url).then((res) => {
                    if (res.code !== 0) {
                        return flag = true
                    }
                    this.imgArr = res.list;
                }).catch(() => {
                    this.errLoading()
                })
                if (flag) {
                    return this.errLoading()
                }
                this.canWatch = true;
                this.closeLoading()

                this.addHistory({
                    type: "mh",
                    data: {
                        data: {
                            ...this.baseData,
                            history: this.index,
                            url: this.$route.params.url,
                            num: this.list[this.index].num,
                            latest: this.list[this.index].num
                        },
                        key: this.$route.params.url
                    }
                })
            },
            async changeIndex() {
                let flag;
                this.showLoading()
                await contentMh(this.list[this.index].url).then((res) => {
                    if (res.code !== 0) {
                        return flag = true
                    }
                    this.imgArr = res.list;
                }).catch(() => {
                    this.errLoading()
                })
                if (flag) {
                    return this.errLoading()
                }
                this.closeLoading()
                this.addHistory({
                    type: "mh",
                    data: {
                        data: {
                            ...this.baseData,
                            history: this.index,
                            url: this.$route.params.url,
                            num: this.list[this.index].num,
                            latest: this.list[this.index].num
                        },
                        key: this.$route.params.url
                    }
                })
            },
            nextClick() {
                if (this.index + 1 >= this.list.length) {
                    return alert("看完啦")
                }
                this.jumpUrl( this.index + 1)
            },
            preClick() {
                if (this.index - 1 < 0) {
                    return alert("已经是第一话了")
                }
                this.jumpUrl( this.index - 1)
            },
            jumpUrl(index){
                this.$router.push({
                    name: "proxy",
                    params: {
                        name: "mhShow",
                        url: this.$route.params.url,
                        index: index,
                        list:JSON.stringify(this.list),
                        data:JSON.stringify(this.baseData)
                    }
                })
            },
            itemClick(item, index) {
                this.jumpUrl(index)
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

<style scoped lang="scss">
    .content-box {
        width: 100%;

        img {
            width: 100%;
            vertical-align: middle;
        }
    }


    .next_pre {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;

        span {
            font-size: 18px;
            color: #5fe5dd;
            cursor: pointer;

            &.title {
                cursor: auto;
                font-size: 24px;
                user-select: none;
            }
        }

    }
</style>
