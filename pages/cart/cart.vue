<template>
	<view class="cartContainer">

		<view class="cartTitle">
			<uni-icons class="" type="shop" size="20"></uni-icons>
			<text class="text">购物车</text>
		</view>
		<view class="cartList">
			<uni-swipe-action>
				<uni-swipe-action-item v-for="goodDetail,goodIndex in cart" :key="goodDetail.goods_id"
					:right-options="options2" :auto-close="false" @click="deleteGoodDetail(goodDetail)">
					<view class="cartItem">
						<view class="checkLeft">
							<checkbox-group>
								<label>
									<!-- class="checkbox-backgroun-red checkbox-round" -->
									<checkbox style="transform:scale(0.8);" class="checkbox-background-red checkbox-round"  
										:checked="goodDetail.goods_state" color="#FFFFFF"
										@click="changeState(goodDetail,$event)"  />
								</label>
							</checkbox-group>

						</view>
						<view class="imageMiddle">
							<image :src="goodDetail.goods_small_logo"></image>
						</view>
						<view class="detailRight">
							<view class="detailTitle">
								{{goodDetail.goods_name}}
							</view>
							<view class="detailBottom">
								<view class="detailPrice">
									￥{{goodDetail.goods_price}}
								</view>
								<view class="detailNum">
									<view class="numItem" @click="changeCount('subtraction',goodDetail)"
										:class="{'disableClass':goodDetail.goods_count == 1}">
										-
									</view>
									<input class="numItem numItem2" type="text" v-model="goodDetail.goods_count"
										@blur="changeCount(goodDetail.goods_count,goodDetail)">
									<view class="numItem" @click="changeCount('add',goodDetail)">
										+
									</view>
								</view>
							</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<view class="total">
			<view class="allCheck">
				<checkbox-group>
					<label>
						<checkbox class="checkbox-background-red checkbox-round" :checked="allCheck" color="#FFFFFF"
							style="transform:scale(0.8)" @click="changeAllState" />全选
					</label>

				</checkbox-group>

			</view>
			<view class="totalNum">
				合计:<text>￥{{totalPrice}}</text>
			</view>
			<view class="payButton">
				结算
			</view>
		</view>



	</view>
</template>

<script>
	import mixin from '../../utils/mixin.js'

	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		mixins: [mixin],
		data() {
			return {
				options2: [{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}]
			};
		},
		mounted() {

		},
		computed: {
			...mapState('cartStore', ['cart']),
			...mapGetters('cartStore', ['totalPrice']),
			allCheck() {
				var allCheck = true;
				this.cart.find(function(currenValue, index, arr) {
					if (currenValue.goods_state == false) {
						allCheck = false
						return
					}
				})
				return allCheck
			}
		},
		methods: {
			...mapMutations('cartStore', ['changeGoodState', 'changeGoodCount', 'changeAllGoodsState', 'deleteGood']),
			changeState(goodDetail,$event) {
				this.changeGoodState(goodDetail)
				console.log($event.target.children )
				
			},
			changeCount(value, goodDetail) {
				let count = goodDetail.goods_count
				// 减1
				if (value == 'subtraction') {
					count--
				} else if (value == 'add') {
					// 加1
					count++
				} else {
					// 判断是不是正整数，不是的话都改成1
					if ((/(^[1-9]\d*$)/.test(value))) {
						count = value
					} else {
						count = 1
					}
				}
				let data = {
					goodDetail,
					count
				}
				this.changeGoodCount(data)
			},
			// 全选/全不选
			changeAllState() {
				this.changeAllGoodsState(!this.allCheck)
			},
			// 购物车删除产品
			deleteGoodDetail(goodDetail) {
				this.deleteGood(goodDetail)
			},
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #ffffff;
	}
	.uni-checkbox-input{
	    background-color: #C00000 !important;
	    border-color: #C00000 !important;
	    color: #ffffff !important;
	}
	.disableClass {
		color: gray;
		pointer-events: none;
	}

	.cartContainer {
		width: 100%;
	}

	.cartTitle {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin: 0 10rpx;
		height: 80rpx;
		border-bottom: 1px solid #efefef;

		.text {
			font-size: 28rpx;
			margin-left: 15rpx;
		}
	}

	.cartList {
		top: 80rpx;
		position: absolute;
		bottom: 78rpx;
		overflow: auto;
	}

	.cartItem {
		height: 200rpx;
		margin: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #efefef;

		.checkLeft {
			height: 60rpx;
		}

		.imageMiddle {
			width: 200rpx;
			height: 100%;

			image {
				width: 98%;
				height: 98%;
			}
		}

		.detailRight {
			height: 98%;
			width: 470rpx;
			padding-left: 10rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.detailTitle {
				font-size: 26rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				height: 120rpx;
			}

			.detailBottom {
				font-size: 32rpx;
				height: 60rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 10rpx;

				.detailPrice {
					color: #C00000;
				}

				.detailNum {
					height: 60rpx;
					width: 210rpx;
					display: flex;
					justify-content: flex-start;
					border: 1px solid #efefef;

					.numItem {
						background-color: #efefef;
						width: 70rpx;
						height: 60rpx;
						line-height: 60rpx;
						text-align: center;


					}

					.numItem2 {
						background-color: #ffffff;
					}
				}
			}
		}
	}

	.total {
		z-index: 999;
		margin: 0 10rpx;
		background-color: #ffffff;
		height: 80rpx;
		position: fixed;
		bottom: 0;
		width: 98%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;

		.allCheck {}

		.totalNum {
			text {
				color: #C00000;
			}
		}

		.payButton {
			background-color: #C00000;
			width: 200rpx;
			height: 100%;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
		}
	}
</style>