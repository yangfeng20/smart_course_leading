<template>
  <div class="body-user">
    <el-card shadow="hover" class="user-card">
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
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "UserInfoCard",
  props: ['userInfo'],
  methods: {
  }
}
</script>

<style scoped>

.body-user {

}

.userInfo-name {
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #7d899c;
  position: relative;
  top: 10px;
  left: 5px;
}

.user-card{
  background-color: #f2f3f5;
  height: 75px;
}

.user-card:hover {
  cursor: pointer;
}

</style>