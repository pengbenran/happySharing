<template>
	<div id="app">
		<div>名字： <input type="text" v-model="aaa.name"/> </div>
		<div v-for="(item,index) in bbb">{{item.name}}</div>
		
		<button @click="add()">an</button>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				aaa:{name:""},
				bbb:[
				   {name:"游萧明"},
				   {name:"游萧明"}
				]
				
			}
		},

		components: {

		},

		methods: {
			add(){
				this.aaa.push(this.bbb)
			}
		},
		created() {
			// 调用应用实例的方法获取全局数据
		},

	}
</script>

<style scoped>
	
</style>