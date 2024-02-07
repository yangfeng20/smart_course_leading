<template>
  <div>
    <ArticleListItem v-for="article in articleList" :article="article" :opt="opt"></ArticleListItem>
  </div>
</template>

<script>
import ArticleListItem from "../components/ArticleListItem";

export default {
  name: "ArticleList",
  components: {
    ArticleListItem,
  },
  props:["articleList", 'opt'],

  data() {
    return {
    }
  },

  created() {

  }
}
</script>

<style scoped>

</style>