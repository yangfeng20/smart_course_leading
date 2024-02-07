<template>
  <div>
    <ArticleList :article-list="articleList"></ArticleList>
  </div>
</template>

<script>
import ArticleList from '../components/ArticleList'

export default {
  name: "StarArticle",
  components: {
    ArticleList,
  },

  data() {
    return {
      articleList: []
    }
  },


  created() {
    this.$axios.post('/article/get_my_start_article_list', {}).then(resp => {
      this.articleList = resp.data.data.content
    })
  }
}
</script>

<style scoped>

</style>