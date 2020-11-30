<template>
	<div style="width: 48%;">
		<div class="d-xiaoshuo bs" @click="clickFn">
			<div class="left">
				<img :src="data.cover || randerErrImg()" @error="imgErr" ref="img" alt="">
			</div>
			<div class="right">
				<div class="hidden1 name">{{data.name}}</div>
				<div class="hidden1 author">{{data.author}}</div>
				<div class="introduce hidden2" :title="data.introduce">
					{{data.introduce}}
				</div>
				<div class="hidden1 num">{{data.history!== undefined ? "观看至:"+data.num : data.num}}</div>
				<div class="hidden1 tag">{{data.tag}}</div>
				<div class="time">
					<span style="margin-right: 15px;">{{data.time}}</span>
					<span class="status">{{data.status}}</span>
				</div>

			</div>

		</div>
		<div v-if="data.history!== undefined" @click="removeHistoryFn" title="删除历史记录" class="remove"><i
				class="iconfont icon-lajitong"></i></div>
	</div>


</template>

<script>
    import randerErrImg from "../utils/randerErrImg";
	import {mapMutations} from "vuex"

    export default {
        name: "d-xiaoshuo",
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
                    name: "xsDetails",
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

<style scoped lang="scss">
    .d-xiaoshuo {
        width: 100%;
        height: 267px;
        background-color: #ffffff;
        padding: 22px 17px;
        margin-top: 20px;
        display: flex;
        cursor: pointer;
        text-align: center;
        box-sizing: border-box;

        .left {
            width: 30%;
            height: 100%;
            flex-shrink: 0;
            margin-right: 30px;

            img {
                width: 100%;
                height: 100%;
                transition: all 0.5s;
            }
        }

        .right {
            width: calc(70% - 30px);
            font-size: 16px;
            color: #000000;
            flex-grow: 1;

            .name {
                transition: all .5s;
                font-size: 20px;
                font-weight: bold;
            }

            div {
                margin-bottom: 15px;
            }

        }


        &:hover {
            .left img {
                transform: scale(1.05);
            }

            .right {
                .name {
                    color: #5fe5dd;
                }
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
