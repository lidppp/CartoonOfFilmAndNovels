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
    <div class="option">
        <label> <span> 字号: </span><input v-model.number="fontSize" type="number"></label>
        <label><span>背景颜色: </span> <input v-model="bacColor" type="color"></label>
        <label> <span>文字颜色:</span> <input v-model="fontColor" type="color"> <span
                style="margin-left: 30px; cursor:pointer;color: #5fe5dd;" @click="resetAll">重置</span></label>
    </div>
    <div class="content-box" :style="{background: bacColor}">
        <template v-for="(item,index) in textArr">
            <p :style="{color: fontColor,fontSize:fontSize+'px'}" v-html="item"></p>
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
    import {detailsXs, contentXs} from "@/api/api";
    import {mapState, mapMutations} from "vuex";
    import dSelectParts from "@/components/d-selectParts"

    export default {
        name: "xs-show",
        data() {
            return {
                baseData: {},
                list: [],
                index: 0,
                textArr: [],
                l: null,
                canWatch: false,
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
                    if (this.$route.name === "xsShow") {
                        this.index = Number(this.$route.params.index)
                    }
                }
            }
        },
        computed: {
            ...mapState("xsStyle", {
                xfontSize: (state) => state.fontSize,
                xbacColor: (state) => state.bacColor,
                xfontColor: (state) => state.fontColor
            }),
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
            },
            fontSize: {
                get() {
                    return this.xfontSize
                },
                set(val) {
                    this.changeFontSize(val)
                }
            },
            bacColor: {
                get() {
                    return this.xbacColor
                },
                set(val) {
                    this.changeBacColor(val)
                }
            },
            fontColor: {
                get() {
                    return this.xfontColor
                },
                set(val) {
                    this.changeFontColor(val)
                }
            }
        },
        created() {

            this.$route.params.list ? this.list = JSON.parse( this.$route.params.list): "";
            this.$route.params.data ? this.baseData = JSON.parse(this.$route.params.data): "";

            this.index = Number(this.$route.params.index)
            this.searchXs();

        },
        methods: {
            ...mapMutations("history", [
                "addHistory",
            ]),
            ...mapMutations("xsStyle", [
                "changeFontSize",
                "changeBacColor",
                "changeFontColor",
                "resetAll"
            ]),
            randerErrImg,
            imgErr(index) {
                this.$refs["img" + index].src = this.randerErrImg()
            },
            async searchXs() {
                let flag;
                this.showLoading()
                if (!this.list.length) {
                    await detailsXs(this.$route.params.url).then((res) => {
                        if (res.code !== 0) {
                            this.errLoading()
                            return flag = true
                        }
                        this.list = res.list;
                        this.baseData = res.data;
                    }).catch(() => {
                        this.errLoading()
                    })
                }

                await contentXs(this.list[this.index].url).then((res) => {
                    if (res.code !== 0) {
                        this.errLoading()
                        return flag = true
                    }
                    this.textArr = res.content;
                }).catch(() => {
                    this.errLoading()
                })
                if (flag) {
                    return this.errLoading()
                }
                this.canWatch = true;
                this.closeLoading()

                this.addHistory({
                    type: "xs",
                    data: {
                        data: {
                            ...this.baseData,
                            history: this.index,
                            url: this.$route.params.url,
                            num: this.list[this.index].num
                        },
                        key: this.$route.params.url
                    }
                })
            },
            async changeIndex() {
                let flag;
                this.showLoading()
                await contentXs(this.list[this.index].url).then((res) => {
                    if (res.code !== 0) {
                        this.errLoading()
                        return flag = true
                    }
                    this.textArr = res.content;
                }).catch(() => {
                    this.errLoading()
                })

                if (flag) {
                    return this.errLoading()
                }
                this.closeLoading()

                this.addHistory({
                    type: "xs",
                    data: {
                        data: {...this.baseData, history: this.index, url: this.params.url},
                        key: this.$route.params.url
                    }
                })

            },
            nextClick() {
                if (this.index + 1 >= this.list.length) {
                    return alert("看完啦")
                }
                this.jumpUrl(this.index + 1)
            },
            preClick() {
                if (this.index - 1 < 0) {

                    return alert("已经是第一章了")
                }
                this.jumpUrl(this.index - 1)
            },
            itemClick(item, index) {
                this.jumpUrl(index)
            },
            jumpUrl(index) {
                // this.$router.push({
                //     name: "proxy",
                //     params: {
                //         name: "xsShow",
                //         url: this.$route.params.url,
                //         index: index
                //     }
                // })
                this.$router.push({
                    name: "proxy",
                    params: {
                        name: "xsShow",
                        url: this.$route.params.url,
                        index: index,
                        list:JSON.stringify(this.list),
                        data:JSON.stringify(this.baseData)

                    }
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

<style scoped lang="scss">
    .content-box {
        width: 100%;
        padding: 35px;
        box-sizing: border-box;

        p {
            text-indent: 2em; /*em是相对单位，2em即现在一个字大小的两倍*/
            font-size: 18px;
            margin-bottom: 20px;


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

    .option {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        margin-bottom: 15px;

        input {
            width: 40px;
            vertical-align: middle;

            &[type=number] {
                background-color: #ffffff;
                border-radius: 10px;
                border: solid 2px #5fe5dd;
            }
        }
    }
</style>
