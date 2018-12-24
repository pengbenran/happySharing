<template>
	<div style="width: 100%;">
		<!--搜索-->
		<Search></Search>
		<!--轮播-->
		<Banner></Banner>
		<!--类目-->
	</div>
</template>

<script> 
	import Search from '@/components/search'
	import Banner from '@/components/banner'
	export default {
		data() {
			return {
                productlist:[

                ]
			}
		},

		components: {
			Search,
			Banner
		},

		methods: {

		},

		created() {
			// 调用应用实例的方法获取全局数据

		}
	}
</script>

<style scoped lang="less">

</style>