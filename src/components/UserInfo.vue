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
                      v-model="userInfo.nickname">
            </el-input>
          </div>

          <div class="input-div">
            <div class="input-title">
              个人简介
            </div>
            <el-input class="input-inner"
                      v-model="userInfo.about">
            </el-input>
          </div>
        </el-aside>
        <el-main style="align-items: center;">
          <el-upload
              style="width: 180px;height: 160px;"
              class="upload-demo"
              :limit="1"
              :on-exceed="(files, fileList)=>this.$notify({title: '上传文章封面失败',message: '请先移除之前上传的封面',type: 'error'})"
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
      userInfo: {
        nickname: '哈哈哈',
        imgUrl: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      },
      temp: ''
    }
  },
  watch: {
    userInfo(oldVal, newVal) {
      this.change = false
    }
  },
  methods: {
    saveUserInfo() {
      this.$axios.post("/user/save", {})
          .then(resp => {

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