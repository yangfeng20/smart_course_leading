<template>
  <div>
    <el-card shadow="hover">
      <div slot="header" class="clearfix">热帖 TOP</div>
      <div class="hot-item" v-for="item in hotList">
        <el-link :underline="false" :href="item.href">{{ item.title }}</el-link>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "HotArticleList",
  data() {
    return {
      hotList: [
        {id: 1, title: "发布会招呼", href: 'http://localhost:8080/article/detail/2'},
        {id: 1, title: "关于我的世界来着"},
        {id: 1, title: "python的代码任何写"},
        {id: 1, title: "哈哈哈哈哈哈哈哈哈哈哈哈"},
        {id: 1, title: "java的代码任何写"},
        {id: 1, title: "java的代码任何写"},
        {id: 1, title: "java的代码任何写"},
        {id: 1, title: "java的代码任何写"},
        {id: 1, title: "java的代码任何写"},
      ]
    }
  },
}
</script>

<style scoped>

.hot-item{
  line-height: 32px;
}
</style>