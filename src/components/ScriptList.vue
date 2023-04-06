<template>
  <div class="block-list">
    <div class="search-bar">
      <el-input
          placeholder="搜索脚本"
          v-model="searchInput"
          clearable>
      </el-input>
      <el-button type="primary" icon="el-icon-search" @click="searchScript">搜索</el-button>
    </div>

    <div class="script-row" v-for="(row, index) in rowList" :key="index">
      <div class="script-block" v-for="(script, index) in row" :key="index">
        <div class="script-info">
          <div class="script-info-inner">{{ script.scriptName }}</div>
          <div class="script-info-inner">{{ script.scriptDesc }}</div>
          <div class="script-info-inner">{{ script.downloadCount }}</div>
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
        {scriptName: '数学', scriptDesc: '王老师', downloadCount: '周二 10:15-12:00'},
        {scriptName: '英语', scriptDesc: '李老师', downloadCount: '周三 14:00-15:45'},
        {scriptName: '物理', scriptDesc: '赵老师', downloadCount: '周四 16:15-18:00'},
        {scriptName: '化学', scriptDesc: '刘老师', downloadCount: '周五 13:30-15:15'},
        {scriptName: '生物', scriptDesc: '陈老师', downloadCount: '周六 9:00-10:45'}
      ],
      scriptPage: {
        page: 1,
        size: 20,
        total: 100,
      }
    }
  },
  methods: {
    searchScript() {

      this.$axios.post("/script_info/search",
          {
            scriptName: this.searchInput.trim()
          }
      ).then(resp => {
        let scriptSearchResult = resp.data.data;
        this.scriptList = scriptSearchResult.content;
        this.scriptPage.total = scriptSearchResult.total;
        this.scriptPage.page = scriptSearchResult.page;
        this.scriptPage.size = scriptSearchResult.size;
      })

    },
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
