<template>
	<div>
		<div class="time">还剩 <span>{{d}}</span>天 <span>{{h}}</span> : <span>{{m}}</span> : <span>{{s}}</span> 开始</div>
	</div>
</template>

<script>
	export default {
		props: ['d','h','m','s'],
		data() {
			return {
				d: 0,
				h: 0,
				m: 0,
				s: 0,
			}
		},
		methods: {
	
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