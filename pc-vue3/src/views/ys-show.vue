<template>
	<div class="corll">
		<span @click="preClick">
							上一话:{{nextAndPre.pre}}
				</span>
		<span class="title">
					{{data.name}}-{{(list[index] && list[index].num) || ""}}
				</span>
		<span @click="nextClick">
							下一话:{{nextAndPre.next}}
				</span>
	</div>
	<div class="iframe-box">
		<iframe ref="iframe" :src="showUrl" width="100%" height="100%" frameborder="0"></iframe>
	</div>
	<div class="corll">
		<dButton @click="changeWindowFullScreen">全屏</dButton>
		<dButton @click="downLoad">下载</dButton>
	</div>
	<div class="hr"></div>
	<div class="list clearfix">
		<template v-for="(item,item_index) in list">
			<div @click="listItemClick(item_index)" :title="item.num" :class="index === item_index ? 'active' : ''"
			     class="hidden1 list_item">{{item.num}}
			</div>
		</template>
	</div>
</template>

<script>
    import {detailsYs} from "@/api/api"
    import dButton from "@/components/d-button"
    import {mapMutations} from "vuex"

    export default {
        name: "ys-show",
        data() {
            return {
                list: [],
                showUrl: "",
                index: 0,
                data: {},
                l: null,
                canWatch: false
            }
        },
        components: {
            dButton
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
        watch: {
            index() {
                if (this.canWatch) {
                    this.changeIndex(this.list[this.index].onlineurl);
                    this.addHistory({
                        type: "ys",
                        data: {
                            data: {
                                ...this.data,
                                history: this.index,
                                url: this.$route.params.url,
                                num: this.list[this.index].num,
                            },
                            key: this.$route.params.url
                        }
                    })
                }
            },
            "$route.params.index": {
                handler() {
                    if (this.$route.name === "ysShow") {
                        this.index = Number(this.$route.params.index)
                    }
                }
            }
        },
        created() {
			this.$route.params.list ? this.list = JSON.parse( this.$route.params.list): "";
			this.$route.params.data ? this.data = JSON.parse(this.$route.params.data): "";

			this.init();
        },
        methods: {
            ...mapMutations("history", [
                "addHistory",
            ]),
            async init() {
                this.showLoading()
				if(!this.list.length){
					await detailsYs(this.$route.params.url).then(res => {
						if (res.code !== 0) {
							return this.errLoading();
						}
						this.data = res.data;
						this.list = res.list;
						this.index = Number(this.$route.params.index);
						this.canWatch = true;
						this.showUrl = this.list[this.index].onlineurl
						this.closeLoading();
					})
				}else{
					this.index = Number(this.$route.params.index);
					this.canWatch = true;
					this.showUrl = this.list[this.index].onlineurl
					this.closeLoading();
				}
				this.addHistory({
					type: "ys",
					data: {
						data: {
							...this.data,
							history: this.index,
							url: this.$route.params.url,
							num: this.list[this.index].num,
						},
						key: this.$route.params.url
					}
				})
            },
            listItemClick(index) {
				this.jumpUrl(index)
            },
            changeIndex(url) {
                this.showUrl = url

            },
            nextClick() {
                if (this.index + 1 >= this.list.length) {
                    return alert("看完啦")
                }
				this.jumpUrl((this.index * 1) + 1)
            },
            preClick() {
                if (this.index - 1 < 0) {
                    return alert("已经是第一章了")
                }
				this.jumpUrl(this.index - 1)
            },
            // 全屏
            fullScreen(element) {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                }
            },

            exitFullscreen() {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            },

            changeWindowFullScreen() {
                let isFull = !!(document.webkitIsFullScreen || document.mozFullScreen ||
                    document.msFullscreenElement || document.fullscreenElement
                )
                if (isFull) {
                    this.exitFullscreen()
                } else {
                    this.fullScreen(this.$refs.iframe)
                }
            },
            downLoad() {
                let url = this.list[this.index].download
                var a = document.createElement("a");
                a.href = url;
                let body = document.querySelector("body")
                body.append(a); // 修复firefox中无法触发click
                a.click();
                body.removeChild(a);
            },
			jumpUrl(index){
				this.$router.push({
					name: "proxy",
					params: {
						name: "ysShow",
						url: this.$route.params.url,
						index: index,
						list:JSON.stringify(this.list),
						data:JSON.stringify(this.data)

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
	.iframe-box {
		width: 100%;
		height: 670px;
		background: #000000;
	}

	.hr {
		margin-top: 27px;
		height: 2px;
		background-color: #5fe5dd;
	}

	.list_item {
		width: 160px;
		height: 53px;
		background-color: #ffffff;
		border-radius: 10px;
		border: solid 2px #5fe5dd;
		text-align: center;
		line-height: 53px;
		margin-top: 35px;
		float: left;
		margin-right: 43px;
		box-sizing: border-box;
		padding: 0 8px;

		&:nth-child(6n) {
			margin-right: 0;
		}


		&.active, &:hover {
			background: #5fe5dd;
			color: #fff;
			cursor: pointer;
		}
	}

	.corll {
		margin-top: 15px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;

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
