<template>
  <div :class="containerClass">
    <div class="forms-container">
      <div class="signin-signup">

        <form action="#" class="sign-in-form">
          <h2 class="title" style="color: white" v-text="'Login / '+(loginType ? '密码' : '验证码')"></h2>
          <div class="input-field"><i class="el-icon-s-promotion"></i>
            <input v-model="loginForm.account" type="text"
                   placeholder="账号" @focus="resetError"
                   autocomplete="on"
                   oninput="if(value.length>30)value=value.slice(0,30)"/>
          </div>

          <div v-show="loginType" class="input-field"><i class="el-icon-key"></i>
            <input v-model="loginForm.pwd" type="password"
                   placeholder="密码" @focus="resetError"
                   autocomplete="on"
                   oninput="if(value.length>12)value=value.slice(0,12)"/>
          </div>

          <div v-show="!loginType" class="input-field"><i class="el-icon-message"></i>
            <input v-model="loginForm.emailCode" type="text"
                   placeholder="验证码" @focus="resetError"
                   autocomplete="on"
                   oninput="if(value.length>4)value=value.slice(0,4)"/>
            <div class="sc-dOSRxR jmvKBE" @click="sendEmailVerifyCodeHandler"
                 v-text="codeName"></div>
          </div>

          <div>
            <span class="login-type" @click="switchLoginType" v-text="'切换为'+(loginType ? '验证码': '密码')+'登录'"></span>
            <span class="forget-pwd">忘记密码？</span>
          </div>
          <input type="button" @click="signIn" value="Login" class="btn solid"/>
        </form>

        <form action="#" class="sign-up-form"><h2 class="title" style="color: white">Register</h2>
          <div class="input-field"><i class="el-icon-s-promotion"></i>
            <input v-model="loginForm.account" type="text"
                   placeholder="邮箱" @focus="resetError"
                   autocomplete="on"
                   oninput="if(value.length>30)value=value.slice(0,30)"/>
          </div>
          <div class="input-field"><i class="el-icon-key"></i>
            <input v-model="loginForm.pwd" type="password"
                   placeholder="密码" @focus="resetError"
                   autocomplete="on"
                   oninput="if(value.length>12)value=value.slice(0,12)"/>
          </div>
          <div class="input-field"><i class="el-icon-key"></i>
            <input v-model="loginForm.pwd2" type="password"
                   placeholder="确认密码" @focus="resetError"
                   autocomplete="on"
                   oninput="if(value.length>12)value=value.slice(0,12)"/>
          </div>

          <!--暂时仅需要邮箱验证码-->
          <div class="input-field">
            <i class="el-icon-message"></i>
            <input class="input-verify" v-model="loginForm.emailCode" oninput="if(value.length>4)value=value.slice(0,4)"
                   placeholder="验证码"/>
            <div class="sc-dOSRxR jmvKBE" @click="registerSendEmailVerifyCodeHandler" v-text="registerCodeName"></div>
          </div>

          <!--图片验证码，暂时不需要-->
          <!--<div class="input-field">-->
          <!--  <i class="el-icon-message"></i>-->
          <!--  <input class="input-verify" v-model="loginForm.code" oninput="if(value.length>5)value=value.slice(0,5)"-->
          <!--         placeholder="验证码" @focus="resetError"/>-->
          <!--  <el-image class="verify-core" :src="imgBase64Code" @click="getVerifyCode" alt="验证码加载失败">-->
          <!--    <div slot="error" class="image-slot">-->
          <!--      <i class="el-icon-warning-outline"></i>-->
          <!--      <span class="code-class" @click="getVerifyCode">验证码加载失败</span>-->
          <!--    </div>-->
          <!--  </el-image>-->
          <!--</div>-->


          <input type="submit" @click="signUp" class="btn" value="REGISTER"/>
        </form>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content"><h3>New here ?</h3>
          <p>请使用您正在使用的邮箱注册账号，它必须是一个可以接受验证码的邮箱。例如您的qq邮箱，163邮箱等等。</p>
          <button class="btn transparent" @click="signUp" id="sign-up-btn">注册</button>
        </div>
        <img src="#" class="image" alt=""/></div>
      <div class="panel right-panel">
        <div class="content"><h3>One of us ?</h3>
          <p>已经注册账号，老用户了。请输入您的账号密码登录，客官里面请~</p>
          <button class="btn transparent" @click="signIn" id="sign-in-btn">登录</button>
        </div>
        <img src="#" class="image" alt=""/></div>
    </div>
  </div>

