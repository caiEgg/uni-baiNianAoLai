
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import Request from './api/request.js'
import mySearch from './components/my-search/my-search.vue'
import myGood from './components/my-good/my-good.vue'
import UniIcons from './uni_modules/uni-icons/components/uni-icons/uni-icons.vue'

import UniGoodsNav from './uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'

Vue.component('UniGoodsNav',UniGoodsNav)
Vue.component('UniIcons',UniIcons)
Vue.component('my-search',mySearch)
Vue.component('my-good',myGood)

uni.$http = Request


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
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