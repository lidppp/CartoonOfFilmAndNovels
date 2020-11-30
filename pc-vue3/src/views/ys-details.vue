<template>
	<dDetails
			:data="data"
			@itemClick="itemClick"
	>
		<div>
			<p class="name">
				{{data.data.name}}
				<span class="year">({{data.data.Release}})</span>
				<span>{{data.data.region}}</span>
				<span>{{data.data.Language}}</span>
				<span>{{data.data.genre}}</span>
			</p>

			<p>
				{{data.data.time}}
			</p>

			<p>
				导演:{{data.data.director}}
			</p>

			<p class="hidden2" :title="data.data.performer">
				演员:{{data.data.performer}}
			</p>

			<p class="hidden4" :title="data.data.introduce">
				简介:{{data.data.introduce}}
			</p>
		</div>
	</dDetails>
</template>

<script>
    import dDetails from "@/components/d-details"
    import randerErrImg from "@/utils/randerErrImg.js"
    import {detailsYs} from "@/api/api"
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
            detailsYs(this.url1).then((res) => {
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
		                name:"ysShow",
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

</style>