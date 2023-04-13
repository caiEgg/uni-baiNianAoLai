export default{
	setCartStorage:function(data){
		uni.setStorage({
			key:'cart',
			data:JSON.stringify(data)
		})
	},
		
	getCartStorage:function(){
		return JSON.parse(uni.getStorageSync('cart') || '[]')
	}
}