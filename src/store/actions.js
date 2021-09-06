import {
    getHomeCasual,
    getHomeNav,
    getHomeShopList,
    getRecommendShopList,
    getSearchGoods
} from '../api'

import {
    HOME_CASUAL,
    HOME_NAV,
    HOME_SHOP_LIST,
    RECOMMEND_SHOP_LIST,
    SEARCH_GOODS,
    ADD_GOODS_COUNT,
    REDUCE_GOODS_COUNT,
    SELECTED_SINGER_GOODS,
    SELECTED_ALL_GOODS,
    DEL_SINGER_GOODS
} from './mutation-types'

export default {

      // 1. 获取首页的轮播图
    async reqHomeCasual({commit},callback) {
        const result = await getHomeCasual();
        commit(HOME_CASUAL, {homecasual: result.results})
    
        callback && callback()
    },
   // 2. 获取首页的导航
    async reqHomeNav({commit}) {
        const result = await getHomeNav();
        commit(HOME_NAV,{homenav: result.results})
    },

     // 3. 获取首页的商品列表
     async reqHomeShopList({commit}) {
         const result = await getHomeShopList();
         commit(HOME_SHOP_LIST,{homeshoplist: result.results})

     },
    // 4. 获取推荐的商品数据

    async reqRecommendShopList({commit}) {
        const result = await getRecommendShopList();
        commit(RECOMMEND_SHOP_LIST,{recommendshoplist: result.results})
    },
    // 5. 获取推荐的商品数据
    async reqSearchGoods({commit}, callback) {
        const result = await getSearchGoods();
        commit(SEARCH_GOODS,{searchgoods: result.results})

        callback && callback();
    },

    // 9. 购物车单个商品的增加和减少
  updateGoodsCount({commit}, {goods, isAdd}) {
      if(isAdd) {
          commit(ADD_GOODS_COUNT,{goods});
      }else{
          commit(REDUCE_GOODS_COUNT, {goods});
      }
  },
  singerGoodsSelected({commit},{goods}){
      commit(SELECTED_SINGER_GOODS, {goods});
  },
   // 11. 全选和取消全选
   selectedAll({commit}, {isSelected}){
       commit(SELECTED_ALL_GOODS,{isSelected})
   },
   // 12. 删除单个商品
  delGoodsSinger({commit}, {goods}){
   commit(DEL_SINGER_GOODS, {goods});
    } 
  }