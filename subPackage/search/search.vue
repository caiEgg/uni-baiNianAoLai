<template>
	<view class="allContent">
		<view class="inputContainer"> <!--自动获取焦点-->
			<uni-search-bar placeholder="请输入搜索内容" radius="20" cancelButton="none" @input="searchValue"
				focus="true"></uni-search-bar>
		</view>
		<view class="searchHistory" v-if="InputList==null ">
			<view class="searchTop">
				<text>搜索历史</text>
				<uni-icons type="trash" size="18" @click="clearStorage"></uni-icons>
			</view>
			<view class="historyList">
				<view class="history" v-for="keywordItem,index in reverse" :key="index">
					<text @click="goDetail(keywordItem)">{{keywordItem}}</text>
				</view>
			</view>
		</view>

		<scroll-view class="searchListContainer" scroll-y v-if="InputList">
			<view class="searchItem" v-for="inputItem,inputIndex in InputList" :key="inputItem.goods_id"
				@click="goGoodsDetail(inputItem.goods_id)">
				<view class="text">
					{{inputItem.goods_name}}
				</view>
				<span>></span>
			</view>

		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				InputList: null,
				timer: null,
				keyWord: '',
				keywordList: [],
				reverse: [],
				
			};
		},
		onLoad() {

			try {
				const value = uni.getStorageSync('keywordList');
				if (value) {
					this.keywordList = value
					this.reverse = [...this.keywordList].reverse()
				}
			} catch (e) {
				this.keywordList = []
			}
		},
		methods: {
			searchValue(value) {
				
				if (this.timer != null) {
					clearTimeout(this.timer)
				}
				// 清除了延时器，所以让之前的不会触发、只有等到不再输入的时候，才会不清除，才会触发。
				this.timer = setTimeout(() => {
					
					this.keyWord = value
					if (this.keyWord == '') {
		
						// 展示一下搜索记录
						this.InputList = null
						
					} else {
						// 发请求展示商品列表
						this.getInputList()
						var flag = true
						// 如果有重复的，先删除再添加
						for (var i = 0; i < this.keywordList.length; i++) {
							if (this.keyWord == this.keywordList[i]) {
								flag = false
								this.keywordList.splice(i, 1)
								this.keywordList.push(this.keyWord)
								break;
							}
						}
						// 没有重复的，直接添加
						if (flag == true) {
							this.keywordList.push(this.keyWord)
						}
						// 倒序时用新数组，才不会影响到原数组
						this.reverse = [...this.keywordList].reverse()

						uni.setStorage({
							key: 'keywordList',
							data: this.keywordList
						})
					}
				}, 500)
			},
			async getInputList() {
				let result = await uni.$http.getInputList(this.keyWord)
				if (result != null) {
					this.InputList = result
				}
			},
			goGoodsDetail(goods_id) {
				uni.navigateTo({
					url: '/subPackage/goods_list/goods_list?goods_id=' + goods_id
				})
			},
				
			clearStorage(){
					uni.removeStorageSync('keywordList');
					this.keywordList = []
					this.reverse = []
				
			},
			goDetail(keywordItem){
				uni.navigateTo({
					url: '/subPackage/goods_list/goods_list?goods_name=' + keywordItem
				})
			}
		},
		
	}
</script>

<style lang="scss">
	.allContent {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #ffffff;
	}

	.inputContainer {
		padding: 5rpx;
		height: 50px;
		background-color: #C00000;
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.searchListContainer {
		.searchItem {
			height: 45px;
			margin: 0 20rpx;
			border-bottom: 1px solid #efefef;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.text {
				font-size: 28rpx;
				max-width: 95%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

			span {
				font-size: 18px;
				color: dimgray;
			}
		}
	}

	.searchHistory {
		.searchTop {
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin: 0 10rpx;
			border-bottom: 1px solid #efefef;

			text {
				font-size: 28rpx;
			}
		}
	}

	.historyList {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

		.history {
			height: 80rpx;
			background-color: #efefef;
			margin: 10rpx 10rpx;
			line-height: 80rpx;
			text-align: center;
			padding: 0 10rpx;
			font-size: 28rpx;
		}
	}
</style>