<template>
	<div>
		<div class="time" @click="Times">
			还剩  <span>{{d}}</span> 天  <span>{{h}}</span> : <span>{{m}}</span> : <span>{{s}}</span> 开始
		</div>
	</div>
</template>

<script>
	export default { 
		data() {
			return {
				d: null,
				h: null,
				m: null,
				s: null,
			}
		},
		methods: {
			Times: function(d, h, m, s) {
				//获取当前时间
				var date = new Date();
				var now = date.getTime();
				//设置截止时间
				var endDate = new Date("2018-12-27 16:50:00");
				var end = endDate.getTime();
				//时间差
				var leftTime = end - now;
				//定义变量 d,h,m,s保存倒计时的时间 
				if(leftTime >= 0) {
					this.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
					this.h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
					this.m = Math.floor(leftTime / 1000 / 60 % 60);
					this.s = Math.floor(leftTime / 1000 % 60);
				}
				d = this.d
				h = this.d
				m = this.d
				s = this.d
				//递归每秒调用countTime方法，显示动态时间效果
				setTimeout(this.Times, 1000);
			}
		},
	}
</script>

<style scoped lang="less">
.time{
	position: absolute;left: 0;top: 0px;
	width: 188px;height: 20px;
	border-top-right-radius: 10px ;
	border-top-left-radius:10px;
	border-bottom-right-radius:10px;
	background: linear-gradient(to right, #659fff , #32a1ff);
	font-size: 12px;text-align: center;
	line-height: 20px;color: #ffffff;
}
</style>