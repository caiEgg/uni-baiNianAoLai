<template>
	<view class="addressContainer">
		<view class="chooseButton">
			请选择收货地址+
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},
		props:{
			addressInfo:{
				type:Object,
				default:{}
			}
		}
	}
</script>

<style lang="scss">
.addressContainer{
	width: 100%;
	height: 250rpx;
	background-color: red;
	.chooseButton{
		height: 80rpx;
		background-color: green;
	}
}
</style>