<template>
	<input class="inp" type="text" v-model="valcpd" :style="{width:width?width+'px':null}" :placeholder="placeholder">
</template>

<script>
    import {computed} from "vue"

    export default {
        name: "d-input",
		    props:["value","placeholder","width"],
        setup(props, {emit}) {
            let valcpd = computed({
                get: () => {
                    return props.value
                },
                set: (value) => {
                    emit("update:value", value)
                }
            })
            return {
                valcpd,
            }
        }
    }
</script>

<style scoped>
	.inp {
    width: 323px;
		height: 52px;
		background-color: #ffffff;
		border-radius: 10px;
		border: solid 2px #5fe5dd;
	}
</style>