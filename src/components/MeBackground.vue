<template>
  <div class="body">
    <el-container style="height: 100%">
      <el-aside width="200px" class="catalogue">
        <el-menu
            style="height: 100%"
            class="el-menu-vertical-demo"
            :router="true">

          <el-menu-item index="/me/user">
            <template slot="title">
              <i class="el-icon-postcard"></i>
              <span>个人资料</span>
            </template>
          </el-menu-item>

          <el-menu-item index="/me/account">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>账号设置</span>
            </template>
          </el-menu-item>

          <el-menu-item index="/me/message_center">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>消息中心</span>
            </template>
          </el-menu-item>

          <el-submenu index="#">
            <template slot="title">
              <i class="el-icon-notebook-2"></i>
              <span>文章中心</span>
            </template>
            <el-menu-item index="/me/me_article">我的文章</el-menu-item>
            <el-menu-item index="/me/star_article">收藏文章</el-menu-item>
          </el-submenu>


          <el-menu-item index="/me/audit" v-if="isPermission">
            <template slot="title">
              <i class="el-icon-time"></i>
              <span>审核中心</span>
            </template>
          </el-menu-item>

          <el-menu-item index="/me/message_manager" v-if="isPermission">
            <template slot="title">
              <i class="el-icon-s-grid"></i>
              <span>消息管理</span>
            </template>
          </el-menu-item>

        </el-menu>
      </el-aside>

      <el-main class="article-aside-main">
        <el-container>
          <el-main class="one-article-main">

            <div class="content-body">
              <router-view></router-view>
            </div>

          </el-main>
          <el-aside width="280px" class="aside-right">

            <div style="margin-top: 40px">
              <Sponsor></Sponsor>
            </div>

            <div style="margin-top: 40px">
              <SiteManager></SiteManager>
            </div>
            <div style="margin-top: 40px">
              <div style="height: 40px"></div>
            </div>

          </el-aside>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import ElementUI from 'element-ui';
import Sponsor from "../components/Sponsor";
import SiteManager from "../components/SiteManager";

export default {
  components: {
    Sponsor,
    SiteManager
  },
  name: "MeBackground.vue",
  data() {
    return {
      isPermission: false,
    }
  },
  created() {
    this.$func.isPermissionAction().then(data => {
      this.isPermission = data
    }).catch(_ => {
    });
  }
}
</script>

<style scoped>

.body {
  position: relative;
  background-color: #f2f3f5;
}

.el-card__body, .el-main {
  padding: 0;
}

.article-top {
  background-color: #ffffff;
}

.catalogue {
  background-color: #ffffff;
  margin-top: 40px;
}


.article-aside-main {
  padding-top: 40px;
  padding-left: 40px;
  padding-right: 40px;
  overflow: visible;
}

.one-article-main {
  padding-right: 40px;
  overflow: visible;
}

.aside-right {
  background-color: #ffffff;
  padding: 10px;
}

.content-body {
  background-color: #ffffff;
  height: 100%;
  padding: 20px;
}

</style>