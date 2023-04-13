<template>
	<view>
		<view class="scrollContainer">
			<view v-for="good,goodIndex in goodsList" :key="goodIndex" @click="goDetail(good)">
				<my-good :good="good"></my-good>
			</view>
			
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: 0,
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isLoading:false
			};
		},
		onLoad(options) {
			this.queryObj.cid = options.cid || ''
			this.queryObj.query = options.goods_name || ''
			console.log(this.queryObj, '参数')
			this.getSearchList()
		},
		methods: {
			async getSearchList(callback) {
				this.isLoading = true
				let result = await uni.$http.getSearchList(this.queryObj)
				if (result != null) {
					this.goodsList = [...this.goodsList,...result.goods]
					this.total = 30
				}
				this.isLoading = false
					
				if(callback){
					callback()
				}				
			},
			goDetail(good){
				uni.navigateTo({
					url:'/subPackage/goods_detail/goods_detail?goods_id='+good.goods_id
				})
			}
		},
		onReachBottom(){
			if(this.total/this.queryObj.pagesize <= this.queryObj.pagenum){
				uni.showToast({
					title:"数据加载完成啦"
				})
				return
			}
			if(this.isLoading ==true) return
			this.queryObj.pagenum ++
			this.getSearchList()
			
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.goodsList = []
			this.isLoading = false
			this.getSearchList(()=>{uni.stopPullDownRefresh()})
		}
	}
</script>

<style lang="scss">
	.scrollContainer {
		position: absolute;
		width: 100%;
		background-color: #ffffff;
	}
	
</style>