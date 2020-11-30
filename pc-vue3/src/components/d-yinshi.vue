<template>
    <div>
        <div class="d-yinshi bs" @click="clickFn">
            <div class="time">
                {{time}}
                <span class="tag" v-if="data.genre">{{data.genre}}</span>
            </div>

            <div class="name hidden2">
                {{data.name}}
            </div>
            <div v-if="data.history !== undefined">
                {{data.num}}
            </div>
            <div class="icon-box">
                <i class="iconfont icon-bofang"></i>
            </div>
        </div>
        <div v-if="data.history!== undefined" @click="removeHistoryFn" title="删除历史记录" class="remove"><i
                class="iconfont icon-lajitong"></i></div>
    </div>


</template>

<script>
    import {mapMutations} from "vuex"

    export default {
        name: "d-yinshi",
        props: ["data"],
        methods: {
            ...mapMutations("history", [
                "removeHistory"
            ]),
            clickFn() {
                this.$router.push({
                    name: "ysDetails",
                    params: {
                        url: this.data.url
                    }
                })
            },
            removeHistoryFn() {
                this.removeHistory(this.data.ArrIndex)
            }
        },
        computed: {
            time() {
                return this.data.time.slice(0, 10)
            }
        }
    }
</script>

<style scoped lang="scss">
    .d-yinshi {
        width: 250px;
        height: 183px;
        background-color: #ffffff;
        margin-top: 20px;
        box-sizing: border-box;
        padding: 20px 12px;
        line-height: 36px;
        position: relative;
        cursor: pointer;


        .time {
            font-size: 20px;
            color: #000000;
            line-height: 40px;

            .tag {
                float: right;
                width: 89px;
                height: 36px;
                background-color: #5fe5dd;
                border-radius: 10px;
                font-size: 14px;
                text-align: center;
                color: #fff;
                line-height: 36px;
            }
        }

        .name {
            font-size: 20px;
            font-weight: bold;
            line-height: 24px;
        }

        .icon-box {
            position: absolute;
            right: 15px;
            bottom: 12px;
            transition: all .5s;
            transform-origin: center center;

            i {
                display: inline-block;
                line-height: normal;
                font-size: 48px;
                color: #5fe5dd;
            }
        }


        &:hover {
            .icon-box {
                right: 50%;
                transform: scale(1.1) translateX(50%);
            }
        }
    }

    .remove {
        text-align: center;
        background: #ffffff;
        margin-top: 12px;
        cursor: pointer;
        color: #5fe5dd;

        i {
            font-size: 30px;

        }

        /*&:hover{*/
        /*    color: white;*/
        /*    background: #5fe5dd;*/
        /*}*/
    }
</style>
