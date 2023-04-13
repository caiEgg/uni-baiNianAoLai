<script>
	export default {
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
	/* 复选框 */
	/* 复选框-圆角 */
	/* #ifndef APP-NVUE */
	checkbox.checkbox-round .wx-checkbox-input,
	checkbox.checkbox-round .uni-checkbox-input {
	    border-radius: 100rpx;
	}
	// /* 复选框-背景颜色 */
	checkbox.checkbox-background-red[checked] .wx-checkbox-input,
	checkbox.checkbox-background-red.checked .uni-checkbox-input{
	    background-color: #C00000 !important;
	    border-color: #C00000 !important;
	    color: #ffffff !important;
	}
	/* #endif */
	uni-checkbox .uni-checkbox-wrapper .uni-checkbox-input{
		background-color: #ffffff !important;
		border-color: #efefef !important;
	}
	uni-checkbox .uni-checkbox-wrapper .uni-checkbox-input-checked {
	  background-color: #C00000 !important;
	  border-color: #C00000 !important;
	  color: #ffffff !important;
	}
	
	
</style>
