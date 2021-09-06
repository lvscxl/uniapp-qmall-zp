import Vue from 'vue'
import App from './App'

import router from './router/index'

import store from './store'


// 在main.js引入
import 'default-passive-events'

// 引入顶部的tab
import LyTab from 'ly-tab'
Vue.use(LyTab);


// 引入字体图标
import '@/common/css/style.css'
//import "common/stylus/mixins.styl"

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
    
});