<template>
  <div class="block-list">
    <br/>
    <br/>
    <br/>
    <div class="search-bar" style="margin-top: 3%; display: flex">
      <el-input
          ref="searchInput"
          placeholder="搜索脚本"
          v-model="searchInput"
          clearable
          @keydown.enter.native="searchScript"
      >
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchScript">搜索</el-button>
      <el-button type="primary" icon="el-icon-edit" @click="saveScript($event)" v-show="isPermission">新增脚本</el-button>
    </div>

    <div class="script-row" v-for="(row, index) in rowList" :key="index">
      <div class="script-block" v-for="(script, index) in row" :key="index">
        <div class="script-info">
          <div class="script-info-inner">脚本名称：
            <el-link type="primary" @click="inDetail($event, script.id)">{{ script.scriptName }}</el-link>
          </div>
          <div class="script-info-inner">脚本简介：{{ script.scriptDesc }}</div>
          <div class="script-info-inner">下载量：{{ script.downloadCount }}</div>
          <el-button v-show="isPermission" type="primary" icon="el-icon-edit" circle
                     @click="saveScript($event, script.id)"></el-button>
        </div>
      </div>
    </div>

    <el-pagination
        :current-page.sync="scriptPage.page"
        :page-size.sync="scriptPage.size"
        :total="scriptPage.total"
        layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: "",
      scriptList: [
        {scriptName: '职教云1.0', scriptDesc: '职教云刷课脚本', downloadCount: 2},
      ],
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
      this.$axios.post("/script_info/search",
          {
            scriptName: this.searchInput.trim(),
            ...this.scriptPage
          }
      ).then(resp => {
        let scriptSearchResult = resp.data.data;
        this.scriptList = scriptSearchResult.content;
        this.scriptPage.total = scriptSearchResult.total;
        this.scriptPage.page = scriptSearchResult.page;
        this.scriptPage.size = scriptSearchResult.size;
      }).catch(error => {
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
    rowList() {
      let result = []
      let tempRow = []
      this.scriptList.forEach((script, index) => {
        if (index % 2 === 0 && index !== 0) {
          result.push(tempRow)
          tempRow = []
        }
        tempRow.push(script)
        if (index === this.scriptList.length - 1) {
          result.push(tempRow)
        }
      })
      return result
    }
  }
}
</script>

<style>
.block-list {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.script-row {
  display: flex;
  width: 100%;
  margin: 10px 0;
}

.script-block {
  width: calc(50% - 20px);
  margin: 0 10px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.script-info {
  width: 50%;
  text-align: center;
}

.script-info-inner {
  width: 50%;
}

.search-bar {
  /*width: 50%;*/
  margin-bottom: 20px;
}
</style>
