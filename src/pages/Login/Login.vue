<template>
  <div class="login-container">
      <div class="login-inner">
          <div class="login-header">
              <div class="login-logo">
                  <img src="./images/lk_logo_sm.png">
              </div>
              <!--面板标题-->
            <div class="login-header-title">
            <a href="javascript:;" :class="{current: loginMode}"  @click="dealLoginMode(true)">短信登录</a>
            <a href="javascript:;" :class="{current: !loginMode}" @click="dealLoginMode(false)">密码登录</a>
            </div>
          </div>
      
      <div class="login-content">
          <form>
              <div :class="{current: loginMode}">
                  <section class="login-message">
                      <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                      <button 
                        class="get-verification"
                        v-if="!countDown"
                        :class="{phone_right: phoneRight}"
                        @click.prevent="getVerifyCode()"
                      >获取验证码
                      </button>
                      <button
                        v-else
                        disabled="disabled"
                        class="get-verification"
                       >
                          已发送({{countDown}}s)
                      </button>
                  </section>
                   <section class="login-verification">
                     <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                   </section>
                   <section class="login-hint">
                      温馨提示：未注册撩课帐号的手机号，登录时将自动注册，且代表已同意
                      <a href="javascript:;">服务协议与隐私政策</a>
                    </section>
              </div>
               <!--账号登录部分-->
          <div :class="{current: !loginMode}">
            <section>
              <section class="login-message">
                <input type="tel" maxlength="11" placeholder="用户名" v-model="user_name">
              </section>
              <section class="login-verification">
                <input type="password" maxlength="20" placeholder="密码" v-if="pwdMode" v-model="pwd">
                <input type="text" maxlength="20" placeholder="密码" v-else v-model="pwd">
                <div class="switch-show">
                  <img @click.prevent="dealPwdMode(false)" :class="{on: pwdMode}" src="./images/hide_pwd.png" alt="" width="20">
                  <img @click.prevent="dealPwdMode(true)" :class="{on: !pwdMode}" src="./images/show_pwd.png" alt="" width="20">
                </div>
              </section>
              <section class="login-message">
                <input type="text" maxlength="4" placeholder="验证码" v-model="captcha">
                <img
                  class="get-verification"
                  src="http://localhost:1688/api/captcha"
                  alt="captcha"
                  @click.prevent="getCaptcha()"
                  ref="captcha"
                >
              </section>
            </section>
          </div>
           <button class="login-submit" @click.prevent="login()">登录</button>
          </form>
           <button class="login-back" @click="$router.back()">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import {getPhoneCode, phoneCodeLogin, pwdLogin} from './../../api/index';
import {Toast} from 'mint-ui';
import {mapAction, mapState, mapActions} from 'vuex'
export default {
  name: "Login",
  data () {
    return {
        loginMode: true, // 登录方式, true 手机验证码登录, flase 账号登录
        phone: '', // 手机号码
        countDown: 0, // 倒计时
        code: '', // 验证码
        user_name: '', // 用户名
        pwd: '', // 密码
        pwdMode: true, // 密码的显示方式, true 密文  false 明文
        captcha: '', // 图形验证码
        userInfo: {}
      }
  },
  computed:{
    phoneRight() {
      return /^1[34578]\d{9}$/.test(this.phone);
    }

  },

  methods:{
    ...mapActions(['syncUserInfo']),

    dealLoginMode(flag) {
      //debugger
      this.loginMode = flag;
    },
    // 2. 获取短信验证码
    async getVerifyCode() {
       //debugger
      if(this.phoneRight) {
        this.countDown = 6;
        this.intervalId = setInterval(() =>{
          this.countDown --;
          if(this.countDown === 0) {
            clearInterval(this.intervalId);
          }
        },1000 );

        const result = await getPhoneCode(this.phone);
        console.log(result);
        if(result.status === 200) {
          console.log(result);
          Toast({
            message: result.message,
            position:'center',
            duration: 3000
          });

          setTimeout(() => {
            clearInterval(this.intervalId);
            this.countDown =0;
          },3000
          );
        }
      }
    },

    dealPwdMode(flag){
      this.pwdMode = flag;
    },

    getCaptcha() {
      this.$refs.captcha.src ='http://localhost:1688/api/captcha?time=' + new Date()
    },
    async login() {
      if(this.loginMode) {
        if(!this.phone) {
          Toast('sh请输入手机号码!u');
          return;
        }else if(!this.phoneRight) {
          Toast('请输入正确的手机号码!');
              return;
        }

        if(!this.code) {
           Toast('请输入验证码!');
           return;
        }else if(!(/^\d{6}$/gi.test(this.code))){
              Toast('请输入正确的验证码!');
              return;
        }
         // 5.2 手机验证码登录
         const result = await phoneCodeLogin(this.phone, this.code);
         
          if(result.status === 200){
                this.userInfo = result.results;
            }else {
                this.userInfo = {
                    message: '登录失败, 手机号码或验证码不正确!'
                }
            }
          }else { // 账号和密码的登录
            if(!this.user_name){
               Toast('请输入用户名!');
               return;
            }else if(!this.pwd){
               Toast('请输入密码!');
               return;
            }else if(!this.captcha){
              Toast('请输入验证码!');
              return;
            }
           // 5.2 发起请求
            const result = await pwdLogin(this.user_name, this.pwd, this.captcha);
           if (result.status === 200) {
             this.userInfo = result.results;
           } else {
             this.userInfo = {
               message: '登录失败, 用户名和密码不正确!'
             }
           }

             // 6. 后续的处理
        console.log(this.userInfo);
        if(!this.userInfo._id){
           Toast(this.userInfo.message);
        }else {
           // 6.1 同步用户的信息
           this.syncUserInfo(this.userInfo);
           // 6.2 回到主界面
           this.$router.back();
        }
         }
    }
  }
}
</script>

<style lang="stylus"   ref="stylesheet/stylus" scoped >
@import "../../common/stylus/mixins.styl"

 .login-container
    width 100%
    height 100%
    background-color #ffffff

    .login-inner
      padding-top 60px
      width 80%
      margin 0 auto

      .login-header
        .login-logo
          font-size 40px
          font-weight bold
          color mediumpurple
          text-align center

        .login-header-title
          padding-top 40px
          padding-bottom 10px
          width 100%
          text-align center

          > a
            color #333
            font-size 14px
            padding-bottom 4px

            &:first-child
              margin-right 40px
              
            &.current
              color mediumpurple
              font-weight 700
              border-bottom 2px solid

      .login-content
        > form
          > div
            display none

            &.current
              display block

            input
              width 100%
              height 100%
              padding-left 8px
              box-sizing border-box
              border 1px solid #dddddd
              border-radius 40px
              outline 0
              font 400 14px Arial

              &:focus
                border 1px solid 
            
            .login-message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #ffffff

              .get-verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #cccccc
                font-size 14px
                background transparent

                &.phone_right
                  color purple

            .login-verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #ffffff

              .switch-show
                position absolute
                right 10px
                top 12px

                img 
                  display none

            .login-hint
              margin-top 12px
              color  #999
              font-size 12px
              line-height 20px

              > a
                color mediumpurple

          .login-submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background mediumpurple
            color #ffffff
            text-align center
            font-size 16px
            line-height 42px
            border 0
      
        .login-back
          display block
          width 100%
          height 42px
          margin-top 15px
          border-radius 4px
          background transparent
          border: 1px solid mediumpurple
          color mediumpurple
          text-align center
          font-size 16px
          line-height 42px

</style>
