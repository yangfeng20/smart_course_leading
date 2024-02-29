<template>
  <div class="login-wrap" style="text-align: center;padding-left: 25%;padding-right: 25%">
    <h2>重置密码</h2>
    <el-input placeholder="账号" v-model="userEmail" :disabled="!!account"></el-input>
    <el-input placeholder="请输入密码" v-model="pwd1" show-password></el-input>
    <el-input placeholder="确认密码" v-model="pwd2" show-password></el-input>
    <div style="display: flex">
      <el-input placeholder="验证码" v-model="verifyCode" maxlength="4"></el-input>
      <el-button type="primary" style="z-index:10;padding: 1px" @click="checkAndGetVerifyCode">获取验证码</el-button>
    </div>
    <div style="display: flex;margin-left: 40%">
      <el-button type="primary" style="z-index:10;margin-top: 10px" @click="checkAndResetPwd">重置密码</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResetPwd",
  props: ['account'],
  data() {
    return {
      userEmail: "",
      pwd1: "",
      pwd2: "",
      verifyCode: "",
    }
  },

  created() {
    console.log("账号：", this.account)
    if (this.account) {
      this.userEmail = this.account
    }
  },
  methods: {
    checkAndGetVerifyCode() {
      if (!this.checkParam(false)) {
        return;
      }
      this.$axios.post("/user/send_email_verify", {
        email: this.userEmail,
      }).then(
          resp => {
            this.$notify({
              type: "success",
              title: "验证码发送成功",
              message: "已发送验证码到：" + this.userEmail
            })
          }).catch(e => {
        console.log("获取验证码失败")
      })

    },
    checkAndResetPwd() {
      if (!this.checkParam(true)) {
        return;
      }

      this.$axios.post("/user/reset_pwd", {
        email: this.userEmail,
        emailVerifyCode: this.verifyCode,
        password: this.pwd1
      }).then(resp => {
        this.$notify({
          type: "success",
          title: "重置密码成功",
          message: "重置密码成功"
        })
        this.pwd1 = ""
        this.pwd2 = ""
        this.verifyCode = ""

        setTimeout(() => {
          location.href = "/"
          localStorage.removeItem('authorization');
        }, 1000)
      }).catch(e => {
        this.$notify({
          type: "error",
          title: "重置密码失败",
          message: e.message
        })
      })
    },

    checkParam(isVerifyCode) {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailRegex.test(this.userEmail)) {
        this.$notify({
          type: "error",
          title: "重置密码失败",
          message: "邮箱格式不正确"
        })
        return false;
      }
      if (!this.pwd1 || this.pwd1.length < 6 || this.pwd1.length >= 12) {
        this.$notify({
          type: "error",
          title: "重置密码失败",
          message: "密码长度为6-12"
        })
        return false;
      }
      if (this.pwd1 !== this.pwd2) {
        this.$notify({
          type: "error",
          title: "重置密码失败",
          message: "两次输入密码不一致"
        })
        return false;
      }

      if (isVerifyCode && !this.verifyCode) {
        this.$notify({
          type: "error",
          title: "重置密码失败",
          message: "请输入验证码"
        })
        return false;
      }

      return true;
    }
  }
}
</script>

<style scoped>

</style>