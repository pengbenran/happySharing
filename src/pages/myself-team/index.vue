<template>
	<div>
		<!--头部-->
		<!--<div class="teams">
			<div class="img"><img src="/static/images/head.png" /></div>
			<div class="inp"><span class="iconfont">&#xe60b;</span><span>查找队友</span></div>
			<div class="jia">＋</div>
		</div>-->
		<!--头像-->
		<div class="myself-head">
			<div class="img"><img :src="userInfo.face" /></div>
			<div class="cant">
				<span>{{userInfo.name}}</span>
				<span>ID : {{userInfo.id}}</span>
			</div>

		</div>
		<!--切换-->
		<div class="switchs">
			<div class="switchs-li" v-for="item in switchs">
				<span @click="tab(index)" :class="index===curr?'on':''">{{item.tab}}</span>
			</div>
		</div>
		<!--会员队友-->
		<div class="tamemate" v-if="isO">
			<div class="tamemate-li">
				<div class="tamemate-tit clr" @click="showTotal">
					<span :class=" isIocn?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span class="iconfont fl">&#xeb2b;</span>
					<span class="fl">全部会员</span>
					<span class="fr">{{memberCount}}人</span>
				</div>
				<div class="data" v-if="isTotal">
					<div class="data-li clr" v-for="(item1,index) in totaList">
						<div class="img fl"><img :src="item1.face" /></div>
						<div class="name fl">
							<span>{{item1.name}}</span>
							<span>消费金额： {{item1.consumeAmount}}</span>
						</div>
						<div class="day fr">{{item1.time}}</div>
					</div>
				</div>
			</div>

			<div class="tamemate-li" v-for="(memberLvitem,memberLvindex) in memberLvDOList" :key="memberLvitem.id" :index="memberLvindex">
				<div class="tamemate-tit clr" @click="showList(memberLvindex)">
					<span :class="memberLvitem.isSelect?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span class="iconfont fl">&#xe608;</span>
					<span class="fl">{{memberLvitem.name}}</span>
					<span class="fr">{{memberLvitem.lvCount}}人</span>
				</div>
				<div class="data">
					<div class="data-li clr" v-for="(item,index) in memberLvDOListLi" v-if="memberLvitem.isSelect">
						<div class="img fl"><img :src="item.face" /></div>
						<div class="name fl">
							<span>{{item.name}}</span>
							<span>消费金额：{{item.consumeAmount}}</span>
						</div>
						<div class="day fr">{{item.time}}</div>
					</div>
				</div>
			</div>

		</div>

		<!--推荐师队友-->
		<div class="tamemate" v-if="isR">
			<div class="tamemate-li">
				<div class="tamemate-tit clr" @click="showTotal1">
					<span :class="isIocn1?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span style="color: #2bc24b;" class="iconfont fl">&#xeb2b;</span>
					<span class="fl">全部推荐师</span>
					<span class="fr">{{distribeCount}}人</span>
				</div>
				<div class="data" v-if="isTotal1">
					<div class="data-li clr" v-for="(item1,index) in totaList1">
						<div class="img fl"><img :src="item1.face" /></div>
						<div class="name fl">
							<span>{{item1.name}}</span>
							<span>消费金额： {{item1.consumeAmount}}</span>
						</div>
						<div class="day fr">{{item1.time}}</div>
					</div>
				</div>
			</div>
			<div class="tamemate-li" v-for="(distribeLvitem,distribeLvindex) in distribeLvDOList" :key="distribeLvitem.id" :index="distribeLvindex">
				<div class="tamemate-tit clr" @click="showList1(distribeLvindex)">
					<span :class=" distribeLvitem.isSelect?'icon':''" class="iconfont fl">&#xe65c;</span>
					<span class="iconfont fl">&#xe608;</span>
					<span class="fl">{{distribeLvitem.name}}</span>
					<span class="fr">{{distribeLvitem.lvCount}}人</span>
				</div>
				<div class="data">
					<div class="data-li clr" v-for="(item,index) in distribeLvDOListLi" v-if="distribeLvitem.isSelect">
						<div class="img fl"><img :src="item.face" /></div>
						<div class="name fl">
							<span>{{item.name}}</span>
							<span>消费金额：{{item.consumeAmount}}</span>
						</div>
						<div class="day fr">{{item.time}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import Api from "@/api/distribe";
	import store from '@/store/store'
	export default {
		data() {
			return {
				isTotal: false,
				isIocn: false,
				isTotal1: false,
				isIocn1: false,
				isO: true,
				isR: false,
				diss: 0,
				curr: 0,
				aaa: [],
				distribeLvDOList: [],
				distribeCount: 0,
				distribeLvDOListLi: [],
				memberCount: 0,
				memberLvDOList: [],
				memberLvDOListLi: [],
				totaList: [],
				totaList1: [],
				config: {},
				userInfo: {},
				switchs: [{
						tab: "会员队友"
					},
					{
						tab: "推荐师队友"
					}
				]
			};
		},
		methods: {
			tab(index) {
				this.curr = index
				if(index == 0) {
					this.isO = true;
					this.isR = false;
				}
				if(index == 1) {
					this.isO = false;
					this.isR = true;
				}
			},
			//			点击显示 会员队友
			showTotal(index) {
				this.isTotal = !this.isTotal
				this.isIocn = !this.isIocn
				let that = this
				let params = {}
				//		        params.lvId=this.memberLvDOList[memberLvindex].lvId
				params.whetherDistribe = 0
				params.tjUnionid = that.userInfo.unionid
				params.query = {
					page: 0,
					limit: 4
				}
				Api.myTeamList(params).then(function(res) {
					that.userInfo = store.state.userInfo
					that.config = store.state.config
					that.totaList = res.rows
				})
			},
			showList(memberLvindex) {
				let that = this;
				that.memberLvDOList[memberLvindex].isSelect = !that.memberLvDOList[memberLvindex].isSelect
				this.diss = memberLvindex;
				let params = {};
				params.lvId = this.memberLvDOList[memberLvindex].lvId;
				params.tjUnionid = that.userInfo.unionid;
				params.whetherDistribe = 0
				params.query = {
					page: 0,
					limit: 4
				};
				Api.myTeamList(params).then(function(res) {
					that.userInfo = store.state.userInfo;
					that.config = store.state.config;
					that.memberLvDOListLi = res.rows;
					//			     console.log(res)
				})

			},

			//			点击显示 推荐师队友
			showTotal1(index) {
				this.isTotal1 = !this.isTotal1
				this.isIocn1 = !this.isIocn1
				let that = this
				let params = {}
				//            params.whetherDistribe=this.distribeLvDOList[distribeLvindex].id;
				params.column30 = 1
				params.tjUnionid = that.userInfo.unionid
				params.query = {
					page: 0,
					limit: 4
				}
				Api.myTeamList(params).then(function(res) {
					//			    console.log(res)
					that.userInfo = store.state.userInfo
					that.config = store.state.config
					that.totaList1 = res.rows
				})
			},
			showList1(distribeLvindex) {
				let that = this;
				that.distribeLvDOList[distribeLvindex].isSelect = !that.distribeLvDOList[distribeLvindex].isSelect
				this.diss = distribeLvindex;
				let params = {};
				params.whetherDistribe = !0
				params.whetherDistribe = this.distribeLvDOList[distribeLvindex].id;
				params.tjUnionid = that.userInfo.unionid;
				params.query = {
					page: 0,
					limit: 4
				};
				Api.myTeamList(params).then(function(res) {
					that.userInfo = store.state.userInfo;
					that.config = store.state.config;
					that.distribeLvDOListLi = res.rows;
				})

			},

		},
		async mounted() {
			let that = this
			let params = {}
			that.userInfo = store.state.userInfo
			params.unionid = that.userInfo.unionid
			Api.myTeamIndex(params).then(function(res) {
				if(res.code == 0) {
					res.data.distribeLvDOList.map(item => {
						item.isSelect = false
						return item
					})
					that.distribeLvDOList = res.data.distribeLvDOList
					that.distribeCount = res.data.distribeCount
					that.memberLvDOList = res.data.memberLvDOList
					that.memberCount = res.data.memberCount
				}
			})

		},

	};
</script>
<style lang="less">
	/*头部*/
	
	.myself-head {
		background-color: #32a1ff;
		display: flex;
		box-sizing: border-box;
		align-items: center;
		padding: 23px 0 23px 12px;
		.img {
			width: 58px;
			height: 58px;
			border-radius: 50%;
			overflow: hidden;
		}
		.cant {
			margin-left: 12px;
			span {
				display: block;
				&:nth-child(1) {
					color: #fff;
					font-size: 18px;
					width: 200px;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				&:nth-child(2) {
					color: #fff;
					font-size: 13px;
				}
			}
		}
		.service {
			span {
				display: block;
				text-align: center;
				margin-top: 2px;
				&:nth-child(1) {}
				&:nth-child(2) {
					font-size: 12px;
					color: #999999;
				}
			}
		}
	}
	/*切换*/
	
	.switchs {
		width: 100%;
		display: flex;
		border-bottom: 1px solid #DEDEDE;
		justify-content: space-between;
		.switchs-li {
			span {
				display: block;
				color: #666666;
				font-size: 14px;
				height: 47px;
				line-height: 47px;
			}
			&:nth-child(1) {
				span {
					margin-left: 65px;
				}
			}
			&:nth-child(2) {
				span {
					margin-right: 65px;
				}
			}
			.on {
				color: #32a1ff;
				border-bottom: 2px solid #32a1ff;
			}
		}
	}
	/*会员*/
	
	.tamemate {
		.tamemate-li {
			.tamemate-tit {
				width: 100%;
				height: 54px;
				padding: 0 20px 0 12px;
				box-sizing: border-box;
				line-height: 54px;
				span {
					display: block;
					&:nth-child(1) {
						color: #666666;
					}
					&:nth-child(2) {
						font-size: 30px;
						margin-left: 8px;
					}
					&:nth-child(3) {
						color: #111111;
						font-size: 14px;
						margin-left: 6px;
					}
					&:nth-child(4) {
						color: #999999;
						font-size: 12px;
					}
				}
				.icon {
					transform: rotate(90deg);
				}
			}
			&:nth-child(1) {
				.tamemate-tit {
					span {
						&:nth-child(2) {
							color: #0a81f9;
						}
					}
				}
			}
			&:nth-child(2) {
				.tamemate-tit {
					span {
						&:nth-child(2) {
							color: #ffa800;
						}
					}
				}
			}
			&:nth-child(3) {
				.tamemate-tit {
					span {
						&:nth-child(2) {
							color: #2b92fa;
						}
					}
				}
			}
			&:nth-child(4) {
				.tamemate-tit {
					span {
						&:nth-child(2) {
							color: #ff5959;
						}
					}
				}
			}
			.data {
				padding: 0px 20px 0px 12px;
				box-sizing: border-box;
				.data-li {
					padding: 12px 0;
					border-bottom: 1px solid #DEDEDE;
					.img {
						width: 44px;
						height: 44px;
						border-radius: 50%;
						overflow: hidden;
					}
					.name {
						margin-left: 11px;
						span {
							display: block;
							&:nth-child(1) {
								color: #111111;
								font-size: 16px;
							}
							&:nth-child(2) {
								color: #999999;
								font-size: 12px;
							}
						}
					}
					.day {
						color: #999999;
						font-size: 11px;
						line-height: 44px;
					}
				}
			}
		}
	}
</style>