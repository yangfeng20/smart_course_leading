<template>
  <div style="background-color:rgba(255,255,255,0.5);" class="aaa">


    <div>
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          @select="selectMenu"
          active-text-color="#ffd04b">

        <el-col :span="6">


          <el-menu-item index="script_list">
          <span class="menu-text">
          <i class="el-icon-s-goods"></i>
          脚本列表</span>
          </el-menu-item>
        </el-col>

        <el-col :span="6">
          <el-menu-item index="script_custom">
          <span class="menu-text">
          <i class="el-icon-s-marketing"></i>
          脚本定制
          </span>
          </el-menu-item>
        </el-col>

        <el-col :span="6">
          <el-menu-item index="about_author">
          <span class="menu-text">
          <i class="el-icon-user"></i>
          关于作者
          </span>
          </el-menu-item>
        </el-col>

        <el-col :span="6">
          <el-menu-item index="feedback">
          <span class="menu-text">
          <i class="el-icon-user"></i>
          留言反馈
          </span>
          </el-menu-item>
        </el-col>
      </el-menu>
    </div>

    <div style="height: 10px"></div>

    <div>
      <div class="home-show" v-if="!showLinkView" style="background-color:rgba(255,255,255,0.5);">
        <el-carousel :interval="2000" type="card" height="300px">
          <el-carousel-item><img :src="require('./assets/image/home/1.png')" alt="" width="110%"></el-carousel-item>
          <el-carousel-item><img :src="require('./assets/image/home/2.jpg')" alt="" width="130%"></el-carousel-item>
          <el-carousel-item><img :src="require('./assets/image/home/3.png')" alt="" width="104%"></el-carousel-item>
        </el-carousel>
      </div>


      <router-view v-if="showLinkView" ref="component"></router-view>


      <!--首页展示文本-->
      <div v-if="!showLinkView" align="center" style="padding-top: 10px">
        <h1>智能课程</h1>
        你的学习好帮手
      </div>


      <footer v-if="!showLinkView" style="position: absolute;bottom: 8px; left: 42%">
        <p><a href="https://beian.miit.gov.cn/" style="margin-left: 10px;" target="_blank" rel="noopener">备案号:
          鄂ICP备2023005929号-1</a></p>
      </footer>
    </div>


  </div>
</template>


<script>
export default {
  methods: {
    selectMenu(e) {
      if (this.$route.path === '/') {
        this.showLinkView = false
      } else {
        this.showLinkView = true
      }
      this.$router.push({path: "/" + e})
    }
  },
  watch: {
    $route() {
      if (this.$route.path === '/') {
        this.showLinkView = false
      } else {
        this.showLinkView = true
      }
    },
  },
  data() {
    return {
      // 显示管理的路由视图
      showLinkView: true,
    }
  }

}
</script>

<style>

.home-show {
  /*height: 100px;*/
  background-image: linear-gradient(-180deg, #c6c4db 0%, #c1d6dc 100%);
  /*background-image: url("../images/bg_login.png");*/
  background-repeat: no-repeat;
  background-size: cover;
  /*height: 100%;*/
}

/* 合并home组件和background组件*/
.aaa {
  position: absolute;
  width: 99%;
  height: 110%;
  top: 0;
  overflow-y: hidden;
}

.el-carousel__item {
  border-radius: 10px;
}


.menu-text {
  padding-left: 20%;
}
</style>