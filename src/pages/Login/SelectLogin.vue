<template>
  <div class="select-login">
      <div class="bottom">
          <img src="./images/lk_logo_sm.png" width="200">
      </div>
      <h4>选择登录方式</h4>
      <router-link tag="button" to="/login">手机登录</router-link>

  </div>
</template>

<script>
    export default {
      name: "SelectLogin"
    }
</script>

<style lang="stylus"   ref="stylesheet/stylus" scoped >
  .select-login
    background-color #f5f5f5
    width 100%

</style>
