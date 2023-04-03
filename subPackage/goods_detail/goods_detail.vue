<template>
	<view class="container" v-if="goodDetail.goods_price !==undefined">
		<swiper class="swiper" :circular="true" :indicator-dots="true" :autoplay="true" :interval="2000"
			:duration="1000">
			<swiper-item v-for="pic,picIndex in goodDetail.pics" :key="picIndex">
				<image class="swiper-item" :src="pic.pics_big" @click="previewImage(picIndex)"></image>
			</swiper-item>
		</swiper>

		<view class="titleContainer">
			<view class="price">
				￥{{goodDetail.goods_price}}
			</view>
			<view class="title">
				<view class="titleLeftText">
					{{goodDetail.goods_name}}
				</view>
				<view class="collect">
					<uni-icons type="star" size="23"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="free">
				快递：免运费
			</view>
		</view>
		
		<view class="uni-common-mt" style="background:#FFF; padding:20rpx;">
			<rich-text :nodes="strings"></rich-text>
		</view>
		<view class="navContainer">
			<uni-goods-nav  :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
		
		<!-- <view class="navContainer">
			<view class="iconsContainer">
				<view class="iconsItem">
					<uni-icons type="shop" size="23" color="darkgray"></uni-icons>
					<text>店铺</text>
				</view>
				<view class="iconsItem">
					<uni-icons type="cart" size="23" color="darkgray"></uni-icons>
					<text>购物车</text>
				</view>
			</view>
			<view class="rightContainer">
				<view class="add">
					加入购物车
				</view>
				<view class="buy">
					立即购买
				</view>
			</view>
		</view> -->

	</view>
</template>

<script>
	export default {

		data() {
			return {
				goods_id: 0,
				goodDetail: {},
				picsList: [], //轮播图预览
				strings: '', //这是详情页面的富文本
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			this.goods_id = options.goods_id
			this.getGoodsDetail()

		},
		methods: {
			onClick(e) {
				if(e.content.text =="购物车"){
					uni.switchTab({
						url:'/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				
			},
			async getGoodsDetail() {
				let result = await uni.$http.getGoodsDetail(this.goods_id)
				if (result != null) {
					this.goodDetail = result
				}
				//获取当前页面的轮播图数据
				// for(var i = 0; i< this.goodDetail.pics.length; i ++){
				// 	this.picsList.push(this.goodDetail.pics[i].pics_big_url)
				// }
				this.picsList = this.goodDetail.pics.map(function(pic) {
					return pic.pics_big_url
				})
				//去掉图片之间的间隙：display:block
				this.strings = this.goodDetail.goods_introduce.replace(/<img/gi, '<img style="display:block;"');
				this.strings = this.strings.replace(/webp/gi, 'jpg');
			},
			previewImage(index) {
				//uniapp预览轮播图
				uni.previewImage({
					current: index, //预览图片的下标
					urls: this.picsList //预览图片的地址，必须要数组形式，如果不是数组形式就转换成数组形式就可以
				})


			}

		}
	}
</script>

<style lang="scss">
	.container {
		position: absolute;
		width: 100%;
		background-color: #ffffff;
	}

	.swiper {
		height: 750rpx;

		.swiper-item {
			width: 100%;
			height: 100%;
		}
	}

	.titleContainer {
		padding: 30rpx 20rpx;
		
		.price {
			color: #C00000;
			font-size: 38rpx;
		}

		.title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 0;

			.titleLeftText {
				font-size: 30rpx;
			}

			.collect {
				width: 120rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				color: darkgray;
				font-size: 25rpx;
				border-left: 1rpx solid #efefef;
			}
		}

		.free {
			color: darkgray;
			font-size: 25rpx;
		}
	}
	.uni-common-mt{
		margin-bottom: 80rpx;
	}
	.navContainer{
		position: fixed;
		bottom: 0;
		width: 740rpx;
	}
	// .navContainer {
	// 	width: 715rpx;
	// 	background-color: #ffffff;
	// 	padding: 10rpx 15rpx;
	// 	display: flex;
	// 	justify-content: space-between;
	// 	align-items: center;
	// 	position: fixed;
	// 	bottom: 0;

	// 	.iconsContainer {
	// 		height: 80rpx;
	// 		width: 200rpx;
	// 		display: flex;
	// 		justify-content: space-around;
	// 		align-items: center;

	// 		.iconsItem {
	// 			display: flex;
	// 			flex-direction: column;
	// 			justify-content: center;
	// 			align-items: center;
	// 			color: darkgray;
	// 			font-size: 25rpx;
	// 		}
	// 	}

	// 	.rightContainer {
	// 		display: flex;
	// 		justify-content: space-between;
	// 		align-items: center;

	// 		.add {
	// 			width: 250rpx;
	// 			background-color: red;
	// 			color: white;
	// 			font-size: 26rpx;
	// 			height: 80rpx;
	// 			text-align: center;
	// 			line-height: 80rpx;
	// 			border-radius: 100px 0 0 100px;
	// 		}

	// 		.buy {
	// 			width: 250rpx;
	// 			background-color: orange;
	// 			color: white;
	// 			font-size: 26rpx;
	// 			height: 80rpx;
	// 			text-align: center;
	// 			line-height: 80rpx;
	// 			border-radius: 0 100px 100px 0;
	// 		}
	// 	}
	// }
</style>