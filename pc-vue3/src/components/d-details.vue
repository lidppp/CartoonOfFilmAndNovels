<template>
	<div class="top">
		<div class="left-img">
			<img :src="(data && data.data && data.data.cover) || randerErrImg()" alt="" @error="randerErrImg">
		</div>
		<div class="right-msg">
			<slot></slot>
		</div>
		<div class="collection" :class="[isCollection ?'active':'']" @click="collectionClick">
			<i class="iconfont icon-shoucang"></i>
			{{ isCollection ? "已收藏" : "收藏"}}
		</div>
	</div>
	<div class="hr"></div>
	<div class="list clearfix">
		<slot name="list" :activeIndex="historyIndex">
			<template v-for="(item,index) in data.list">
				<div @click="listItemClick(item,index)" :title="item.num"  class="hidden1 list_item" :class="[historyIndex !== false && index === historyIndex ? 'active' :'']">{{item.num}}</div>
			</template>
		</slot>
	</div>
</template>

<script>

    import randerErrImg from "@/utils/randerErrImg.js"
    import {mapMutations, mapState} from "vuex"

    export default {
        name: "details",
        props: [
            "data"
        ],
        computed: {
            ...mapState("collection", {
                mapData: (state) => state.data
            }),
		        ...mapState("history", {
                mapHistoryData: (state) => state.data
            }),
		        isCollection(){
                return !!(this.mapData[this.$route.params.url])
		        },
		        historyIndex(){
                let arr = this.mapHistoryData.filter((item)=>{
                   return  item.data.key === this.$route.params.url
                })
								let flag =  arr.length !== 0  ? arr[0].data.data.history : false

				        return flag
		        }
        },

        methods: {
            ...mapMutations("collection", [
                "setData",
            ]),
            randerErrImg,
            listItemClick(data, index) {
                data.index = index;
                this.$emit("itemClick", data, index)
            },
            collectionClick() {
                let type = this.getType();

                this.setData({
                    isRemove: this.isCollection,
                    type:type,
		                key:this.$route.params.url,
		                data:{...this.data,url:this.$route.params.url}
                })
            },
		        getType(){
                let type;
                switch (this.$route.name) {
                    case "mhDetails":
                        type = "mh"
                        break;
                    case "ysDetails":
                        type = "ys"
                        break;
                    case "xsDetails":
                        type = "xs"
                        break;
                }
                return type
		        }
        }
    }
</script>

<style lang="scss" scoped>
	.top {
		height: 300px;
		width: 100%;
		position: relative;

		.left-img {
			float: left;
			width: 200px;
			height: 100%;
			margin-right: 73px;

			img {
				width: 100%;
				height: 100%;
			}
		}

		.right-msg {
			float: left;
			height: 100%;
			overflow: hidden;
			width: calc(100% - 273px);
		}

		.collection {
			position: absolute;
			right: 0;
			bottom: 0;
			height: 50px;
			background-color: #5fe5dd;
			border-radius: 10px;
			color: #fff;
			line-height: 50px;
			padding: 0 15px;
			cursor: pointer;
			user-select: none;

			&.active{
				background: #f6be6e;
			}
		}
	}

	.hr {
		margin-top: 27px;
		height: 2px;
		background-color: #5fe5dd;
	}

	.list_item {
		width: 160px;
		height: 53px;
		background-color: #ffffff;
		border-radius: 10px;
		border: solid 2px #5fe5dd;
		text-align: center;
		line-height: 53px;
		margin-top: 35px;
		float: left;
		margin-right: 43px;
		box-sizing: border-box;
		padding: 0 8px;

		&:nth-child(6n) {
			margin-right: 0;
		}

		&:hover,&.active {
			background: #5fe5dd;
			color: #fff;
			cursor: pointer;
		}
	}
</style>