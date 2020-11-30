<template>
    <HeaderNav></HeaderNav>
    <div class="w1200 main">
        <router-view :key="key" />
    </div>
</template>
<script>
    import HeaderNav from "./components/HeaderNav";

    export default {
        components:{
            HeaderNav
        },
        computed:{
            key(){
                return this.$route.path + Math.random();
            }
        }
    }
</script>

<style lang="scss">

    .main {
        padding: 92px 0;
    }

</style>
