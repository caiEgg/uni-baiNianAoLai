<template>
	<view>
		<view class="goodItem" >
			<view class="imageLeft">
				<image :src="good.goods_small_logo ||defaultPic"></image>
			</view>
		
			<view class="goodRight">
				<view class="name">{{good.goods_name}}</view>
				<text class="price">￥{{good.goods_price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-good",
		data() {
			return {
				defaultPic:'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000611474169_1_400x400.jpg'
			};
		},
		props:{
			good:{
				type:Object,
				default:{}
			}
		}
	}
</script>

<style lang="scss">
.goodItem {
		height: 115px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin:10rpx;
		border-bottom: 1px solid #efefef;
		.imageLeft {
			width: 300rpx;
			height: 115px;
			overflow: hidden;
			image {
				width:  98%;
				height:  98%;
			}
		}
		.goodRight {	
			padding-top: 20rpx;
			padding-left: 15rpx;
			width: 600rpx;
			height: 115px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;			
			.name {
				font-size: 26rpx;				
			}
			.price {
				font-size: 35rpx;
				color: #C00000;	
				margin-bottom: 30rpx;
				
			}
		}

	}
</style>