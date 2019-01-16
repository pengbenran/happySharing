<template>
	<div class="make">
		<div class="myself-make">
			<div class="head">
			    <div class="img"><img :src="head.img"/></div>
			    <div class="cant">
			    	<span>{{head.name}}</span>
			    	<span>{{head.pai}}</span>
			    </div>
			</div>
			<div class="invite">邀你加入一起嗨翻</div>
			<div class="code"><img :src="code"/></div>
			<div class="flicking">使用微信扫一扫</div>
			<div class="momoda">【抹哒抹哒】小程序</div>
		</div>
		<div class="btn">保存图片</div> 
		<div class="rule"><span>了解规则</span></div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				head:{
					img:"/static/images/head.png", 
					name:"bobo",
					pai:"金牌推荐师"
				},
				code:"/static/images/code.png",
			};
		},
		methods: {},
		computed: {}
	};
</script>
<style lang="less">
	.make{
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #007bf9;
		.myself-make{
			width: 290px;
			background-color: #fff;
			margin:  20px auto 0 auto;
			padding-bottom: 20px;
		 .head{
		 	padding-top: 18px;
		 	.img{
		 		width: 58px;
		 		height: 58px;
		 		border-radius: 50%;
		 		overflow: hidden;
		 		margin:  0 auto;
		 	}
		 	.cant{
		 		text-align: center;
		 			padding: 14px 0;
		 			
		 		span{
		 			color: #007bf9;
		 			font-size: 15px;
		 		    &:nth-child(1){
		 		    	margin-right: 5px;
		 		    }
		 			
		 		}
		 	}
		 	
		 }	
		 .invite{ 
		 		text-align: center;
		 		color: #ff0000;
		 		font-size: 29px;
		 		
		 	}
		  .code{
		 	 width: 140px;
		 	 height: 140px;
		 	 border:8px solid #007bf9 ;
		 	 margin: 0 auto;
		 	 border-radius: 3px;
		 	 margin-top: 16px;
		  }
		  .flicking{
		  	text-align: center;
		  	font-size: 15px;
		  	color: #007bf9;	
		  	padding: 15px 0;	  	
		  }
		  .momoda{
		  	width: 185px;
		  	height: 26px;
		  	background-color: #ff0000;
		  	text-align: center;
		  	margin:  0 auto;
		  	line-height: 26px;
		  	font-size: 18px;
		  	color: #fff;
		  	border-radius: 3px;
		  }
		}
		.btn{
			margin-top: 30px;
			width: 290px;
			height: 49px;
			line-height: 49px;
			text-align: center;
			margin:  30px auto 0 auto;
			color: #ff0000;
			font-size: 16px;
			background-color: #fff100;
			border-radius: 3px;
		}
		.rule{
			font-size: 16px;				
			text-align: center;
			margin-top: 30px;
			span{
				border-bottom: 1px solid #FFFFFF;
					color: #ffffff;	
			}
		}
	}
</style>