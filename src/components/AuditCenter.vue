<template>
  <div>
    <el-input placeholder="请输入内容" v-model="articleTitle" class="input-with-select" @keyup.native.enter="search">

      <el-select v-model="articleType" slot="prepend" placeholder="请选择">
        <el-option label="全部" value="0"></el-option>
        <el-option v-for="item in typeList" :label="item.desc" :value="item.key"></el-option>
      </el-select>

      <el-select v-model="articleStatus" slot="prepend" placeholder="请选择">
        <el-option label="全部" value="0"></el-option>
        <el-option v-for="item in statusList" :label="item.desc" :value="item.key"></el-option>
      </el-select>

      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>

    </el-input>
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
      typeList: [],
      statusList: [],
      articleList: [],
      articleTitle: "",
      articleType: "",
      articleStatus: "",
    }
  },

  methods: {
    search() {
      this.$axios.post('/article/search', {
        title: this.articleTitle,
        type: this.articleType,
        status: this.articleStatus
      }).then(resp => {
        this.articleList = resp.data.data.content
      })
    },
  },

  created() {

    this.$axios.post("/article/get_all_type").then(resp => {
      this.typeList = resp.data.data
    }).catch(_ => {
    })

    this.$axios.post("/article/get_all_status").then(resp => {
      this.statusList = resp.data.data
    }).catch(_ => {
    })

    this.search()
  }
}
</script>

<style scoped>
.el-select {
  width: 150px;
}
</style>