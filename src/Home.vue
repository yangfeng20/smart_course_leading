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


        <el-menu-item index="/script_list">
          <span class="menu-text">
          <i class="el-icon-s-goods"></i>
          脚本列表</span>
        </el-menu-item>


        <el-menu-item index="/script_custom">
          <span class="menu-text">
          <i class="el-icon-s-marketing"></i>
          脚本定制
          </span>
        </el-menu-item>


        <el-menu-item index="/ai_chat">
          <span class="menu-text">
          <i class="el-icon-chat-line-square"></i>
          AI(开发中)
          </span>
        </el-menu-item>

        <el-menu-item index="/article">
          <span class="menu-text">
          <i class="el-icon-document-copy"></i>
          交流广场
          </span>
        </el-menu-item>


        <el-menu-item index="/about_author">
          <span class="menu-text">
          <i class="el-icon-user"></i>
          关于作者
          </span>
        </el-menu-item>


        <el-menu-item index="/feedback">
          <span class="menu-text">
          <i class="el-icon-edit-outline"></i>
          留言反馈
          </span>
        </el-menu-item>


        <el-submenu v-if="login" index="" style="margin-right: 10px">

          <template slot="title">

            <span class="menu-text">
              <el-tooltip class="item" effect="dark" :content="username" placement="right">
              <el-image
                  style="width: 35px; height: 35px; border-radius: 80%;"
                  :src="avatarFileUrl"
                  fit="cover"></el-image>
                </el-tooltip>
            </span>

          </template>


          <el-menu-item>
            <i class="el-icon-coin"></i>
            <span v-text="'金币：'+coin_number">金币：0</span>
          </el-menu-item>
          <el-menu-item>
            <el-link :underline="false" type="primary" @click="signIn">
              <i class="el-icon-place"></i>
              签到
            </el-link>
          </el-menu-item>

          <el-menu-item>
            <el-link :underline="false" type="primary" @click="()=>this.$router.push('/me/user')">
              <i class="el-icon-setting"></i>
              我的
            </el-link>
          </el-menu-item>

          <el-menu-item>
            <el-link :underline="false" type="primary" @click="logout">
              <i class="el-icon-switch-button"></i>
              退出登录
            </el-link>
          </el-menu-item>

        </el-submenu>


        <el-menu-item v-if="!login" index="/login" style="margin-right: 10px">
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
        <el-carousel :interval="3000" type="card" height="300px">
          <el-carousel-item v-for="img in homeImgSrcList">
            <el-image :src="img.src" :fit="img.fit" :style="img.style"/>
          </el-carousel-item>
          <el-carousel-item><HotArticleList :show-tag="true"></HotArticleList></el-carousel-item>
        </el-carousel>
      </div>


      <router-view v-if="showLinkView" ref="component"></router-view>


      <!--首页展示文本-->
      <div v-if="!showLinkView" align="center" style="padding-top: 10px">
        <span style='font-size: 50px;color: #2b2d42;'>智能课程 不止课程</span>
        <!--<p>课程学习,脚本下载,社区交流，资源共享，这里都有，等待您的探索</p>-->
        <p style='font-size: 40px;font-family: Helvetica, Tahoma, Arial,serif;' v-html="textToShow"></p>
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
import HotArticleList from "./components/HotArticleList";
import Sponsor from "./components/Sponsor";

export default {

  components:{
    HotArticleList,
    Sponsor
  },

  created() {
    this.$axios.post('/user/info').then(resp => {
      let userInfo = resp.data.data
      if (!userInfo) {
        return;
      }
      this.avatarFileUrl = userInfo.imgUrl
      this.coin_number = userInfo.coin ? userInfo.coin : 0
      this.username = userInfo.name
      this.login = true
      localStorage.setItem("user", JSON.stringify(userInfo))
    }).catch(e => {

    })
  },

  methods: {

    signIn() {
      this.$axios.post('/user/sign_in').then(_ => {
        ElementUI.Message.success("签到成功")
        this.$axios.post('/user/info').then(resp => {
          let userInfo = resp.data.data
          if (!userInfo) {
            return;
          }
          this.avatarFileUrl = userInfo.imgUrl
          this.coin_number = userInfo.coin ? userInfo.coin : 0
          this.username = userInfo.name
          localStorage.setItem("user", JSON.stringify(userInfo))
        }).catch(e => {

        })
      }).catch(e => {
        ElementUI.Message.error(e)
      })
    },

    logout() {
      localStorage.clear()
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
    },

    startTypewriter() {
      if (this.currentCharIndex < this.texts[this.currentTextIndex].length) {
        let nextChar = this.texts[this.currentTextIndex][this.currentCharIndex];
        if (nextChar === '<') {
          this.isTag = true;
        }

        // 如果当前是标签内部，找到整个标签
        if (this.isTag) {
          let tagEnd = this.texts[this.currentTextIndex].indexOf('>', this.currentCharIndex) + 1;
          this.textToShow += this.texts[this.currentTextIndex].substring(this.currentCharIndex, tagEnd);
          this.currentCharIndex = tagEnd;
          this.isTag = false; // 退出标签模式
          setTimeout(this.startTypewriter, 0); // 对于标签内部，不延迟
        } else {
          // 对于普通文本，逐字显示
          this.textToShow += nextChar;
          this.currentCharIndex++;
          setTimeout(this.startTypewriter, 100); // 控制打字速度
        }
      } else {
        setTimeout(this.startErasing, 1000); // 完成打字后延迟开始擦除
      }
    },
    startErasing() {
      if (this.textToShow.length > 0) {
        if (this.textToShow[this.textToShow.length - 1] === '>') {
          // 如果当前末尾是标签的结束，找到整个标签
          let tagStart = this.textToShow.lastIndexOf('<', this.textToShow.length);
          this.textToShow = this.textToShow.substring(0, tagStart);
          this.currentCharIndex = tagStart;
          setTimeout(this.startErasing, 0); // 对于标签，不延迟
        } else {
          // 对于普通文本，逐字擦除
          this.textToShow = this.textToShow.substring(0, this.textToShow.length - 1);
          this.currentCharIndex--;
          setTimeout(this.startErasing, 100); // 控制擦除速度
        }
      } else {
        this.currentTextIndex++;
        if (this.currentTextIndex >= this.texts.length) {
          this.currentTextIndex = 0; // 循环显示文本
        }
        setTimeout(this.startTypewriter, 1000); // 延迟后开始下一句打字
      }
    }
  },
  mounted() {
    this.startTypewriter();
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
      avatarFileUrl: "",
      username: "未登录用户",
      homeImgSrcList: [
        {
          fit: "",
          style: "",
          src: require('./assets/image/home/1.jpg'),
        },
        {
          fit: "",
          style: "",
          src: require('./assets/image/home/2.jpg'),
        },
        {
          fit: "",
          style: "",
          src: require('./assets/image/home/3.png')
        },
      ],

      texts: [
        "<p style='color: #444444'>Smart Course . ltd</p>",
        "<p><span style='color: #907669'>课程学习</span> <span style='color: #8b48c4'>脚本下载</span> <span style='color: #409919'>社区交流</span> <span style='color: #c45e1b'>资源共享</span> ",
        "<p style='color: #cec08c'>Ctrl + D 可收藏网站</p>"
      ],
      currentTextIndex: 0,
      currentCharIndex: 0,
      textToShow: "",
      isTag: false, // 新增：用于标识当前处理的字符是否在HTML标签内
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