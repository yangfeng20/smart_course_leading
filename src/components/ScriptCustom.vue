<template>

  <div>

    <el-button type="primary" icon="el-icon-edit" @click="dialog = true">新增定制</el-button>

    <div class="script-row" v-for="(row, index) in rowList" :key="index">
      <div class="script-block" v-for="(custom, index) in row" :key="index">
        <div class="script-info">
          <div class="script-info-inner">{{ custom.applyName }}</div>
          <div class="script-info-inner">{{ custom.applyStatus.desc }}</div>
          <div class="script-info-inner">{{ custom.createdDate }}</div>
        </div>
      </div>
    </div>

    <el-pagination
        :current-page.sync="customPage.page"
        :page-size.sync="customPage.size"
        :total="customPage.total"
        layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

    <!-- 侧边栏抽屉-->
    <el-drawer
        title="新增脚本定制申请"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
        :size="'40%'"
    >
      <div class="demo-drawer__content">
        <el-form :model="scriptCustomApplyForm">

          <el-form-item label="申请名称" :label-width="formLabelWidth">
            <el-input v-model="scriptCustomApplyForm.applyName" autocomplete="off" placeholder="需要定制的脚本简短描述"></el-input>
          </el-form-item>

          <el-form-item label="申请描述" :label-width="formLabelWidth">
            <el-input v-model="scriptCustomApplyForm.applyContent" autocomplete="off" placeholder="需要定制的脚本简短描述"></el-input>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">关 闭</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">
            {{ loading ? '提交中 ...' : '确 定' }}
          </el-button>
        </div>
      </div>
    </el-drawer>


  </div>
</template>

<script>
export default {
  name: "ScriptCustom",
  data() {
    return {
      customList: [
        {applyName: '职教云1.0', applyStatus: {desc: "已提交"}, createdDate: "2020-23-12 23:23:00"},
        {applyName: '职教云1.0', applyStatus: {desc: "已提交"}, createdDate: "2020-23-12 23:23:00"},
      ],
      customPage: {
        page: 1,
        size: 10,
        total: 10
      },


      dialog: false,
      loading: false,
      scriptCustomApplyForm: {
        applyName: '',
        applyContent: '',
      },
      formLabelWidth: '80px',
      timer: null,
    }
  },

  methods: {
    searchScriptCustom() {
      this.$axios.post("/script_apply/search", {}).then(resp => {
        let customListResult = resp.data.data;
        this.customList = customListResult.content === null ? [] : customListResult.content;
        this.customPage.total = customListResult.total;
        this.customPage.page = customListResult.page;
        this.customPage.size = customListResult.size;
      })
    },

    addScriptCustomApply() {

    },

    handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定提交脚本定制申请吗？')
          .then(_ => {
            this.addScriptCustomApply();
            this.loading = true;
            this.timer = setTimeout(() => {
              done();
              // 动画关闭需要一定的时间
              setTimeout(() => {
                this.loading = false;
              }, 400);
            }, 1000);
          })
          .catch((e) => {
            // 点击取消或者叉号,都不关闭
            // this.cancelForm()
          });
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }

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