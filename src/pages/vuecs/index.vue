<template>
	<div>
		千米 : <input type="text" v-model="kilometers"> 米 : <input type="text" v-model="meters">
	</div>
</template>

<script>
	export default {
		data() {
			return {
				kilometers: 0,
				meters: 0
			}
		},

		components: {

		},

		methods: {

		},
		created() {
			// 调用应用实例的方法获取全局数据
		},
		watch: {
			kilometers: function(val) {
//				this.kilometers = val;
//				this.meters = val * 1000;
				console.log(val)
			},
			meters: function(val) {
				this.kilometers = val / 1000;
				this.meters = val;
			}
		}
	}
</script>

<style scoped>
	.class1 {
		background: #444;
		color: #eee;
	}
</style>