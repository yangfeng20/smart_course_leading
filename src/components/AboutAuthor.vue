<template>
  <div>

    <div class="profile">
      <div class="bg-img"></div>
      <el-card class="card" shadow="hover">
        <div class="avatar">
          <img src="../assets/image/avatar.png" alt="头像" width="180">
        </div>
        <h2 class="name">{{ name }}</h2>
        <p class="desc" v-html="desc"></p>
        <div class="tags">
          <el-tag v-for="tag in tags" :key="tag" style="margin: 4px">{{ tag }}</el-tag>
        </div>
        <el-divider></el-divider>
        <div>作者是个俗人，服务器和域名都是需要开销的，脚本也是作者抽空写的；可以扫描下方的二维码适当支持一下哟。</div>
      </el-card>

    </div>

    <div class="demo-image__placeholder">
      <div class="block">
        <el-image :src="require('../assets/image/wx.jpg')"
                  style="width: 30%;padding-left: 10%;padding-right: 10%"></el-image>
        <el-image :src="require('../assets/image/zfb.jpg')"
                  style="width: 30%;padding-left: 10%;padding-right: 10%"></el-image>
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
      desc: "无论人生上到哪一层台阶，阶下有人在仰望你，阶上亦有人在俯视你。<br/>你抬头自卑，低头自得，唯有平视，才能看见真实的自己。",
      tags: ['Java', 'Python', "架构", "爬虫"],
    }
  },
}
</script>


<style scoped>
.profile {
  position: relative;
  height: 400px;
  padding: 40px;
}

.block {
  padding: 50px;
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
