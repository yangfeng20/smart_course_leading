<template>
  <div>

    <div class="profile">
      <div class="bg-img"></div>
      <el-card class="card" shadow="hover">
        <div class="avatar">
          <img src="../assets/image/avatar.png" alt="头像">
        </div>
        <h2 class="name">{{ name }}</h2>
        <p class="desc">{{ desc }}</p>
        <div class="tags">
          <el-tag v-for="tag in tags" :key="tag">{{ tag }}</el-tag>
        </div>
      </el-card>
    </div>

    <div class="demo-image__placeholder">
      <div class="block">
        <el-image :src="src" style="width: 40%;padding-left: 5%;padding-right: 5%"> </el-image>
        <el-image :src="src" style="width: 40%;padding-left: 5%;padding-right: 5%"> </el-image>
      </div>
    </div>


  </div>

</template>


<script>
export default {
  name: 'AboutAuthor',
  data() {
    return {
      name: "maple",
      desc: "个人简介",
      tags: ['java', 'python'],
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
}
</script>


<style scoped>
.profile {
  position: relative;
  height: 400px;
}

.bg-img {
  background-image: url('../assets/image/bg01.jpg');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  filter: blur(5px) brightness(0.6);
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 60%;
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
}

.avatar {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50px;
  overflow: hidden;
  margin-bottom: 20px;
}

.name {
  font-size: 28px;
  margin-bottom: 16px;
  font-weight: bold;
}

.desc {
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
  line-height: 24px;
}

.tags {
  margin-top: 16px;
}
</style>
