<template>
  <div>
    <ArticleListItem v-for="article in articleList" :article="article" :opt="false"></ArticleListItem>
  </div>
</template>

<script>
import ArticleListItem from "../components/ArticleListItem";

export default {
  name: "ArticleList",
  components: {
    ArticleListItem,
  },
  props:["articleList"],

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