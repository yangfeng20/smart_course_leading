<template>
  <div></div>
</template>

<script>
import ElementUI from 'element-ui'

export default {
  name: "ArticleDetail",
  data() {
    return {
      article: {}
    }
  },

  methods: {
    isIntegerString(str) {
      // 检查字符串是否只包含数字字符
      const isNumberString = /^[0-9]*$/.test(str);

      // 检查字符串是否以数字开头
      const startsWithNumber = !isNaN(parseInt(str.charAt(0)));

      // 检查字符串是否为整数
      const isInteger = !isNaN(Number(str));

      return isNumberString && startsWithNumber && isInteger;
    }
  },
  created() {
    let pathArr = this.$route.path.split("/");
    let articleId = pathArr[pathArr.length - 1];
    console.log(articleId)
    if (!this.isIntegerString(articleId)) {
      console.log("跳转list")
      this.$router.push("/article")
      return;
    }

    this.$axios.post('/article' + articleId).then(resp => {
      let article = resp.data.data
      if (article) {
        this.article = article;
      }
      ElementUI.Message.warning("文章不存在，正在跳转列表")
      setTimeout(() => {
        this.$router.push("/article")
      }, 2000)
    }).catch(_ => {
    })
  },
}
</script>

<style scoped>

</style>