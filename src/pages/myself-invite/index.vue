<template>
	<div class="contain">
		<blockquote v-if="!isLoading">
			<loading></loading>
		</blockquote>
		<blockquote v-else>
			<div>
				<div class="rec-wrap centered">
					<div class="rec-li" v-for="(BookItem , index) in BookList" :key="BookItem.orderId">
						<div class="cant clr">
							<div class="img fl"><img :src="BookItem	.thumbnail" /></div>
							<div class="rec-center fl">
								<div class="tit fontHidden">{{BookItem.goodName}}</div>
								<div class="name fontHidden1">{{BookItem.goodName}}</div>
								<div class="present ">￥:{{BookItem.goodsAmount}}</div>
								<div class="time" v-if="BookItem.endTime!=null">预约结束时间:{{BookItem.endTime}}</div>
								<div class="time" v-else>暂未预约</div>
							</div>
							<div class="rec-right fr">
								<div class="use">{{BookItem.statusType}}</div>
								<div class="num ">数量 : {{BookItem.goodsNum}}</div>
							</div>
						</div>
						<div class="clr">
							<div class="line fr"></div>
						</div>
						<div class="rec-bottom">
							<!-- <span>{{goodlist.dele}}</span> -->
							<botton @click="toPage(BookItem.orderId)">订单详情</botton>					
						</div>
					</div>

				</div>
				<nomoreTip v-if="!hasMore"></nomoreTip>
			</div>
		</blockquote>
	</div>
</template>
<script>
import API_myself from '@/api/myself'
import API_ORDER from '@/api/order'
import Store from '@/store/store'
import Index_Lib from '@/utils/index'
import nomoreTip from "@/components/nomoreTip"
import loading from '@/components/loading'
	export default {
		data() {
			return {
				BookList:[],
				hasMore:true,
                listQuery: {
					page: 1,
					limit: 3,
				},
				rec:[],
				isLoading:false,
			};
		},
		components: {
            nomoreTip,
            loading
		},
		onReachBottom:function(){
			let that = this;
            that.listQuery.page += 1
		    this.getGoodsBookList()			
		},
		methods: {
			async getGoodsBookList(){
				let that = this;
				// let data = {memberId:wxgets}
				 let data = Object.assign({},{unionId:Store.state.userInfo.unionid,status:1},{orderType:2},that.listQuery) 
				let res = await API_ORDER.getOrderList(data).catch(err => {
					Lib.showToast('失败','loading')
				})

				if(res.code == 0){
					let book = res.pageUtils.rows.map(v => {
						if(v.endTime!=null){
							v.endTime = Index_Lib.formatTime(v.endTime)
						}
						if(v.status==1){
							v.statusType='待核销'
						}
						else if(v.status==2){
							v.statusType='已核销'
						}
						else{
							v.statusType='已取消'
						}
						return v;
					})
					that.BookList = that.BookList.concat(book)
					if(book.length < that.listQuery.limit){
                         that.hasMore=false
					}
				}else{
					Lib.showToast('失败','loading')
				}
				
				wx.hideLoading()
			},

			//跳转详情页
			toPage(orderId){
			wx.navigateTo({
			      url: '../order-detail/main?orderId='+orderId
			})
			}

		},
		async onLoad(){
			let that=this
			await that.getGoodsBookList();
			that.isLoading=true
		},
		onUnload(){
			let that=this
				that.BookList=[]
				that.hasMore=true
                that.listQuery= {
					page: 1,
					limit: 3,
				}
				that.rec=[]
				that.isLoading=false
		}
	};
</script>
<style lang="less">
	/*列表*/
	
	.rec-li {
		padding-bottom: 36px;
		&:nth-child(1) {
			margin-top: 20px;
		}
		.img {
			width: 80px;
			height: 80px;
			overflow: hidden;
			img {
				border-radius: 5px;
				width: 100%;
				height: 100%;
			}
		}
		.rec-center {
			width: 210px;
			line-height: 23px;
			overflow: hidden;
			padding-left: 12px;
			box-sizing: border-box;
			.tit {
				font-size: 15px;
				color: #111111;
				line-height: 24px;
			}
			.name {
				font-size: 12px;
				color: #999999;
			}
			.present {
				color: #ff0000;
				font-size: 17px;
			}
			.name {
				font-size: 12px;
				color: #999999;
			}
			.original {
				text-decoration: line-through;
				color: #999999;
				font-size: 12px;
			}
			.time {
				color: #ffb10f;
				font-size: 11px;
			}
		}
		.rec-right {
			width: 60px;
			line-height: 65px;
			text-align: right;
			.use {
				line-height: 24px;
				font-size: 12px;
				color: #ff7d28;
			}
			.num {
				color: #333333;
				font-size: 12px;
			}
			.sell {
				color: #666666;
				font-size: 12px;
			}
		}
		.line {
			width: 264px;
			height: 1px;
			background-color: #DEDEDE;
			margin: 6px 0 10px 0;
		}
		.rec-bottom {
			display: flex;
			justify-content: flex-end;
			botton {
				width: 80px;
				height: 33px;
				border: 1px solid #999999;
				border-radius: 17px;
				line-height: 33px;
				text-align: center;
				color: #666666;
				font-size: 14px;
				display: block;
				margin-right: 12px;
				&:nth-last-child(1) {
					margin-right: 0;
					background-color: #ff7d28;
					border: 1px solid #ff7d28;
					color: #fff;
				}
			}
		}
	}
</style>