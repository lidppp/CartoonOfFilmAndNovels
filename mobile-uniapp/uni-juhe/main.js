import Vue from 'vue'
import App from './App'
import Loading from "components/loading.vue"
Vue.config.productionTip = false

App.mpType = 'app'
Vue.component("d-loading",Loading)

const app = new Vue({
	...App
})
app.$mount()
