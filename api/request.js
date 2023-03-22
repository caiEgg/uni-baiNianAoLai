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
}
export default Request