<template>
    <view v-if="show" @touchmove.stop.prevent="moveStop" @click="reload">
        <view class="loading">
            <view class="spinner"></view>
            <view class="msg" v-if="!err">loading...</view>
            <view class="msg" v-if="err">服务器出错啦 o(╥﹏╥)o 点击页面刷新</view>
			<view class="msg mt30" v-if="timeOut">长时间未响应,点击页面刷新</view>
        </view>
    </view>

</template>

<script>
    export default {
        name: "d-loading",
        props: ["parentdom"],
        data() {
            return {
                show: true,
                err: false,
				timeOut:false,
				timeOutId:null
            }
        },
		mounted() {
			this.timeOutId = setTimeout(()=>{
				this.timeOut = true
			}, 60000)
		},
        methods: {
            init() {
                this.show = true;
				this.timeOutId = setTimeout(()=>{
					this.timeOut = true
				}, 60000)
                return this
            },
            hidden() {
                this.show = false;
                clearTimeout(this.timeOutId)
            },
            errFn() {
                this.err = true;
				clearTimeout(this.timeOutId)
			},
			moveStop(){},
			reload(){
				this.$emit("reload")
			}
        }
    }
</script>

<style scoped lang="scss">

    .mt30{
        margin-top: 30rpx;
    }

    .loading {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        right: 0;
        background: #fff;
        text-align: center;
        // z-index: 9999999999;

        .spinner {
            width: 120rpx;
            height: 120rpx;
            margin: 100rpx auto;
            margin-bottom: 30rpx;
            animation: rotateplane 1.2s infinite ease-in-out alternate;
        }

        .msg {
            text-align: center;
            font-size: 36rpx;
            color: #5fe5dd;
            animation: bac 1.2s infinite ease-in-out alternate;
        }


    }


    @keyframes rotateplane {
        0% {
            transform: perspective(240rpx) rotateX(0deg) rotateY(0deg);
            background: #5fe5dd;
        }
        50% {
            transform: perspective(240rpx) rotateX(-180.1deg) rotateY(0deg);
            background: #73e55f;
        }
        100% {
            transform: perspective(240rpx) rotateX(-180deg) rotateY(-179.9deg);
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
