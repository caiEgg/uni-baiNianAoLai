<template>
	<view>
		<view class="searchTop">
			<my-search @goToSearch="goToSearch"></my-search>
		</view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="swiper in swiperList" :key="swiper.goods_id">
				<navigator class="swiper-item" :url="'/subPackage/goods_detail/goods_detail?good_id='+ swiper.goods_id">
					<image :src="swiper.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航 -->
		<view class="navContainer">
			<view class="navItem" v-for="nav,navIndex in navList" :key=navIndex @click="goCatePage(nav)">
				<image :src="nav.image_src"></image>
			</view>
		</view>
		<!-- 楼层渲染 -->
		<view class="floorList" v-for="floor,floorIndex in floorList" :key="floorIndex">
			<image class="floorTitle" :src="floor.floor_title.image_src"></image>
			<view class="productList">
				<!-- 左边大图 -->
					<navigator class="productItemLeft" :url="floor.product_list[0].navigator_url"> 
						<image :src="floor.product_list[0].image_src" :style="{'width':floor.product_list[0].image_width + 'rpx'}" mode="widthFix" ></image>
					</navigator>
					<!-- 右边小图 -->
					<view class="productItemRight" >
						<navigator class="productItemRightItem" v-for="product,index in floor.product_list" v-if="index!==0" :url="product.navigator_url">
							<image :src="product.image_src" :style="{'width':product.image_width + 'rpx'}" mode="widthFix" ></image>
						</navigator>						
					</view>				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [{
					
				}],
				navList: [{
					
				}],
				floorList: [{
					
				}]
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getfloordata()
		},
		methods: {
			async getSwiperList() {
				let result = await uni.$http.getSwiperList()
				if (result != null) {
					this.swiperList = result
				}
			},
			async getNavList() {
				let result = await uni.$http.getCatitems()
				if (result != null) {					
					this.navList = result
				}
			},
			goCatePage(nav) {
				if (nav.name == "分类") {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			async getfloordata() {
				let result = await uni.$http.getfloordata()
				if (result != null) {
					result.forEach((floor)=>{
						floor.product_list.forEach((product)=>{
							product.navigator_url = "/subPackage/goods_list/goods_list?" + product.navigator_url.split('?')[1]
						})
					})
					
					this.floorList = result
					
				}
			},
			goToSearch(){
				uni.navigateTo({
					url:'/subPackage/search/search'
				})
			}

		}
	}
</script>

<style lang="scss">
	.searchTop{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}
    // 分类导航
	.navContainer {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.navItem {
			image {
				width: 128rpx;
				height: 140rpx;
			}
		}
	}
	// 楼层渲染
	.floorList{
		padding-left:10rpx;
		.floorTitle{
			height: 60rpx;			
		}
		.productList{			
				display: flex;
				justify-content:space-between;
				// 右边小图
				.productItemRight{
					display: flex;
					// 分散对齐
					justify-content: space-around;
					flex-wrap: wrap;										
				}
			
		}
		
	}
</style>
