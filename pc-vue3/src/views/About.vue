<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div>{{num}}</div>
    <button @click="addNum">addNum</button>
    <div style="display: flex;justify-content: space-between">
<!--      漫画-->
      <div style="width: 30%;">
        <ul>
            <template  v-for="(item,index) in data.mhlist" :key="index">
                <li @click="mhClick(item.url)" >
                    <img @error="imgloadError(item)" style="height: 80px;" :src="item.cover" alt="">
                    <p>{{item.name}}</p>
                </li>
            </template>
        </ul>
      </div>
        <!--          影视-->
        <div style="width: 30%;">
            <ul>
                <template  v-for="(item,index) in data.yslist" :key="index">
                    <li @click="mhClick(item.url)" >
                        <p>{{item.genre}}</p>
                        <p>{{item.name}}</p>
                        <p>{{item.time}}</p>
                    </li>
                </template>
            </ul>
        </div>

        <!--          小说-->
        <div style="width: 30%;">
            <ul>
                <template  v-for="(item,index) in data.xslist" :key="index">
                    <li @click="mhClick(item.url)" >
                        <img @error="imgloadError(item)" style="height: 80px;" :src="item.cover || errImg" alt="">
                        <p>{{item.name}}</p>
                    </li>
                </template>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
  import {mapState,mapActions} from "vuex"
  import {searchAll} from "@/api/api"
  const errImg = require("@/assets/img/imgerr.png")
  export default {
    data(){
      return {
        data: {
            mhlist:[],
            xslist:[],
            yslist:[]
        },
          errImg:errImg
      }
    },
    computed:{
      ...mapState({
        num: state => state.test.num
      })
    },
    mounted() {
      searchAll("hot").then((res)=>{
        this.data = res
      })
    },
    methods:{
      ...mapActions("test",[
        "addNum"
      ]),
        mhClick(item){
        },
        imgloadError(item){
          item.cover=errImg
        }
    }
  }
</script>
