<template>
	<div style="width: 100%;">
		<div class="cate centered">
			<div v-for="(item , index) in cate" class="cate-li">
				<div class="img"><img :src="item.image" /></div>
				<div class="name">{{item.name}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				//				indicatorDots: true,			
				//				autoplay: true,
				//				interval: 3000,
				//				duration: 500
				cate: [{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
					{
						name: "火锅",
						image: "/static/images/down_icon_ff.png"
					},
				],
			}
		},

		components: {

		},

		methods: {

		},

		created() {
			// 调用应用实例的方法获取全局数据
		}
	}
</script> 

<style scoped lang="less">
	/*字体图标*/
	@font-face {
		font-family: 'iconfont';
		/* project id 977189 */
		src: url('//at.alicdn.com/t/font_977189_gjvgj44cte.eot');
		src: url('//at.alicdn.com/t/font_977189_gjvgj44cte.eot?#iefix') format('embedded-opentype'), url('//at.alicdn.com/t/font_977189_gjvgj44cte.woff') format('woff'), url('//at.alicdn.com/t/font_977189_gjvgj44cte.ttf') format('truetype'), url('//at.alicdn.com/t/font_977189_gjvgj44cte.svg#iconfont') format('svg');
	}
	/*公共居中*/
	.centered {
		width: 350px;
		margin: 0 auto; 
	}
	/*类目*/
.cate{
		display: flex;justify-content: space-around; flex-wrap:wrap;
	.cate-li{
		    width: 70px;
		.img{
			width: 25px;height: 25px;
			img{width: 100%;height: 100%;}
		}
		.name{
			font-size: 12px;color: #666666;
		}
	}
}
</style>