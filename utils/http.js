const configObj = {
	baseUrl: 'https://api-hmugo-web.itheima.net',
}
const exceptionMessage = {
	'200':'请求成功',
	'301':'资源被永久转移到其它URL',
	'404': '请求的资源不存在',
	'500': '内部服务器错误'	
}
class Http {
	static async request(options) {
		const config = await Http._beforeRequest(options)
		config.url = configObj.baseUrl + options.url
		console.log("请求参数是",config)
		const response = await uni.request(config)
		console.log("请求结果是",response)
		// 对响应信息做处理
		return await Http._afterResponse(response)
	}
	// 请求拦截器
	static async _beforeRequest(config) {
		uni.showLoading({
			title:'数据加载中……'
		})
		return config
	}
	
	// 响应拦截器
	static async _afterResponse(response){
		uni.hideLoading()
		// 这个要看接口数据是什么结构
		const {message,meta}= response[1].data
		if(meta.status !==200){
			Http._showError(meta.status,meta.msg)
		}
		console.log("经过处理的请求结果是",message)
		return message
	}
	// 请求错误信息提示
	static _showError(code,msg){
		let title = ''
		title = exceptionMessage[code] || msg || '发生未知错误'
		uni.showToast({
			duration:1500,
			title:title,
			icon:"none"
		})
	}
}
export default Http
