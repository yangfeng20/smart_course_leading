<template>
  <div>
    <el-container>
      <el-container>
        <el-aside style="width: 70%">

          <div class="input-div">
            <div class="input-title">
              邮箱
            </div>
            <el-input class="input-inner"
                      v-model="userInfo.email" :disabled="true">
            </el-input>
          </div>

          <div class="input-div">
            <div class="input-title">
              用户名
            </div>
            <el-input class="input-inner"
                      v-model="userInfo.name">
            </el-input>
          </div>

          <div class="input-div">
            <div class="input-title">
              个人简介
            </div>
            <el-input class="input-inner"
                      v-model="userInfo.briefInfo">
            </el-input>
          </div>
        </el-aside>
        <el-main style="align-items: center;">
          <el-upload
              style="width: 180px;height: 160px;"
              class="upload-demo"
              :limit="10"
              :headers="this.$func.getAuthHeader()"
              :on-success="updateImgUrl"
              action="http://localhost:8090/file/upload">
            <div>
              <el-image
                  @mouseenter="showUpload"
                  @mouseout.native="showImgUrl"
                  style="height: 100px;width: 100px;background-color: #f2f3f5;border-radius: 50%;"
                  :src="userInfo.imgUrl" fit="fit">
                <div slot="error" class="image-slot"
                     style="color: #878a8e;padding-top:40px;font-size: 14px;align-items: center;">
                  点击上传头像
                </div>
              </el-image>
              <p style="font-size: 13px;font-style: normal;font-weight: 400;line-height: 22px;margin-top: 8px;color: #8a919f;">
                上传头像；大小：2M以内
                <br>
                格式：支持JPG、PNG、JPEG
              </p>
            </div>
          </el-upload>
        </el-main>
      </el-container>

      <el-footer>
        <div class="footer-body">
          <el-button type="primary" :disabled="change" @click="saveUserInfo">保存修改</el-button>
          <el-button type="primary" @click="previewHandler">预览</el-button>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      change: true,
      userInfo: {},
      temp: ''
    }
  },
  watch: {
    userInfo(oldVal, newVal) {
      this.change = false
    }
  },
  methods: {
    updateImgUrl(response, file, fileList) {
      console.log("success上传", response, file, fileList)
      this.userInfo.imgUrl = response.data
    },
    previewHandler() {
      this.$router.push("/user/" + this.userInfo.id)
    },
    saveUserInfo() {
      this.$axios.post("/user/update_user",
          this.userInfo
      ).then(resp => {
        this.$notify({
          type: "success",
          title: "保存成功",
          message: "点击预览可以从他人视角看到你的主页哟"
        })
        this.userInfo = resp.data.data
        localStorage.setItem("user", JSON.stringify(resp.data.data))
      })
    },
    showUpload() {
      this.temp = this.userInfo.imgUrl
      this.userInfo.imgUrl = ''

    },
    showImgUrl() {
      this.userInfo.imgUrl = this.temp
    },
  },
  created() {
    this.userInfo = this.$func.getLocalUser()
  }
}
</script>

<style scoped>

.input-div {
  display: flex;
  padding: 20px;
}

.input-title {
  margin: 10px;
  width: 70px;
}

.input-inner {
  width: 60%;
}

.input-inner > :first-child {
  background-color: #f2f3f5;
}

.input-inner > :first-child > :before {
  margin-right: 4px;
  color: #ee4d38;
  font-size: 14px;
  font-family: SimSun, sans-serif;
  line-height: 1;
  content: '*';
}

.el-upload {
  height: 100px;
  width: 100px;
}

.footer-body {
  margin: 300px 60px 0 0;
  padding: 0;
  background-color: #ffffff;
  text-align: right;
}

</style>