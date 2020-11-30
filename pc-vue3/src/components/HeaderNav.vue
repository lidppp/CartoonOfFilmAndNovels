<template>
	<div class="header" :class="[scrTop > 80 ? 'shadow' : '', showNav? '' : 'hidden']">
		<div class="w1200 header-item">
			<router-link to="/"><img src="@/assets/img/logo/juhe.png" alt=""></router-link>
			<div class="other">
				<dInput class="mr20" placeholder="搜索漫画,影视,小说" v-model:value="inputValue"></dInput>
				<dButton class="mr20" type="primary" icon="icon-sousuo" @clickFn="serchAll">搜索</dButton>
				<dButton class="mr20" icon="icon-shoucang" @clickFn="jumpCollection">收藏</dButton>
				<dButton class="mr20" icon="icon-lishi" @clickFn="jumpHistory">历史</dButton>
			</div>
		</div>
	</div>
</template>

<script>
    import dInput from "./d-input"
    import dButton from "./d-button"
    import {ref, onBeforeUnmount,watchEffect} from "vue"
    import {useRouter,useRoute} from "vue-router"

    export default {
        name: "HeaderNav",
        components: {
            dInput,
            dButton
        },
        setup() {
            let inputValue = ref("");
            let scrTop = ref(window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
            let showNav = ref(true);

            let router = useRouter(),route = useRoute();

            function serchAll() {
                if (!inputValue.value) {
                    return
                }
                router.push({
                    name: "Search",
                    params: {type: "all", queryString: inputValue.value},
                    query: {time: +new Date()}
                })
            }

            watchEffect(()=>{
                if (route.name === "Search" && route.params.type === "all") {
                        inputValue.value = route.params.queryString
                    }
                    else {
                        inputValue.value = ""
                    }
            })

            function getVal() {
                console.log(inputValue.value)
            }

            let preScrollTop = 0;
            const scrFn = () => {
                // let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
		            preScrollTop = scrTop.value
                scrTop.value = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                showNav.value = preScrollTop >= scrTop.value
            }

            window.addEventListener("scroll", scrFn)

            onBeforeUnmount(() => {
                window.removeEventListener("scroll", scrFn)
            })

			function jumpHistory(){
				router.push({
					name:"history"
				})
			}

			function jumpCollection() {
				router.push({
					name:"collection"
				})
			}

            return {
                getVal,
                inputValue,
                scrTop,
                serchAll,
		            showNav,
				jumpHistory,
				jumpCollection
            }
        },
        watch: {
            "$route": {
                handler() {
                    if (this.$route.name === "Search") {
                        this.inputValue = this.$route.params.queryString
                    }
                    else {
                        this.inputValue = ""
                    }
                },
                deep: true
            }
        }
    }
</script>

<style scoped lang="scss">
	.header {
		width: 100%;
		height: 92px;
		position: fixed;
		top: 0;
		left: 0;
		transition: all 0.5s ease;
		background: #fff;
		z-index: 50;

		&.shadow {
			box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.35);
		}
		&.hidden{
			opacity: 0;
		}
		&:hover{
			opacity: 1;
		}
		.header-item {
			display: flex;
			height: 100%;
			position: relative;
			justify-content: space-between;

			img {
				width: 137px;
				height: 79px;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
			}
		}

		.other {
			display: flex;
			align-items: center;
		}
	}
</style>
