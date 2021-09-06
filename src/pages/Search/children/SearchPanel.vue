<template>
  <!-- <div class="search-panel">
       <div class="search-nav">
          <div class="search-input">
              <img src="../images/search.png" width="25" />   
              <input ref="mySearch" type="search"  placeholder="asd1" /> 
             
          </div>
          <button @click="showSearchPanel(false)"> 取消</button>
      </div>
      <div class="search-content">
          <div class="title">
              <img src="../images/hot.png" width="25" />
              <span>热门搜索</span>

          </div>
          <ul class="search-list">
            <li>抽纸批发</li>
            <li>浴巾可穿</li>
            <li>石榴水果</li>
            <li>富豪卷纸</li>
            <li>冰箱收纳盒</li>
            <li>毛巾衣服</li>
            <li>小白鞋增高透气</li>
            <li>连衣裙夏</li>

          </ul>
      </div>
  </div> -->
  <div class="search-panel">
    <!-- <div class="search-panel"> -->
      <div class="search-nav">
          <div class="search-input">
              <img src="../images/search.png" width="25" />   
              <input ref="mySearch" type="search"  placeholder="asd1" /> 
             
          </div>
          <button @click="showSearchPanel(false)"> 取消</button>
      </div>
      <div class="search-content">
          <div class="title">
              <img src="../images/hot.png" width="25" />
              <span>热门搜索</span>

          </div>
          <ul class="search-list">
            <li>抽纸批发</li>
            <li>浴巾可穿</li>
            <li>石榴水果</li>
            <li>富豪卷纸</li>
            <li>冰箱收纳盒</li>
            <li>毛巾衣服</li>
            <li>小白鞋增高透气</li>
            <li>连衣裙夏</li>

          </ul>
      </div>
  </div>
</template>

<script>
  export default {
    name: "SearchPanel",
    props:{
      showSearchPanel: Function
    },
    mounted(){
       this.$refs.mySearch.focus()
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .search-panel
    width 100%
    height 100%
    background-color #fff
    position fixed
    left 0
    top 0
    z-index 1000
    .search-nav
      width 100%
      height 60px
      border-bottom-1px(#dddddd)
      padding 0 20px
      display flex
      flex-direction row
      align-items center
      justify-content space-between
      .search-input
        display flex
        flex-direction row
        align-items center
        width 85%
        height 38px
        border-radius 5px
        background-color #ededed
        padding 0 10px
        input
           background-color transparent
           width 90%
           height 90%
           padding-left 10px
           color #aaa
           font-size 16px
           outline none
      button
        background-color transparent
        font-size 16px
        color #aaa
    .search-content
       padding 30px 15px
       .title
          display flex
          flex-direction row
          align-items center
          color #aaa
          margin-bottom 10px
       .search-list
          display flex
          flex-direction row
          flex-wrap wrap
          li
            background-color: #ededed
            color #aaa
            margin 5px 15px
            padding 5px 5px
            border-radius 10px
</style>
