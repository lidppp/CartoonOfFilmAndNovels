<template>
	<dDetails
		:data="data"
		@itemClick="itemClick"

	>
		<div>
			<p class="name hidden1">{{data.data.name}} <span class="tag">{{data.data.tag}}</span></p>
			<p class="otherP time hidden1">
				<span>{{data.data.time}}</span>
				<span>{{data.data.status}}</span>
			</p>
			<p class="otherP introduce hidden5">{{data.data.introduce}}</p>
			<p class="otherP hidden1">{{data.data.author}}</p>
		</div>
	</dDetails>
</template>

<script>
	import dDetails from "@/components/d-details"
	import randerErrImg from "@/utils/randerErrImg.js"
	import {detailsMh} from "@/api/api"
    export default {
        name: "details",
		    data(){
            return {
                data: {
                    data:{},
		                list:[]
                },
		            url1:""
            }
		    },
		    components:{
            dDetails
		    },
		    created(){
					this.url1 = this.$route.params.url;
					this.showLoading();
					detailsMh(this.url1).then((res)=>{
					    if (res.code === 0){
					        this.data = res;
					        this.closeLoading();
					    }else{
                  this.errLoading()
					    }
					}).catch(()=>{
					    this.errLoading()
					})
		    },
		    methods:{
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
				    itemClick(data){
						    this.$router.push({
								    name:"mhShow",
								    params:{
								        url:this.url1,
										    index:data.index
								    }
						    })
				    }
		    }
    }
</script>

<style lang="scss" scoped>
	.name, .otherP {
		font-size: 18px;
		margin-bottom: 40px;
	}
	.name {
			font-size: 24px;
			font-weight: bold;
			color: #5fe5dd;
		margin-bottom: 20px;
		}
	.tag{
		font-size: 18px;
		margin-bottom: 20px;
		margin-left: 15px;
		color:#000;
		font-weight: 400;

	}
	.time{
		margin-bottom: 20px;
				font-size: 16px;

		span{
			margin-right: 42px;
		}
	}

</style>