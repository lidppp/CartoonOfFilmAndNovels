<template>
    <div class="select-parts_box" :class="isShow ? 'show' : ''">
        <div class="close_button" @click="isShow = !isShow">{{isShow ? ">" :"<"}}</div>
        <div class="list_box">
            <h4>目录</h4>
            <div v-for="(item,index) in list" class="list_item hidden1" @click="itemClick(item,index)" :class="[index === selectIndex ? 'active' : '']">
                {{item.num}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "d-selectParts",
        props: ["list","selectIndex"],
        data(){
            return {
                isShow:false
            }
        },
        watch:{
            // isShow(newVal){
            //     if(newVal){
            //         setTimeout(()=>{this.isShow=false},5000)
            //     }
            // }
        },
        methods:{
            itemClick(item,index){
                this.$emit("itemClick",item,index)
            }
        }
    }
</script>

<style scoped lang="scss">
.select-parts_box{
    background: #6bb3af;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    width: 320px;
    transition: all 0.5s;
    transform: translateX(100%);
    z-index: 51;

    &.show{
        transform: translateX(22px);
    }

    .close_button{
        font-family: 宋体;
        width: 20px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-weight: 700;
        box-sizing: border-box;
        background:#6bb3af;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-100%,-50%);
        user-select: none;
        cursor: pointer;
        color: #fff;
    }

    .list_box{
        width: 100%;
        box-sizing: border-box;
        /*padding-top: 110px;*/
        padding: 15px;
        height: 100%;
        overflow: auto;

        .list_item,h4{
            box-sizing: border-box;
            width: 100%;
            height: 30px;
            padding: 0 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            user-select: none;
            line-height: 30px;
            color: #ffffff;
            &:hover,&.active{
              background: rgba(255, 255, 255, 0.5);
            }
        }
    }
}
</style>
