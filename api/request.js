import Http from '../utils/http.js'

class Request extends Http{
	// 获取轮播图数据
	static getSwiperList(){
		return Http.request({
			url:'/api/public/v1/home/swiperdata',
			method:'GET'
		})
	}
	// 获取分类导航数据
	static getCatitems(){
		return Http.request({
			url:'/api/public/v1/home/catitems',
			method:'GET'
		})
	}
	// 获取楼层图片数据
	static getfloordata(){
		return Http.request({
			url:'/api/public/v1/home/floordata',
			method:'GET'
		})
	}
	// 获取分类列表
	static getCategories(){
		return Http.request({
			url:'/api/public/v1/categories',
			method:'GET'
		})
	}
	// 获取搜索列表数据
	static getSearchList(data){
		return Http.request({
			url:'/api/public/v1/goods/search',
			method:'GET',
			data:data
		})
	}
	//根据输入框关键字进行搜索
	static getInputList(keyword){
		return Http.request({
			url:'/api/public/v1/goods/qsearch?query='+keyword,
			method:'GET',
		})
	}
}
export default Request