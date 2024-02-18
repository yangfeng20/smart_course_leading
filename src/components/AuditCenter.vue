<template>
  <div>
    <ArticleList :article-list="this.articleList" :opt="true"></ArticleList>
  </div>
</template>

<script>
import ArticleList from '../components/ArticleList'

export default {
  name: "AuditCenter",
  components: {
    ArticleList,
  },

  data() {
    return {
      articleList: []
    }
  },

  created() {
    this.$axios.post('/article/get_adminer_article_list').then(resp => {
      this.articleList = resp.data.data.content
    })
  }
}
</script>

<style scoped>

</style>