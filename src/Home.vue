<template>
  <div style="background-color:rgba(255,255,255,0.5);" class="home-body">


    <div class="page-header">
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          @select="selectMenu"
          active-text-color="#ffd04b"
          :router="true">


        <el-menu-item index="/">
          <span class="menu-text">
            <el-image
                style="width: 70px; height: 70px; border-radius: 30%;"
                :src="require('./assets/logo.png')"
                fit="contain"></el-image>
            </span>
        </el-menu-item>


        <el-menu-item index="script_list">
          <span class="menu-text">
          <i class="el-icon-s-goods"></i>
          脚本列表</span>
        </el-menu-item>


        <el-menu-item index="script_custom">
          <span class="menu-text">
          <i class="el-icon-s-marketing"></i>
          脚本定制
          </span>
        </el-menu-item>


        <el-menu-item index="ai_chat">
          <span class="menu-text">
          <i class="el-icon-chat-line-square"></i>
          AI会话
          </span>
        </el-menu-item>

        <el-menu-item index="article">
          <span class="menu-text">
          <i class="el-icon-document-copy"></i>
          交流广场
          </span>
        </el-menu-item>


        <el-menu-item index="about_author">
          <span class="menu-text">
          <i class="el-icon-user"></i>
          关于作者
          </span>
        </el-menu-item>


        <el-menu-item index="feedback">
          <span class="menu-text">
          <i class="el-icon-edit-outline"></i>
          留言反馈
          </span>
        </el-menu-item>


        <el-submenu v-if="login" index="" style="margin-right: 10px">
          <template slot="title">
            <span class="menu-text">
              <el-image
                  style="width: 35px; height: 35px; border-radius: 80%;"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                  fit="cover"></el-image>
            </span>
          </template>


          <el-menu-item>
            <i class="el-icon-coin"></i>
            <span v-text="'金币：'+coin_number">金币：0</span>
          </el-menu-item>
          <el-menu-item>
            <el-link :underline="false" type="primary" @click="signIn">
              <i class="el-icon-place"></i>
              签到</el-link>
          </el-menu-item>
          <el-menu-item>
            <el-link :underline="false" type="primary" @click="logout">
              <i class="el-icon-switch-button"></i>
              退出登录</el-link>
          </el-menu-item>
        </el-submenu>


        <el-menu-item v-if="!login" index="user" style="margin-right: 10px">
          <span class="menu-text">
            <i class="el-icon-position"></i>
              点击登录
          </span>
        </el-menu-item>

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
import ElementUI from "element-ui";

export default {

  created() {
    this.$axios.post('/user/info').then(resp => {
      let userInfo = resp.data.data
      if (!userInfo) {
        return;
      }
      this.coin_number = userInfo.coin ? userInfo.coin : 0
      this.login = true
      localStorage.setItem("user", JSON.stringify(userInfo))
    })
  },

  methods: {

    signIn() {
      this.$axios.post('/user/sign_in').then(_ => {
        ElementUI.Message.success("签到成功")
      }).catch(e => {
        ElementUI.Message.info(e)
      })
    },

    logout() {
      localStorage.clear()
      this.$axios.post('/user/logout', {}).then(_ => {
        ElementUI.Message.success("退出登录成功")
        location.href = '/'
      })
    },

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
      login: false,
      coin_number: 0,
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
.home-body {
  /*position: absolute;*/
  width: auto;
  height: 801px;
  top: 0;
  /*overflow-y: hidden;*/
}

.el-carousel__item {
  border-radius: 10px;
}


.menu-text {
  margin-left: 30px;
  margin-right: 30px;
}


</style>