<template>
  <div style="background-color:rgba(255,255,255,0.5);" class="aaa">


    <div class="page-header">
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          @select="selectMenu"
          active-text-color="#ffd04b"
          :router="true">

        <!--<el-col :span="6">-->
          <el-menu-item index="/">
          <span class="menu-text">
            <el-image
                style="width: 70px; height: 70px; border-radius: 30%;"
                :src="require('./assets/logo.png')"
                fit="contain"></el-image>
            </span>
          </el-menu-item>
        <!--</el-col>-->

        <!--<el-col :span="6">-->
          <el-menu-item index="script_list">
          <span class="menu-text">
          <i class="el-icon-s-goods"></i>
          脚本列表</span>
          </el-menu-item>
        <!--</el-col>-->

        <!--<el-col :span="6">-->
          <el-menu-item index="script_custom">
          <span class="menu-text">
          <i class="el-icon-s-marketing"></i>
          脚本定制
          </span>
          </el-menu-item>
        <!--</el-col>-->

        <!--<el-col :span="6">-->
          <el-menu-item index="about_author">
          <span class="menu-text">
          <i class="el-icon-user"></i>
          关于作者
          </span>
          </el-menu-item>
        <!--</el-col>-->

        <!--<el-col :span="6">-->
          <el-menu-item index="feedback">
          <span class="menu-text">
          <i class="el-icon-user"></i>
          留言反馈
          </span>
          </el-menu-item>
        <!--</el-col>-->

        <!--<el-col :span="6">-->
          <el-menu-item index="user" style="margin-right: 10px">
          <span class="menu-text">
          <!--<i class="el-icon-user"></i>-->
              <el-image
                  style="width: 35px; height: 35px; border-radius: 80%;"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"></el-image>
          </span>
          </el-menu-item>
        <!--</el-col>-->
      </el-menu>
    </div>

    <!--<div style="height: 10px"></div>-->

    <div>
      <div class="home-show" v-if="!showLinkView" style="background-color:rgba(255,255,255,0.5);">
        <el-carousel :interval="2000" type="card" height="300px">
          <el-carousel-item><img :src="require('./assets/image/home/1.jpg')" alt="" width="100%"></el-carousel-item>
          <el-carousel-item><img :src="require('./assets/image/home/2.jpg')" alt="" width="100%"></el-carousel-item>
          <el-carousel-item><img :src="require('./assets/image/home/3.png')" alt="" width="104%"></el-carousel-item>
          <el-carousel-item><img :src="require('./assets/image/home/4.jpg')" alt="" width="40%"></el-carousel-item>
        </el-carousel>
      </div>


      <router-view v-if="showLinkView" ref="component"></router-view>


      <!--首页展示文本-->
      <div v-if="!showLinkView" align="center" style="padding-top: 10px">
        <h1>智能课程</h1>
        <p>你的学习好帮手</p>
        <p>由于很多人使用脚本的过程中出现各种问题，同时无法沟通的问题，创建了一个群，可扫描上方二维码添加</p>
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
      // if (this.$route.path === '/') {
      //   this.showLinkView = false
      // } else {
      //   this.showLinkView = true
      // }
      // this.$router.push({path: "/" + e})
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
  /*position: absolute;*/
  width: auto;
  height: auto;
  top: 0;
  /*overflow-y: hidden;*/
}

.el-carousel__item {
  border-radius: 10px;
}


.menu-text {
  /*padding-left: 20%;*/
}
</style>