<template>
  <div :class="containerClass">
    <div class="forms-container">
      <div class="signin-signup">
        <form action="#" class="sign-in-form"><h2 class="title" style="color: white">Login</h2>
          <div class="input-field"><i class="el-icon-s-promotion"></i><input v-model="loginForm.account" type="text"
                                                                     placeholder="账号" @focus="resetError"/>
          </div>
          <div class="input-field"><i class="el-icon-key"></i><input v-model="loginForm.pwd" type="password"
                                                                     placeholder="密码" @focus="resetError"
                                                                     oninput="if(value.length>12)value=value.slice(0,12)"/>
          </div>
          <input type="button" @click="signIn" value="Login" class="btn solid"/>
        </form>
        <form action="#" class="sign-up-form"><h2 class="title" style="color: white">Register</h2>
          <div class="input-field"><i class="el-icon-s-promotion"></i><input v-model="loginForm.account" type="text"
                                                                     placeholder="邮箱" @focus="resetError"/>
          </div>
          <div class="input-field"><i class="el-icon-key"></i><input v-model="loginForm.pwd" type="password"
                                                                     placeholder="密码" @focus="resetError"
                                                                     oninput="if(value.length>12)value=value.slice(0,12)"/>
          </div>
          <div class="input-field"><i class="el-icon-key"></i><input v-model="loginForm.pwd2" type="password"
                                                                      placeholder="确认密码" @focus="resetError"
                                                                      oninput="if(value.length>12)value=value.slice(0,12)"/>
          </div>
          <div class="input-field">
            <i class="el-icon-s-comment"></i>
            <input class="input-verify" v-model="loginForm.code" oninput="if(value.length>5)value=value.slice(0,5)"
                   placeholder="验证码" @focus="resetError"/>
            <el-image class="verify-core" :src="imgBase64Code" @click="getVerifyCode" alt="验证码加载失败">
              <div slot="error" class="image-slot">
                <i class="el-icon-warning-outline"></i>
                <i class="el-icon-picture-outline"></i>
                <i class="el-icon-warning-outline"></i>
              </div>
            </el-image>
          </div>
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
      containerClass: "container",
      loginForm: {
        account: null,
        pwd: null,
        pwd2: null,
        token: null,
        code: null,

      },
      imgBase64Code: "",
      // 表达校验状态
      result: false,
      errorMsg: "",
      isRegister: false

    }
  },
  methods: {
    // 点击注册
    signUp() {
      if (this.containerClass === 'container sign-up-mode') {
        this.isRegister = true
        this.checkForm();
        if (!this.result) {
          this.doLogin();
        }else {
          ElementUI.Message.error(this.errorMsg)
        }
        return;

      }
      this.resetError();
      this.containerClass = "container sign-up-mode"
    },

    // 点击登录
    signIn() {
      if (this.containerClass === 'container') {
        this.checkForm();
        if (!this.result) {
          this.doRegister();
        }else {
          ElementUI.Message.error(this.errorMsg)
        }
        return;
      }
      this.resetError();
      this.containerClass = "container"
    },

    doLogin() {
      this.$axios.post("/login?"+qs.stringify({
        username:this.loginForm.account,
        password:this.loginForm.pwd,
        verifyCode: this.loginForm.code,
        token: this.loginForm.token
      })).then(
          resp => {
            console.log(resp.data.data);
          })
    },
    doRegister() {

    },

    // 校验表单参数
    checkForm() {
      //手机号格式
      let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.loginForm.account)) {
        this.result = true;
        this.errorMsg = "邮箱格式错误";
        return;
      }

      let pwd_ = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{0,12}$/;
      if (!pwd_.test(this.loginForm.pwd)) {
        this.result = true;
        this.errorMsg = "密码格式错误(数字加字母，长度应为6-12之间)";
        return;
      }
      if (this.loginForm.pwd.length < 6 || this.loginForm.pwd.length > 12) {
        this.result = true;
        this.errorMsg = "密码长度应为6-12之间";
        return;
      }
      if (this.isRegister && (this.loginForm.pwd2 === null || this.loginForm.pwd2 !== this.loginForm.pwd)) {
        this.result = true;
        this.errorMsg = "两次密码输入不一致";
      }
      if (this.isRegister && (this.loginForm.code === null || this.loginForm.code.length < 5)) {
        this.result = true;
        this.errorMsg = "验证码格式不正确";
        this.isRegister = false;
      }
    },

    // 重置错误信息
    resetError() {
      this.errorMsg = ""
      this.result = false
    },

    /**
     * 获取验证码
     */
    getVerifyCode() {
      this.$axios.get("/api/user_api/user_common/v1/auth/get_verify_code").then(
          // 箭头函数没有this，使用外部的this
          (resp) => {
            this.loginForm.token = resp.data.data.token
            this.imgBase64Code = resp.data.data.verifyCode
            // 清空验证码
            this.loginForm.verifyCode = ""
          }
      )
    },
  },
  /**
   * 界面创建生命周期钩子函数
   */
  created() {
    // 界面加载，获取验证码 todo 是否需要修改为切换到注册页面就需要获取验证码
    // this.getVerifyCode();
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

</style>