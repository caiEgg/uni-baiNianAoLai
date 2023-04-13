// 根目录的static下创建js文件夹并创建mixin.js文件
// import Store from '../store/index.js'
// export const mixin={ 
//     methods: {
//         setTabBar:function() {
//             uni.setTabBarBadge({
//             	index: 2, 
//             	text: Store.getters["cartStore/totalCount"] + "",
//             	success: (res) => {
//             		console.log("成功么",res)
// 					console.log(Store.getters["cartStore/totalCount"])
//             	},
//             	fail: (msg) => {
//             		console.log("失败了" + msg)
//             	}
//             })
//         }
//     }
// }


import {mapGetters} from 'vuex'
export default{
	computed:{
		...mapGetters('cartStore',['totalCount'])
	},
	onShow(){
		this.setBadge()
	},
	methods:{
		setBadge(){
			uni.setTabBarBadge({
					index:2,
					text:this.totalCount +""
			})
			// 如果数量是0，那么就不显示
			if(this.totalCount == 0){
				uni.removeTabBarBadge({
					index:2,
					text:this.totalCount +""
				})
			}	
										
		}
	},
	watch:{
		totalCount:{
			handler(){
				this.setBadge()
			},
			deep:true,
			immediate: true
		}
	}
}