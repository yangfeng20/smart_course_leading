<template>
  <div class="body">
    <el-container style="height: 100%">
      <el-aside v-if="true" width="300px" class="catalogue">
        留言：权限
      </el-aside>

      <el-main class="article-aside-main">
        <el-container>
          <el-main class="one-article-main">

            <div class="content-body">
              <div style="margin-bottom: 40px;">
                <UserInfoCard :user-info="userInfo"></UserInfoCard>
              </div>

              <ArticleList></ArticleList>
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
import ArticleList from "../components/ArticleList";
import UserInfoCard from "../components/UserInfoCard";
import Sponsor from "../components/Sponsor";
import SiteManager from "../components/SiteManager";


export default {
  name: "ShowUser",
  components: {
    ArticleList,
    UserInfoCard,
    Sponsor,
    SiteManager
  },
  data() {
    return {
      userInfo: {
        userId: 35,
        name: "test_8fb",
        imgUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
        briefInfo: "我是简介,hahahahhf我发较为覅偶尔哦",
        articleCount: 93,
        starArticleCount: 48
      },
    }
  }
}
</script>

<style scoped>
.body {
  position: relative;
  background-color: #f2f3f5;
}

.el-card__body, .el-main {
  min-height: 800px;
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