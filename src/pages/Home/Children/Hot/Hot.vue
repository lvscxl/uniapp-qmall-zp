<template>
  <div id="hot1">
     <!--轮播图-->
        <!-- <div class="swiper-container">
          <div class="swiper-wrapper" style="height:20%">
            <div class="swiper-slide"><img src="../../imgs/rowing/s1.png" alt="" width="100%"></div>
            <div class="swiper-slide"><img src="../../imgs/rowing/s2.png" alt="" width="100%"></div>
            <div class="swiper-slide"><img src="../../imgs/rowing/s3.png" alt="" width="100%"></div>
            <div class="swiper-slide"><img src="../../imgs/rowing/s4.png" alt="" width="100%"></div>
            <div class="swiper-slide"><img src="../../imgs/rowing/s5.png" alt="" width="100%"></div>
            <div class="swiper-slide"><img src="../../imgs/rowing/s6.png" alt="" width="100%"></div>
            <div class="swiper-slide"><img src="../../imgs/rowing/s7.png" alt="" width="100%"></div>
          </div>

          <div class="swiper-pagination"></div>
        </div> -->
       <div class="swiper-container" v-if="homecasual.length > 0">
            <div class="swiper-wrapper" style="height:20%">
                  <div class="swiper-slide" v-for="(casual, index) in homecasual" :key="index">

                    <!-- <img src="../../imgs/rowing/s1.png" width="100%"> -->
                     <img :src="casual.imgurl" alt="" width="100%">
                  </div>
           </div>

           <div class="swiper-pagination"></div>
       </div>
        <hot-nav/>
        <div class="hot-ad">
          <img src="./../../imgs/hot_ad/home_ad.gif" width="100%"> 
        </div>
    <!--4.商品的列表-->
    <hot-shop-list />
  </div>
</template>

<script>
  // 1. 引入swiper相关
  import Swiper from 'swiper'
  import 'swiper/dist/css/swiper.min.css'
  import HotNav from './HotNav'
  import HotShopList from './HotShopList'

  import api from 'api/ajax'
  import {mapState} from 'vuex'
export default {
  name: "Hot",
  components:{
      HotNav,
      HotShopList
  },
  computed: {
    ...mapState(['homecasual'])
  },
  // data () {
  //   return {
  //   }
  // } ,
    mounted() {
        // 2. 创建swiper实例
        // new Swiper ('.swiper-container', {
        // autoplay: true,
        // loop: true,
        // // 如果需要分页器
        // pagination: {
        //     el: '.swiper-pagination',
        // }
        // })

        this.$store.dispatch('reqHomeCasual',() => {
          this.$nextTick( () => {
            new Swiper('.swiper-container',{
              autoplay: true,
              loop: true,
              pagination: {
                el: '.swiper-pagination',
              }
            })
          })
        });
        // 2.请求首页导航的数据
        this.$store.dispatch('reqHomeNav');

        // 3. 请求首页的商品列表数据
        this.$store.dispatch('reqHomeShopList');
   }
}
</script>

<style lang="stylus"   ref="stylesheet/stylus" scoped >
  #hot1
    overflow-x hidden !important
    width 100%
    height 100%
    padding-top 46px
    background #f5f5f5
    .hot-ad
      background-color #ffffff
      margin 8px 0
      padding 5px
      
</style>
