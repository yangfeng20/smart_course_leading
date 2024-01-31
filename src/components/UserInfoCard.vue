<template>
  <div class="body">
    <el-card shadow="hover" @click.native="intoMe" class="user-card">
      <el-row :gutter="30">
        <el-col :span="5">
          <el-avatar :src="userInfo.imgUrl"></el-avatar>
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
        <el-col :span="12">1</el-col>
        <el-col :span="12">12</el-col>
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
      this.$router.push('/user/' + this.userInfo.id)
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