<template>
	<div class="floor">
		<div @click="jump('#mh')">漫画</div>
		<div @click="jump('#xs')">小说</div>
		<div @click="jump('#ys')">影视</div>
		<div @click="jump('top')">TOP</div>
	</div>
</template>

<script>
    export default {
        name: "FloorJump",
        data() {
            return {
                scrollTimer: null
            }
        },
        methods: {
            jump(query) {
                let top;
                if (query === "top") {
                    top = 0;
                } else {
                    top = document.querySelector(query).offsetTop - 110;
                }
                this.ScrollTop(top, 500)
            },
            ScrollTop(number = 0, time) {
                if (!time) {
                    document.body.scrollTop = document.documentElement.scrollTop = number;
                    return number;
                }
                clearInterval(this.scrollTimer);
                const spacingTime = 20; // 设置循环的间隔时间  值越小消耗性能越高
                let spacingInex = time / spacingTime; // 计算循环的次数
                let nowTop = document.body.scrollTop + document.documentElement.scrollTop; // 获取当前滚动条位置
                let everTop = (number - nowTop) / spacingInex; // 计算每次滑动的距离
                this.scrollTimer = setInterval(() => {
                    if (spacingInex > 0) {
                        spacingInex--;
                        this.ScrollTop(nowTop += everTop);
                    } else {
                        clearInterval(this.scrollTimer); // 清除计时器
                    }
                }, spacingTime);
            }
        }
    }
</script>

<style scoped lang="scss">
	.floor {
		position: fixed;
		right: 80px;
		bottom: 120px;
		width: 60px;
		border: solid #5fe5dd 1px;

		& > div {
			width: 100%;
			line-height: 36px;
			cursor: pointer;
			color: #5fe5dd;
			background: #fff;
			text-align: center;
			border-bottom: 1px solid #5fe5dd;
			transition: all 0.5s;

			&:last-child {
				border-bottom: none;
			}

			&:hover {
				background: #5fe5dd;
				color: #fff;
			}
		}
	}
</style>