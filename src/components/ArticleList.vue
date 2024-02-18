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
  props: ["articleList", 'opt'],

  data() {
    return {
      isPermission: false,
    }
  },

  created() {
    this.$func.isPermissionAction().then(data => {
      this.isPermission = data
    }).catch(_=>{});
  }
}
</script>

<style scoped>

</style>