<template>
  <div class="body">
    <el-container style="height: 100%">
      <el-aside width="300px" class="catalogue" >
        <el-menu
            style="height: 100%"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户</span>
            </template>
          </el-submenu>

          <el-menu-item index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>文章中心</span>
            </template>

            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-main class="article-aside-main">
        <el-container>
          <el-main class="one-article-main">
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
  name: "MeBackground.vue"
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
  padding-left: 220px;
  padding-right: 40px;
  overflow: visible;
}

.one-article-main {
  padding-right: 20px;
  overflow: visible;
}

.aside-right {
  background-color: #ffffff;
  padding: 10px;
}

</style>