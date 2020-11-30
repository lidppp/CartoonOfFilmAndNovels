<template>

</template>

<script>
    export default {
        name: "proxy",
        created() {
            let {name , url , index} = this.$route.params
            console.log("proxy",this.$route.params)
            this.$router.replace({
                name:name,
                params:{
                    ...this.$route.params
                }
            })
        }
    }
</script>

<style scoped>

</style>
