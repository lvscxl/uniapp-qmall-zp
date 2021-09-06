<template>
  <div class="recommend-container" v-if="recommendshoplist.length > 0" >
    <ul class="recommend">
      <shop-list
      tag="li"
      v-for="(item, index) in recommendshoplist"
      :item=item
      :key="index"
      />


    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'

import ShopList from './../../components/ShopList/ShopList'
  export default {
    name: "Recommend",
    mounted() {
      this.$store.dispatch('reqRecommendShopList')
    },
    computed:{
      ...mapState(['recommendshoplist'])
    },
    components:{
      ShopList
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .recommend-container
    background #F5F5F5
    width 100%
    height 100%
    .recommend
      display flex
      flex-direction row
      flex-wrap wrap
      background #F5F5F5
      margin-bottom 50px
</style>
