<template>
    <teleport v-if="show" to="body">
        <div class="loading">
            <div class="spinner"></div>
            <div class="msg" v-if="!err">loading...</div>
            <div class="msg" v-if="err">服务器出错啦 o(╥﹏╥)o 请刷新页面重试</div>
			<div class="msg" style="margin-top: 30px;" v-if="timeOut">长时间未响应,请刷新页面试试</div>
        </div>
    </teleport>

</template>

<script>
    export default {
        name: "d-loading",
        props: ["parentdom"],
        data() {
            return {
                show: false,
                err: false,
				timeOut:false,
				timeOutId:null
            }
        },
        methods: {
            init() {
                this.show = true;
                let body = document.querySelector("body");
                body.style.height = "100%"
                body.style.overflowX = "hidden"
                body.style.overflowY = "hidden"

				this.timeOutId = setTimeout(()=>{
					this.timeOut = true
				}, 15000)
                return this
            },
            hidden() {
                this.show = false;
                let body = document.querySelector("body");
                body.style.height = "auto"
                body.style.overflowX = "auto"
                body.style.overflowY = "auto"
                this.parentdom.parentElement.removeChild(this.parentdom);
                clearTimeout(this.timeOutId)
            },
            errFn() {
                this.err = true;
				clearTimeout(this.timeOutId)
			}
        }
    }
</script>

<style scoped lang="scss">
    .loading {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        background: #fff;
        text-align: center;
        z-index: 9999;

        .spinner {
            width: 60px;
            height: 60px;
            margin: 100px auto;
            margin-bottom: 30px;
            animation: rotateplane 1.2s infinite ease-in-out alternate;
        }

        .msg {
            text-align: center;
            font-size: 24px;
            color: #5fe5dd;
            animation: bac 1.2s infinite ease-in-out alternate;
        }


    }


    @keyframes rotateplane {
        0% {
            transform: perspective(120px) rotateX(0deg) rotateY(0deg);
            background: #5fe5dd;
        }
        50% {
            transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
            background: #73e55f;
        }
        100% {
            transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
            background: #e55fa9;
        }
    }

    @keyframes bac {
        0% {
            color: #5fe5dd;
        }
        50% {
            color: #73e55f;
        }
        100% {
            color: #e55fa9;
        }
    }
</style>
