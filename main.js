
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import Request from './api/request.js'
import mySearch from './components/my-search/my-search.vue'
import myAddress from './components/my-address/my-address.vue'
import myGood from './components/my-good/my-good.vue'
import UniIcons from './uni_modules/uni-icons/components/uni-icons/uni-icons.vue'
// 加入购物车的UI
import UniGoodsNav from './uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
import store from "./store/index.js"
import uniSwipeAction from './uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from './uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.vue'
Vue.component('UniGoodsNav',UniGoodsNav)
Vue.component('UniIcons',UniIcons)
Vue.component('my-search',mySearch)
console.log("这里", myAddress)
Vue.component('my-address',myAddress)
console.log("这里搞完了，",myAddress)
Vue.component('my-good',myGood)
Vue.component('uni-swipe-action',uniSwipeAction)
Vue.component('uni-swipe-action-item',uniSwipeActionItem)
uni.$http = Request


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif