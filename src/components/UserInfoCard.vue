<template>
  <div class="body">
    <el-card shadow="hover" @click.native="intoMe" class="user-card">
      <el-row :gutter="30">
        <el-col :span="5">
          <el-image
              style="width: 35px; height: 35px; border-radius: 80%;"
              :src="userInfo.imgUrl"
              fit="cover"></el-image>
        </el-col>
        <el-col :span="18">
          <el-row>
            <span class="userInfo-name">
              {{ userInfo.name }}
            </span>
          </el-row>
          <el-row>
            <span class="userInfo-about">
              {{ userInfo.briefInfo }}
            </span>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="data-count count-number">
        <el-col :span="12">{{ this.userInfo.articleCount }}</el-col>
        <el-col :span="12">{{ this.userInfo.starArticleCount }}</el-col>
      </el-row>
      <el-row class="data-count count-text">
        <el-col :span="12">文章</el-col>
        <el-col :span="12">收藏</el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserInfoCard",
  props: ['userInfo'],
  methods: {
    intoMe() {
      let userId = this.userInfo.userId ? this.userInfo.userId : this.userInfo.id
      let path = '/user/' + userId;
      if (this.$route.path === path) {
        return;
      }
      this.$router.push(path)
    },
  }
}
</script>

<style scoped>

.body {
  background-color: #ffffff;
}

.userInfo-name {
  font-size: 18px;
  font-weight: 500;
}

.userInfo-about {
  font-size: 14px;
  color: #74777e;
}

.data-count {
  padding-left: 15px;
  padding-top: 5px;
}

.count-text {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #7D899C;
}

.user-card:hover {
  cursor: pointer;
}

</style>