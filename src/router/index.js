import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './../pages/Home/Home'
import Chat from './../pages/Chat/Chat'
import Cart from './../pages/Cart/Cart'
import Me from './../pages/Me/Me'
import Recommend from './../pages/Recommend/Recommend'
import Search from './../pages/Search/Search'
import Login from './../pages/Login/Login'

// 引入二级的路由版块
import Hot from '../pages/Home/Children/Hot/Hot'
import Box from './../pages/Home/Children/Box'
import Dress from './../pages/Home/Children/Dress'
import Ele from './../pages/Home/Children/Ele'
import Food from './../pages/Home/Children/Food'
import General from './../pages/Home/Children/General'
import Man from './../pages/Home/Children/Man'
import Mbaby from './../pages/Home/Children/Mbaby'
import Shirt from './../pages/Home/Children/Shirt'

Vue.use(VueRouter);


// 如果你的改了push还是没有生效，可以考虑改replace方法
// 修改路由replace方法,阻止重复点击报错
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

//原文链接：https://blog.csdn.net/qq_16687863/article/details/103892632

export default new VueRouter({
    //name:
    routes: [
        {
            path: '/home',
            component: Home,
         children: [
        {path: 'hot', component: Hot, meta: {showBottomTabBar: true}},
        {path: 'box', component: Box, meta: {showBottomTabBar: true}},
        {path: 'dress', component: Dress, meta: {showBottomTabBar: true}},
        {path: 'ele', component: Ele},
        {path: 'food', component: Food},
        {path: 'general', component: General},
        {path: 'man', component: Man},
        {path: 'mbaby', component: Mbaby},
        {path: 'shirt', component: Shirt},
        {path: '/home', redirect: '/home/hot'}
      ]
        },
        {path: '/cart', component: Cart, meta: {showBottomTabBar: true}},
        {path: '/chat',component: Chat},
        {path: '/recommend',component: Recommend},
        {path: '/search',component: Search},
        {path: '/me',component: Me},
        {path: '/login', component: Login},
        {path: '/',redirect: '/home'}
    ]
});