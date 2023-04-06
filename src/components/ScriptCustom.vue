<template>

  <div>
    <div class="script-row" v-for="(row, index) in rowList" :key="index">
      <div class="script-block" v-for="(custom, index) in row" :key="index">
        <div class="script-info">
          <div class="script-info-inner">{{ custom.scriptName }}</div>
          <div class="script-info-inner">{{ custom.scriptDesc }}</div>
          <div class="script-info-inner">{{ custom.downloadCount }}</div>
        </div>
      </div>
    </div>

    <el-pagination
        :current-page.sync="customPage.page"
        :page-size.sync="customPage.size"
        :total="customPage.total"
        layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: "ScriptCustom",
  data() {
    return {
      customList: [
        {customName: '职教云1.0', customDesc: '职教云刷课脚本', downloadCount: 2},
        {customName: '数学', customDesc: '王老师', downloadCount: '周二 10:15-12:00'},
        {customName: '英语', customDesc: '李老师', downloadCount: '周三 14:00-15:45'},
      ],
      customPage: {
        page: 1,
        size: 10,
        total: 10
      }
    }
  },

  methods: {
    searchScriptCustom() {
      this.$axios.post("/script_info/search", {}).then(resp => {
        let customListResult = resp.data.data;
        this.customList = customListResult.content;
        this.customPage.total = customListResult.total;
        this.customPage.page = customListResult.page;
        this.customPage.size = customListResult.size;
      })
    },
  },

  created() {
    this.searchScriptCustom();
  },

  watch: {
    'customPage.page': {
      handler: function () {
        // 发送请求获取当前页的数据
        this.searchScriptCustom();
      }
    },
    'customPage.size': {
      handler: function () {
        // 发送请求获取当前页的数据
        this.searchScriptCustom();
      }
    }
  },

  computed: {
    rowList() {
      let result = []
      let tempRow = []
      this.customList.forEach((script, index) => {
        if (index % 2 === 0 && index !== 0) {
          result.push(tempRow)
          tempRow = []
        }
        tempRow.push(script)
        if (index === this.customList.length - 1) {
          result.push(tempRow)
        }
      })
      return result
    }
  }
}
</script>

<style scoped>


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

</style>