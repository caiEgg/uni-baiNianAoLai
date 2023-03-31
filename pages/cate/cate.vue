<template>
	<view class="">
		<my-search :bgColor="'#C00000'" :radius="30" @goToSearch="goToSearch"></my-search>
		<view class="cateContainer" id="view1" :style="'height:'+scrollHL +'px'">
			<scroll-view scroll-y class="scrollContainer">
				<view class="scroll-view-item" v-for="cate,cateIndex in cateGoryList" :key="cate.cat_id">
					<view class="itemLeft" @click="changeCateIndex(cateIndex)"
						:class="{backgroundColor:cateIndex == cateIndexData}">
						<span :class="{borderLeftRed:cateIndex == cateIndexData }">{{cate.cat_name}}</span>
					</view>

				</view>
			</scroll-view>

			<scroll-view scroll-y class="rightContainer" :scroll-top="scrollViewTop">
				<view  class="rightItem" v-for="rightItem,rightItemIndex in cateGoryList[cateIndexData].children"
					:key="rightItem.cat_id">
					<view class="rightTop">
						/{{rightItem.cat_name}}/
					</view>
					<view class="right-bottom">
						<view class="bottomItem" v-for="bottomItem,bottemItemIndex in rightItem.children"
							:key="bottomItem.cat_id" @click="goGoodsLisSubPackage(bottomItem)">
							<image :src="bottomItem.cat_icon"></image>
							<view class="bottomText">
								{{bottomItem.cat_name}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>


		</view>
	</view>





</template>

<script>
	export default {
		data() {
			return {
				cateGoryList: [{}],
				cateIndexData: 0,
				scrollHL: 0,
				scrollViewTop: 0
			};
		},
		onLoad(){
			this.getCategories()			
		},
		onReady() {
			
			// 动态绑定滚动条的高度
			// 先取出页面的高度				
			let pageHeight = uni.getSystemInfoSync().windowHeight
			// 用selector
			let query = uni.createSelectorQuery().in(this)
			query.select('#view1').boundingClientRect()
			var that = this;
			query.exec(function(res) {				
				let topHeight = res[0].top;				
				// 滑动滚动条的高度等于整个页面的高度 - 页面距离上面的高度
				let scrooViewHeight = pageHeight - topHeight;
				// 保存到高度信息当中。
				that.scrollHL = scrooViewHeight
			})
			// 这是px单位。 rpx是px的2倍
		},
		methods: {
			async getCategories() {
				let result = await uni.$http.getCategories()
				if (result != null) {
					this.cateGoryList = result
				}
			},
			changeCateIndex(cateIndex) {
				this.cateIndexData = cateIndex
				// 点击左侧导航时，右侧滚动条回到顶部
				this.scrollViewTop = this.scrollViewTop == 0 ? 0.1 : 0
			},
			goGoodsLisSubPackage(bottomItem) {
				uni.navigateTo({
					url: '/subPackage/goods_list/goods_list?catId=' + bottomItem.cat_id

				})
			},
			goToSearch() {
				uni.navigateTo({
					url:'/subPackage/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.backgroundColor {
		background-color: #FFFFFF !important;
	}

	.borderLeftRed {
		border-left: 2px solid red;
	}

	.cateContainer {
		display: flex;
	}

	.itemLeft {
		display: flex;
		width: 180rpx;
		height: 115rpx;
		background-color: #F8F6F8;

		span {
			font-size: 26rpx;
			justify-content: center;
			width: 100%;
			display: block;
			height: 75rpx;
			line-height: 75rpx;
			margin: auto 0;
			text-align: center;
		}
	}

	.rightItem {
		width: 580rpx;
		background-color: #FFFFFF;

		.rightTop {
			background-color: antiquewhite;
			width: 580rpx;
			text-align: center;
			font-size: 30rpx;
			font-weight: bold;
			background-color: #FFFFFF;
			height: 100rpx;
			line-height: 100rpx;
		}

		.right-bottom {
			width: 580rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.bottomItem {
				width: 32%;
				margin-bottom: 10rpx;

				image {
					width: 145rpx;
					height: 135rpx;
					margin: 0 10rpx;
				}

				.bottomText {
					font-size: 26rpx;
					text-align: center;

				}
			}
		}
	}
</style>
