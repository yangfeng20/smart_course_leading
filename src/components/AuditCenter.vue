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
    <ArticleList v-if="articleList.length" :article-list="this.articleList" :opt="true"></ArticleList>
    <el-pagination v-if="articleList.length"
                   page-size="9"
                   :total="auditPage.total"
                   :current-page.sync="auditPage.page"
                   layout="total, prev, pager, next">
    </el-pagination>
    <el-empty v-if="!articleList.length"></el-empty>
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
      auditPage: {
        page: 1,
        size: 3,
        total: 0,
      }
    }
  },

  methods: {
    search() {
      this.$axios.post('/article/search', this.auditPage.total ? {
        ...this.auditPage,
        title: this.articleTitle,
        type: this.articleType,
        status: this.articleStatus
      } : {
        title: this.articleTitle,
        type: this.articleType,
        status: this.articleStatus
      }).then(resp => {
        this.articleList = resp.data.data.content
        this.auditPage.page = resp.data.data.page
        this.auditPage.size = resp.data.data.size
        this.auditPage.total = resp.data.data.total
      })
    },
  },

  watch: {
    'auditPage.page': {
      handler: function () {
        this.search()
      }
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
