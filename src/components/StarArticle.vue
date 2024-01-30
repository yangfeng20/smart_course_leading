<template>
  <div>
    <ArticleListItem :article="article" :opt="false"></ArticleListItem>
  </div>
</template>

<script>
import ArticleListItem from "../components/ArticleListItem";

export default {
  name: "StarArticle",
  components: {
    ArticleListItem,
  },

  data() {
    return {
      article: {
        id: 1,
        title: "测试文章标题",
        content: "测试文章内容-ABDCDDIOWFJEIOJO",
        author: "作者",
        status:"审核中",
        readingQuantity: 120,
        starQuantity: 4,
        createdDate: '2023-10-23',
        updatedDate: '2024-10-23',
        type: {
          key: "任务",
        },
        coverImgUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        tagList: [{name: "大数据", color: "red"}, {name: "😂", color: "#956363"}, "java", "java", "javaaaaaaa", "javavvvv"]
      },
    }
  },


  created() {
    this.$axios.post('/article/get_my_start_article_list').then(resp=>{
      this.article = resp.data.data
    })
  }
}
</script>

<style scoped>

</style>