</template>

<script>
import qs from "qs";
import ElementUI from 'element-ui'

export default {
  name: "Login",
  data() {
    return {
      // 登录方式，默认是密码登录=true
      loginType: true,
      containerClass: "container",
      loginForm: {
        account: null,
        pwd: null,
        pwd2: null,
        token: '%abc',
        emailCode: null,
        code: 1234,

      },
      imgBase64Code: "",
      // 表达校验状态
      paramCheckFail: false,
      errorMsg: "",
      isRegister: false,

      registerIsSend: true,
      isSend: true,
      codeName: "获取验证码",
      registerCodeName: "获取验证码",
      totalTime: 60, //一般是60
      timer: '', //定时器
      registerTotalTime: 60, //一般是60
      registerTimer: '', //定时器

    }
  },

  methods: {
    switchLoginType() {
      this.loginForm.pwd = ""
      this.loginForm.emailCode = ""
      this.containerClass = "container sign-up-mode"
      setTimeout(() => {
        this.loginType = !this.loginType
        this.containerClass = "container"
      }, 1250)
    },

    sendEmailVerifyCodeHandler() {
      if (!this.isSend) {
        return
      }
      //邮箱格式
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.loginForm.account)) {
        this.paramCheckFail = true;
        ElementUI.Message.error("邮箱地址错误");
        return;
      }
      // 发送验证码
      this.sendEmailVerifyCode()
      this.isSend = false
      this.codeName = this.totalTime + 's后重新发送'
      this.timer = setInterval(() => {
        this.totalTime--
        this.codeName = this.totalTime + 's后重新发送'
        if (this.totalTime < 0) {
          clearInterval(this.timer)
          this.codeName = '重新获取验证码'
          this.totalTime = 60
          this.isSend = true
        }
      }, 1000)
    },

    registerSendEmailVerifyCodeHandler() {
      if (!this.registerIsSend) {
        return
      }
      //邮箱格式
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.loginForm.account)) {
        this.paramCheckFail = true;
        ElementUI.Message.error("邮箱地址错误");
        return;
      }
      // 发送验证码
      this.sendEmailVerifyCode()
      this.registerIsSend = false
      this.registerCodeName = this.registerTotalTime + 's后重新发送'
      this.registerTimer = setInterval(() => {
        this.registerTotalTime--
        this.registerCodeName = this.registerTotalTime + 's后重新发送'
        if (this.registerTotalTime < 0) {
          clearInterval(this.registerTimer)
          this.registerCodeName = '重新获取验证码'
          this.registerTotalTime = 60
          this.registerIsSend = true
        }
      }, 1000)
    },

    sendEmailVerifyCode() {
      this.$axios.post("/user/send_email_verify", {
        email: this.loginForm.account
      }).then(
          resp => {
            console.log(resp.data.data);
          }).catch(e => {
        console.log("获取验证码失败")
      })
    },

    // 点击注册
    signUp() {
      if (this.containerClass === 'container sign-up-mode') {
        console.log("注册")
        this.isRegister = true
        this.registerCheckForm();
        if (!this.paramCheckFail) {
          this.doRegister();
        } else {
          ElementUI.Message.error(this.errorMsg)
        }
        this.isRegister = false;
        return;
      }

      // 切换为注册页面
      console.log("切换为注册")
      this.resetError();
      this.containerClass = "container sign-up-mode"
    },

    // 点击登录
    signIn() {
      if (this.containerClass === 'container') {
        console.log("登录")
        this.checkForm();
        if (!this.paramCheckFail) {
          this.doLogin();
        } else {
          ElementUI.Message.error(this.errorMsg)
        }
        return;
      }

      // 切换为登录页面
      console.log("切换为登录")
      this.resetError();
      this.containerClass = "container"
    },

    doLogin() {
      // 重定向
      let redirectUrl = location.search
      if (redirectUrl) {
        redirectUrl = decodeURIComponent(redirectUrl.split("=")[1])
      } else {
        redirectUrl = "/"
      }
      this.$axios.post("/user/login", {
        email: this.loginForm.account,
        password: this.loginForm.pwd,
        emailVerifyCode: this.loginForm.emailCode,

        imgVerifyCode: this.loginForm.code,
        token: this.loginForm.token
      }).then(resp => {
        let authAndToken = resp.headers['authorization'];
        if (!authAndToken.includes("-")) {
          localStorage.setItem('authorization', authAndToken);
          document.cookie = "token=;";
        } else {
          let arr = authAndToken.split("-")
          localStorage.setItem('authorization', arr[0]);

          // 过期时间两个小时
          let now = new Date();
          now.setTime(now.getTime() + 2 * 60 * 60 * 1000);
          let expires = "expires=" + now.toUTCString();
          document.cookie = "token=" + arr[1] + "; " + expires + "path=/";
        }
        // 登录成功，跳转首页
        location.href = redirectUrl
      }).catch(e => {
        console.log("登录失败")
      })
    },
    doRegister() {
      this.$axios.post("/user/register", {
        email: this.loginForm.account,
        password: this.loginForm.pwd,
        emailVerifyCode: this.loginForm.emailCode,
        imgVerifyCode: this.loginForm.code,
        token: this.loginForm.token
      }).then(resp => {
        this.$notify({
          type: "success",
          title: "注册成功",
          message: "请登录"
        })
        setTimeout(() => {
          // 切换到登录
          this.containerClass = "container"
        }, 500)
      }).catch(e => {
        console.log("注册失败")
      })
    },

    // 校验表单参数
    checkForm() {
      //邮箱格式
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.loginForm.account)) {
        this.paramCheckFail = true;
        this.errorMsg = "邮箱格式错误";
        return;
      }

      let pwd_ = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,12}$/;
      if (this.loginType && !pwd_.test(this.loginForm.pwd)) {
        this.paramCheckFail = true;
        this.errorMsg = "密码格式错误(数字加字母，长度应为6-12之间)";
        return;
      }
      if (this.loginType && (this.loginForm.pwd.length < 6 || this.loginForm.pwd.length > 12)) {
        this.paramCheckFail = true;
        this.errorMsg = "密码长度应为6-12之间";
        return;
      }
      if (this.loginType && this.isRegister && (this.loginForm.pwd2 === null || this.loginForm.pwd2 !== this.loginForm.pwd)) {
        this.paramCheckFail = true;
        this.errorMsg = "两次密码输入不一致";
        return;
      }

      // // 当前不需要图片验证码
      // if (this.isRegister && (this.loginForm.code === null || this.loginForm.code.length < 5)) {
      //   this.paramCheckFail = true;
      //   this.errorMsg = "验证码格式不正确";
      // }

      if (!this.loginType && this.loginForm.emailCode.length !== 4) {
        this.paramCheckFail = true;
        this.errorMsg = "验证码格式不正确";
      }
    },
    // 校验表单参数
    registerCheckForm() {
      this.paramCheckFail = false;
      //邮箱格式
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.loginForm.account)) {
        this.paramCheckFail = true;
        this.errorMsg = "邮箱格式错误";
        return;
      }

      let pwd_ = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,12}$/;
      if (!pwd_.test(this.loginForm.pwd)) {
        this.paramCheckFail = true;
        this.errorMsg = "密码格式错误(数字加字母，长度应为6-12之间)";
        return;
      }
      if ((this.loginForm.pwd.length < 6 || this.loginForm.pwd.length > 12)) {
        this.paramCheckFail = true;
        this.errorMsg = "密码长度应为6-12之间";
        return;
      }
      if (this.isRegister && (this.loginForm.pwd2 === null || this.loginForm.pwd2 !== this.loginForm.pwd)) {
        this.paramCheckFail = true;
        this.errorMsg = "两次密码输入不一致";
        return;
      }

      if (this.loginForm.emailCode?.length !== 4) {
        this.paramCheckFail = true;
        this.errorMsg = "验证码格式不正确";
      }
    },

    // 重置错误信息
    resetError() {
      this.errorMsg = ""
      this.paramCheckFail = false
    },

    /**
     * 获取验证码
     */
    getVerifyCode() {
      this.$axios.get("/user/get_verify_code").then(
          // 箭头函数没有this，使用外部的this
          (resp) => {
            this.loginForm.token = resp.data.data.token
            this.imgBase64Code = resp.data.data.verifyCode
            // 清空验证码
            this.loginForm.verifyCode = ""
          }
      )
    },

    /**
     * 获取邮箱验证码
     */
    getEmailVerityCode() {
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.loginForm.account)) {
        ElementUI.Message.error("邮箱地址错误");
        return;
      }

    },
  },
  /**
   * 界面创建生命周期钩子函数
   */
  created() {
    // 界面加载，获取验证码 todo 是否需要修改为切换到注册页面就需要获取验证码
    // this.getVerifyCode();

    // 页面滑动动态效果
    this.containerClass = "container sign-up-mode"
    setTimeout(() => {
      this.containerClass = "container"
    }, 100)
  }
}

