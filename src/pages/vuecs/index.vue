<template>
	<div>
		<input type="text" placeholder="请输入..." v-model="searchVal">
		<ul>
			<li v-for="(item,index) in items	" :key="index" :value="item.value" v-text="item.name"></li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: "HelloWorld",
		data() {
			return {
				searchVal: "",
				items: [{
						name: "上海",
						value: "sh"
					},
					{
						name: "北京",
						value: "bj"
					},
					{
						name: "重庆",
						value: "cq"
					},
					{
						name: "嗨嗨嗨",
						value: "hhh"
					},
					{
						name: "海上",
						value: "hs"
					},
					{
						name: "京都",
						value: "jd"
					}
				]
			};
		},
		methods: {},
		computed: {
			NewItems() {
				var _this = this;
				var NewItems = [];	
				this.items.map(function(item) {
					if(item.name.search(_this.searchVal) != -1) {
						NewItems.push(item);
					}
				});
				return NewItems;
			}
		}
	};
</script>