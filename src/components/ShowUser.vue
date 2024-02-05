<template>
  <div class="body">
    <el-container style="height: 100%">
      <el-aside v-if="true" width="300px" class="catalogue">
        <el-button v-if="this.$func.isPermissionAction()" @click="sendMessage" type="primary" icon="el-icon-message"
                   style="width: 80%;margin: 10px;">发消息
        </el-button>
      </el-aside>

      <el-main class="article-aside-main">
        <el-container>
          <el-main class="one-article-main">

            <div class="content-body">
              <div style="margin-bottom: 40px;">
                <UserInfoCard :user-info="userInfo"></UserInfoCard>
              </div>

              <ArticleList :article-list="this.articleList"></ArticleList>
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
      userInfo: {},
      articleList: []
    }
  },
  methods: {
    sendMessage() {
      this.$router.push("/me/message_center/" + this.userInfo.id)
    },
  },
  created() {
    let pathArr = this.$route.path.split("/");
    let userId = pathArr[pathArr.length - 1];
    this.$axios.post("/user/info?userId=" + userId).then(resp => {
      this.userInfo = resp.data.data
    })

    this.$axios.post('/article/search', {
      author: userId,
    }).then(resp => {
      this.articleList = resp.data.data.content
    })
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