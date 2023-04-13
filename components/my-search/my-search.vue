<template>
	<view class="inputContainer" :style="{backgroundColor:bgColor,}" @click="handle">
		<view class="my-search-box" :style="{borderRadius:radius+'px'}">
			
				<uni-icons type="search" size="18"></uni-icons>
				<text class="text">搜索</text>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		name: "my-search",
		props: {
			bgColor: {
				type: String,
				default: '#C00000'
			},
			radius: {
				type: Number,
				default: 30
			}
		},
		methods:{
			handle(){
				this.$emit('goToSearch')
			}
		}
		
	}
</script>

<style lang="scss">
	::v-deep.inputContainer {
		padding: 15rpx 30rpx;
		position: sticky;
		top: 0;
		height: 65rpx;
	}

	::v-deep.my-search-box {
		display: flex;
		justify-content: center;
		align-items: center;
		width:100%;
		height: 65rpx;
		background-color: #FFFFFF;
		
		.text {
			font-size: 30rpx;
			margin-left: 20rpx;
		}
	}
</style>
