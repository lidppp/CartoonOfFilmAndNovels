<template>
    <div>
        <div class="d-manhua bs" @click="clickFn">
            <div v-if="data.history!== undefined" class="history hidden1">
                {{data.num}}
            </div>

            <img :src="data.cover || randerErrImg()" @error="imgErr" ref="img" alt="">
            <div class="bottom">
                <p class="title hidden1">
                    {{data.name}}
                </p>
                <p class="author hidden1">
                    {{data.author}}
                </p>
                <p class="new hidden1">
                    {{data.latest}}
                </p>
                <p class="tag hidden1">
                    {{data.tag}}
                </p>
            </div>
        </div>
        <div v-if="data.history!== undefined" @click="removeHistoryFn" title="删除历史记录" class="remove"><i class="iconfont icon-lajitong"></i></div>
    </div>

</template>

<script>
    import randerErrImg from "../utils/randerErrImg";
    import {mapMutations} from "vuex"

    export default {
        name: "d-manhua",
        props: ["data"],
        methods: {
            ...mapMutations("history", [
                "removeHistory"
            ]),
            randerErrImg,
            imgErr() {
                this.$refs.img.src = this.randerErrImg()
            },
            clickFn() {
                this.$router.push({
                    name: "mhDetails",
                    params: {
                        url: this.data.url
                    }
                })
            },
            removeHistoryFn() {
                this.removeHistory(this.data.ArrIndex)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .d-manhua {
        width: 200px;
        height: 267px;
        position: relative;
        overflow: hidden;
        margin-top: 20px;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
        }

        .history {
            position: absolute;
            top: 0;
            left: 0;
            line-height: 30px;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.4);
            color: #ffffff;
            width: 100%;
        }

        .bottom {
            width: 200px;
            background-color: rgba(0, 0, 0, 0.4);
            position: absolute;
            bottom: 0;
            left: 0;
            transform: translateY(100%);
            transition: all 0.5s;

            p {
                font-size: 14px;
                line-height: 40px;
                color: #ffffff;

                width: 100%;
                text-align: center;

                &.title {
                    font-size: 18px;
                }

                &.new {
                    font-size: 16px;
                }
            }
        }

        &:hover {
            .bottom {
                transform: translateY(0);
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
