
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import Request from './api/request.js'
import mySearch from './components/my-search/my-search.vue'
import myGood from './components/my-good/my-good.vue'
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