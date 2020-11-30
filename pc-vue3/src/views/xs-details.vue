<template>
	<dDetails
			:data="data"
	>
		<template #default>
			<p class="name">
				{{data.data.name}}
				<span class="year"></span>
				<span>{{data.data.tag}}</span>
				<span>{{data.data.status}}</span>
				<span>{{data.data.genre}}</span>
			</p>

			<p>
				{{data.data.author}}
			</p>

			<p>
				{{data.data.time}}
			</p>

			<p class="hidden2" :title="data.data.performer">
				最新:{{data.data.num}}
			</p>

			<p class="hidden3" :title="data.data.introduce">
				简介:{{data.data.introduce}}
			</p>
		</template>

		<template #list="list">
			<template v-for="(item,index) in data.list">
				<div  @click="itemClick(item,index)" :title="item.num" class="hidden1 list_item" :class="[list.activeIndex !== false && index === list.activeIndex ? 'active' :'']">{{item.num}}</div>
			</template>
		</template>
	</dDetails>
</template>

<script>
    import dDetails from "@/components/d-details"
    import randerErrImg from "@/utils/randerErrImg.js"
    import {detailsXs} from "@/api/api"

    export default {
        name: "details",
        data() {
            return {
                data: {
                    data: {},
                    list: []
                },
                url1: ""
            }
        },
        components: {
            dDetails
        },
        created() {
            this.url1 = this.$route.params.url;
            this.showLoading();
            detailsXs(this.url1).then((res) => {
                if (res.code === 0) {
                    this.data = res;
                    this.closeLoading();
                } else {
                    this.errLoading()
                }
            }).catch(() => {
                this.errLoading()
            })
        },
        methods: {
            randerErrImg,
            showLoading() {
                this.l = this.$loading()
            },
            closeLoading() {
                this.l.close()
            },
            errLoading() {
                this.l.err();
            },
            itemClick(data,index) {
                this.$router.push({
		                name:"xsShow",
		                params:{
		                    url:this.url1,
				                index:index
		                }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
	p {
		padding-right: 13%;
		margin-bottom: 21px;
	}

	.name {
		font-size: 24px;
		color: #5fe5dd;

		span {
			margin-right: 15px;
			font-size: 18px;
			color: #000000;

			&.year {
				color: #5fe5dd;
			}
		}
	}

	.list_item {
		width: 23%;
		height: 53px;
		background-color: #ffffff;
		border-radius: 10px;
		border: solid 2px #5fe5dd;
		text-align: center;
		line-height: 53px;
		margin-top: 35px;
		float: left;
		margin-right: 2.6%;
		box-sizing: border-box;
		padding: 0 8px;

		&:nth-child(4n) {
			margin-right: 0;
		}

		&:hover,&.active {
			background: #5fe5dd;
			color: #fff;
			cursor: pointer;
		}
	}
</style>