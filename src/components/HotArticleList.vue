<template>
  <div>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">热帖 TOP</div>
      <div :class="!showTag?'hot-item':''" v-for="item in hotList" style="display: flex;justify-content: space-between;">
        <el-link :underline="false" :href="'/article/detail/'+item.id">{{ item.title }}</el-link>
        <div v-if="showTag" style="height: 30px;display: flex;">
          <p v-for="tag in item.tagList">
            <el-tag style="color: #eff0f1" ref="articleTag"
                    size="mini"
                    :color="tag.color"
                    @click.stop=""
                    effect="plain">{{ tag.name }}
            </el-tag>
          </p>
        </div>
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
  props: ['showTag'],

  created() {

    let expiredStorage = new ExpiredStorage();
    let hotArticleListKey = "HOT_ARTICLE_LIST";
    this.hotList = expiredStorage.get(hotArticleListKey)
    if (this.hotList) {
      return;
    }

    this.$axios.post("/article/hot_list").then(resp => {
      this.hotList = resp.data.data.content
      expiredStorage.set(hotArticleListKey, this.hotList, 60)
    })

  }
}
</script>

<style scoped>

.hot-item {
  line-height: 32px;
}
</style>