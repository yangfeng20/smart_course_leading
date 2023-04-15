<template>
  <div class="block-list">

    <div class="search-bar" style="margin-top: 3%; display: flex;margin-left: 10px;">
      <el-input style="width: 40%"
                ref="searchInput"
                placeholder="搜索脚本"
                v-model="searchInput"
                clearable
                @keydown.enter.native="searchScript"
      >
      </el-input>
      <el-button type="primary" icon="el-icon-search" :loading="listLoading" @click="searchScript"
                 style="margin-left: 10px">搜索
      </el-button>
      <el-button type="primary" icon="el-icon-edit" @click="saveScript($event)" v-show="isPermission">新增脚本</el-button>
    </div>

    <div class="data-page">
      <div class="data-list-div">
        <el-row :gutter="1">
          <el-col v-for="(script, index) in scriptList" :key="index" :span="8">
            <div class="data-info">
              <div class="script-info-inner">脚本名称：
                <el-link type="primary" @click="inDetail($event, script.id)">{{ script.scriptName }}</el-link>
              </div>
              <div class="script-info-inner">脚本简介：{{ script.scriptDesc }}</div>
              <div class="script-info-inner">下载量：{{ script.downloadCount }}</div>
              <el-button v-show="isPermission" type="primary" icon="el-icon-edit" circle
                         @click="saveScript($event, script.id)"></el-button>
            </div>
          </el-col>
        </el-row>
        <!--空白占位；用于展示分页组件-->
        <el-row>
          <div style="height: 40px"></div>
        </el-row>
      </div>
      <div class="pagination-wrapper">
        <el-pagination
            :current-page.sync="scriptPage.page"
            :page-size.sync="scriptPage.size"
            :total="scriptPage.total"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>

        <el-empty v-show="isShowEmptyList" description="没有满足条件的脚本"></el-empty>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      listLoading: false,
      searchInput: "",
      scriptList: [],
      scriptPage: {
        page: 1,
        size: 20,
        total: 100,
      },
      isPermission: false,
    }
  },
  methods: {
    saveScript(e, id) {
      this.$router.push({path: "/script_save", query: {id}})
    },
    inDetail(e, id) {
      this.$router.push({path: "/script_detail", query: {id}})
    },
    searchScript() {
      this.listLoading = true
      this.$axios.post("/script_info/search",
          {
            scriptName: this.searchInput.trim(),
            ...this.scriptPage
          }
      ).then(resp => {
        let result = resp.data.data;
        this.scriptList = result.content;
        this.scriptPage.total = result.total;
        if (result.page) {
          this.scriptPage.page = result.page;
        }
        if (result.size) {
          this.scriptPage.size = result.size;
        }
      }).catch(error => {
      }).finally(() => {
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      })
    },
    getCookie(cookieName) {
      const cookies = document.cookie.split("; ")
      for (let i = 0; i < cookies.length; i++) {
        const [name, value] = cookies[i].split("=")
        if (name === cookieName) {
          return decodeURIComponent(value)
        }
      }
      return ""
    },
    isPermissionAction() {
      let token = this.getCookie("token");
      if (!token) {
        return;
      }

      this.$axios.post("/auth/query_permission", {
        token,
        pageUrl: this.$route.path
      }).then(resp => {
        this.isPermission = resp.data.data
      })
    },
  },

  created() {
    this.searchScript()
    this.isPermissionAction()
  },

  watch: {
    'scriptPage.page': {
      handler: function () {
        // 发送请求获取当前页的数据
        this.searchScript();
      }
    },
    'scriptPage.size': {
      handler: function () {
        // 发送请求获取当前页的数据
        this.searchScript();
      }
    }
  },
  computed: {
    isShowEmptyList() {
      return !this.scriptList.length;
    },
  }
}
</script>

<style scoped>

.data-info {
  height: 150px;
  margin: 10px;
  padding-top: 30px;
  padding-left: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.data-page {
  position: relative;
}

.el-pagination {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
