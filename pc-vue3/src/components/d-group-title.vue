<template>
	<div class="d-group-item">
		<img :src="img" alt="">
		<div class="title">{{title}}</div>
		<div >
			<dInput v-if="!hiddenInput" class="mr20" v-model:value="ipval" :placeholder="placeholder" width="158"></dInput>
			<dButton v-if="!hiddenInput" icon="icon-sousuo" v-bind="$attrs"></dButton>
		</div>
	</div>
</template>

<script>
    import dInput from "./d-input"
    import dButton from "./d-button"

    export default {
        name: "d-group-title",
        props: ["img", "title", "inpVal", "placeholder","hiddenInput"],
        components: {
            dInput,
            dButton
        },
        computed: {
            ipval: {
                get() {
                    return this.inpVal
                },
                set(value) {
                    this.$emit("update:inpVal", value)
                }
            }
        }
    }
</script>

<style scoped lang="scss">
	.d-group-item {
		height: 80px;
		margin-top: 38px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		img {
			width: 137px;
			height: 79px;
		}

		.title {
			font-size: 24px;
			font-weight: bold;
			color: #5fe5dd;
		}
	}
</style>
