<template>
	<div class="d-button" :class="[type]" @click="click">
		<i v-if="icon" :class="['iconfont', icon]" :style="{marginRight:$slots.default ? null:'0px'}"></i>
		<slot></slot>
	</div>
</template>

<script>
    import {toRefs} from "vue"

    export default {
        name: "d-button",
        props: {
            icon: String,
            type: {
                type: String,
                default: ""
            }
        },
        setup(props, {emit}) {
            function click() {
                emit("clickFn")
            }

            return {
                ...toRefs(props),
                click
            }
        }
    }
</script>

<style scoped lang="scss">
	.d-button {
		height: 50px;
		border-radius: 10px;
		display: inline-block;
		text-align: center;
		line-height: 50px;
		font-size: 18px;
		padding: 0 16px;
		background-color: #ffffff;
		border: solid 2px #5fe5dd;
		color: #5fe5dd;
		user-select: none;
		cursor: pointer;
		font-weight: 700;
		transition: all 0.5s ease;


		i {
			display: inline-block;
			font-size: 20px;
			margin-right: 10px;
			transition: all 0.5s ease;
			transform: rotate(0deg);
		}

		&:hover {
			background-color: #5fe5dd;
			border: solid 2px #5fe5dd;
			color: #ffffff;
			i {
				transform: rotate(360deg);
			}
		}


		&.primary {
			background-color: #5fe5dd;
			border: solid 2px #5fe5dd;
			color: #ffffff;
			&:hover{
				background-color: #ffffff;
				border: solid 2px #5fe5dd;
				color: #5fe5dd;
			}
		}

		&.waring {
			background-color: #f6be6e;
			border: solid 2px #f6be6e;
			color: #ffffff;
			&:hover{
				background-color: #ffffff;
				border: solid 2px #f6be6e;
				color: #f6be6e;
			}
		}
	}


</style>