</script>

<style scoped>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}

body, input {
  font-family: "Poppins", sans-serif
}

.container {
  position: relative;
  width: 100%;
  /* 背景颜色1*/
  background-color: #e5ba2c;
  min-height: 100vh;
  overflow: hidden
}

.forms-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0
}

.signin-signup {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 75%;
  width: 50%;
  transition: 1s .7s ease-in-out;
  display: grid;
  grid-template-columns: 1fr;
  z-index: 5
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0rem 5rem;
  transition: all .2s .7s;
  overflow: hidden;
  grid-column: 1 / 2;
  grid-row: 1 / 2
}

form.sign-up-form {
  opacity: 0;
  z-index: 1
}

form.sign-in-form {
  z-index: 2
}

.title {
  font-size: 2.2rem;
  color: #444;
  margin-bottom: 10px
}

.input-field {
  max-width: 380px;
  width: 100%;
  background-color: #f0f0f0;
  margin: 10px 0;
  height: 55px;
  border-radius: 55px;
  display: grid;
  grid-template-columns: 15% 85%;
  padding: 0 .4rem;
  position: relative
}

.input-field i {
  text-align: center;
  line-height: 55px;
  color: #acacac;
  transition: .5s;
  font-size: 1.1rem
}

.input-field input {
  background: 0;
  outline: 0;
  border: 0;
  line-height: 1;
  color: #333
}

