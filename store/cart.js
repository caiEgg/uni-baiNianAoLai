import Storage from './changeStorage.js'
export default{
	namespaced:true,
	state:()=>({
		cart:Storage.getCartStorage()
	}),
	mutations:{
		addToCart(state,goods){
			var result = state.cart.find(function(currentValue, index,arr){
				return currentValue.goods_id == goods.goods_id
			})
			if(result == undefined){
				state.cart.push(goods)
				
			}else{
				// 已经有该商品，直接添加数量
				result.goods_count ++				
			}
		},
		// 修改商品勾选状态
		changeGoodState(state,goods){
			var result = state.cart.find(function(currentValue, index,arr){
				return currentValue.goods_id == goods.goods_id
			})			
			result.goods_state = !result.goods_state
			Storage.setCartStorage(state.cart)
		},
		// 全选/全不选
		changeAllGoodsState(state,allCheck){
			state.cart.forEach(function(goodsDetail,index,arr){
				goodsDetail.goods_state = allCheck
			})
			Storage.setCartStorage(state.cart)
		},
		// 修改商品数量
		changeGoodCount(state,data){		
			var result = state.cart.find(function(currentValue, index,arr){
				return currentValue.goods_id == data.goodDetail.goods_id
			})			
			result.goods_count = data.count			
			Storage.setCartStorage(state.cart)
		},
		// 删除商品
		deleteGood(state,goods){
			var goodIndex = 0
			console.log("这里")
			var result = state.cart.find(function(currentValue, index,arr){
				goodIndex = index
				return currentValue.goods_id == goods.goods_id				
			})
			state.cart.splice(goodIndex,1)
			Storage.setCartStorage(state.cart)
		}
	},
	getters:{
		// 所有商品总数
		totalCount(state){
			var totalCount = +0;
			for (var i = 0; i < state.cart.length; i++) {
				totalCount +=  +state.cart[i].goods_count
			}			
			return totalCount
		},
		// 选中的商品的价格
		totalPrice(state){
			var totalPrice = 0;
			for (var i = 0; i < state.cart.length; i++) {
				if(state.cart[i].goods_state == true){
					totalPrice += state.cart[i].goods_price * state.cart[i].goods_count
				}
			}
			return totalPrice
		}
	}
}