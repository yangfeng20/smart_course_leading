<template>
  <div>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">热帖 TOP</div>
      <div class="hot-item" v-for="item in hotList">
        <el-link :underline="false" :href="'/article/detail/'+item.id">{{ item.title }}</el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import {ExpiredStorage} from "../js/definition";

export default {
  name: "HotArticleList",
  data() {
    return {
      hotList: []
    }
  },

  created() {

    let expiredStorage = new ExpiredStorage();
    let hotArticleListKey = "HOT_ARTICLE_LIST";
    this.hotList = expiredStorage.get(hotArticleListKey)
    console.log("存储结构：", this.hotList)
    if (this.hotList) {
      return;
    }

    this.$axios.post("/article/hot_list").then(resp => {
      this.hotList = resp.data.data.content
      expiredStorage.set(hotArticleListKey, this.hotList,60)
    })

  }
}
</script>

<style scoped>

.hot-item {
  line-height: 32px;
}
</style>