.input-verify {
  width: 50%;
  max-lines: 3;
  display: inline-block !important;
}

.verify-core {
  position: absolute;
  width: 130px;
  margin-top: 4px;
  margin-left: 50%;
}

.input-field input::placeholder {
  color: #aaa;
  font-weight: 500
}

.social-text {
  padding: .7rem 0;
  font-size: 1rem
}

.social-media {
  display: flex;
  justify-content: center
}

.social-icon {
  height: 46px;
  width: 46px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 .45rem;
  color: #333;
  border-radius: 50%;
  border: 1px solid #333;
  text-decoration: none;
  font-size: 1.1rem;
  transition: .3s
}

.social-icon:hover {
  color: #4481eb;
  border-color: #4481eb
}

.btn {
  width: 150px;
  background-color: #5995fd;
  border: 0;
  outline: 0;
  height: 49px;
  border-radius: 49px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 600;
  margin: 10px 0;
  cursor: pointer;
  transition: .5s
}

.btn:hover {
  background-color: #4d84e2
}

.panels-container {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr)
}

.container:before {
  content: "";
  position: absolute;
  height: 2000px;
  width: 2000px;
  top: -10%;
  right: 48%;
  transform: translateY(-50%);
  background-image: linear-gradient(-45deg, #4481eb 0, #04befe 100%);
  transition: 1.8s ease-in-out;
  border-radius: 50%;
  z-index: 6
}

.image {
  width: 100%;
  transition: transform 1.1s ease-in-out;
  transition-delay: .4s
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-around;
  text-align: center;
  z-index: 6
}

.left-panel {
  pointer-events: all;
  padding: 3rem 17% 2rem 12%
}

.right-panel {
  pointer-events: none;
  padding: 3rem 12% 2rem 17%
}

.panel .content {
  color: #fff;
  transition: transform .9s ease-in-out;
  transition-delay: .6s
}

.panel h3 {
  font-weight: 600;
  line-height: 1;
  font-size: 1.5rem
}

.panel p {
  font-size: .95rem;
  padding: .7rem 0
}

.btn.transparent {
  margin: 0;
  background: 0;
  border: 2px solid #fff;
  width: 130px;
  height: 41px;
  font-weight: 600;
  font-size: .8rem
}

.right-panel .image, .right-panel .content {
  transform: translateX(800px)
}

.container.sign-up-mode:before {
  transform: translate(100%, -50%);
  right: 52%
}

.container.sign-up-mode .left-panel .image, .container.sign-up-mode .left-panel .content {
  transform: translateX(-800px)
}

.container.sign-up-mode .signin-signup {
  left: 25%
}

.container.sign-up-mode form.sign-up-form {
  opacity: 1;
  z-index: 2
}

.container.sign-up-mode form.sign-in-form {
  opacity: 0;
  z-index: 1
}

.container.sign-up-mode .right-panel .image, .container.sign-up-mode .right-panel .content {
  transform: translateX(0%)
}

.container.sign-up-mode .left-panel {
  pointer-events: none
}

.container.sign-up-mode .right-panel {
  pointer-events: all
}

@media (max-width: 870px) {
  .container {
    min-height: 800px;
    height: 100vh
  }

  .signin-signup {
    width: 100%;
    top: 95%;
    transform: translate(-50%, -100%);
    transition: 1s .8s ease-in-out
  }

  .signin-signup, .container.sign-up-mode .signin-signup {
    left: 50%
  }

  .panels-container {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 2fr 1fr
  }

  .panel {
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2.5rem 8%;
    grid-column: 1 / 2
  }

  .right-panel {
    grid-row: 3 / 4
  }

  .left-panel {
    grid-row: 1 / 2
  }

  .image {
    width: 200px;
    transition: transform .9s ease-in-out;
    transition-delay: .6s
  }

  .panel .content {
    padding-right: 15%;
    transition: transform .9s ease-in-out;
    transition-delay: .8s
  }

  .panel h3 {
    font-size: 1.2rem
  }

  .panel p {
    font-size: .7rem;
    padding: .5rem 0
  }

  .btn.transparent {
    width: 110px;
    height: 35px;
    font-size: .7rem
  }

  .container:before {
    width: 1500px;
    height: 1500px;
    transform: translateX(-50%);
    left: 30%;
    bottom: 68%;
    right: initial;
    top: initial;
    transition: 2s ease-in-out
  }

  .container.sign-up-mode:before {
    transform: translate(-50%, 100%);
    bottom: 32%;
    right: initial
  }

  .container.sign-up-mode .left-panel .image, .container.sign-up-mode .left-panel .content {
    transform: translateY(-300px)
  }

  .container.sign-up-mode .right-panel .image, .container.sign-up-mode .right-panel .content {
    transform: translateY(0px)
  }

  .right-panel .image, .right-panel .content {
    transform: translateY(300px)
  }

  .container.sign-up-mode .signin-signup {
    top: 5%;
    transform: translate(-50%, 0)
  }
}

@media (max-width: 570px) {
  form {
    padding: 0 1.5rem
  }

  .image {
    display: none
  }

  .panel .content {
    padding: .5rem 1rem
  }

  .container {
    padding: 1.5rem
  }

  .container:before {
    bottom: 72%;
    left: 50%
  }

  .container.sign-up-mode:before {
    bottom: 28%;
    left: 50%
  }
}

.checkMsg {
  font-size: 18px;
  color: red;
}

.code-class {
  padding-top: 9px;
  color: rgb(136, 156, 183);
}

.jmvKBE {
  color: rgb(3, 100, 255);
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  position: absolute;
  top: 18px;
  right: 28px;
  cursor: pointer;
}

.forget-pwd {
  cursor: pointer;
  margin-top: -18px;
  margin-left: 270px;
  display: flex;
  -webkit-box-pack: end;
  justify-content: flex-end;
  color: rgb(136, 156, 183);
  font-size: 13px;
}

.login-type {
  cursor: pointer;
  color: rgb(3, 100, 255);
  font-size: 14px;
}

</style>