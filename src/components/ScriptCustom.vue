<template>

  <div>

    <el-button type="primary" icon="el-icon-refresh" @click="refreshList">刷新列表</el-button>
    <el-button type="primary" icon="el-icon-edit" @click="dialog = true">新增定制</el-button>

    <div class="script-row" v-for="(row, index) in rowList" :key="index">
      <div class="script-block" v-for="(custom, index) in row" :key="index">
        <div class="script-info">
          <div class="script-info-inner" v-show="isPermission">申请Id：
            <el-link type="primary" @click="inDetail">{{ custom.id }}</el-link>
          </div>
          <div class="script-info-inner">申请名称：{{ custom.applyName }}</div>
          <div class="script-info-inner">网站地址：
            <el-link :href="custom.website" target="_blank" :underline="false"><i
                class="el-icon-view el-icon--right"></i> {{ custom.website }}
            </el-link>
          </div>
          <div class="script-info-inner">申请状态：
            <el-tag>{{ custom.applyStatus?.desc }}</el-tag>
          </div>
          <div class="script-info-inner">申请时间：{{ custom.createdDate }}</div>
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
      <div class="drawer__content">
        <el-form :model="scriptCustomApplyForm">

          <el-form-item label="申请名称" :label-width="formLabelWidth">
            <el-input v-model="scriptCustomApplyForm.applyName" autocomplete="off" placeholder="需要定制的脚本简短描述"></el-input>
          </el-form-item>

          <el-form-item label="网站地址" :label-width="formLabelWidth">
            <el-input v-model="scriptCustomApplyForm.website" autocomplete="off"
                      placeholder="需要定制脚本的网站url"></el-input>
          </el-form-item>

          <el-form-item label="账号信息" :label-width="formLabelWidth">
            <el-input v-model="scriptCustomApplyForm.accountInfo" autocomplete="off"
                      placeholder="定制脚本网站的账号（用于站长制造调试脚本，不会在列表显示）"></el-input>
          </el-form-item>

          <el-form-item label="申请描述" :label-width="formLabelWidth">
            <quill-editor v-model="scriptCustomApplyForm.applyContent" :options="editorOption"
                          style="height: 500px"></quill-editor>
          </el-form-item>
        </el-form>

        <div class="drawer__footer" style="bottom: 10px; position: absolute">
          <el-button @click="cancelForm" type="warning">关 闭</el-button>
          <el-button @click="clearContent" type="danger">清 空</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">
            {{ loading ? '提交中 ...' : '确 定' }}
          </el-button>
        </div>
      </div>
    </el-drawer>


  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor';
import ElementUI from 'element-ui'
import RichTextShow from "@/components/RichTextShow";

export default {
  components: {quillEditor, RichTextShow},
  name: "ScriptCustom",
  data() {
    return {
      customList: [
        {applyName: '职教云1.0', applyStatus: {desc: "已提交"}, website: "", createdDate: "2020-23-12 23:23:00"},
        {applyName: '职教云1.0', applyStatus: {desc: "已提交"}, createdDate: "2020-23-12 23:23:00"},
      ],
      customPage: {
        page: 1,
        size: 10,
        total: 10
      },

      editorOption: {
        placeholder: '请输入定制脚本的描述\n包含需要定制脚本的网站地址\n网站账号',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['image'],
          ],
        },
      },

      isPermission: false,


      dialog: false,
      loading: false,
      scriptCustomApplyForm: {
        applyName: '',
        applyContent: '',
        website: "",
        accountInfo: "",
        applyStatus: 1
      },
      formLabelWidth: '80px',
      timer: null,
    }
  },

  methods: {
    searchScriptCustom() {
      this.$axios.post("/script_apply/search", {
        page: 1,
        size: 10
      }).then(resp => {
        let customListResult = resp.data.data;
        this.customList = customListResult.content === null ? [] : customListResult.content;
        this.customPage.total = customListResult.total;
        this.customPage.page = customListResult.page;
        this.customPage.size = customListResult.size;
      })
    },
    inDetail(e) {
      this.$router.push({path: "/script_custom_detail", query: {id: e.target.innerText, permission:this.isPermission}})
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
    refreshList() {
      this.searchScriptCustom()
    },
    clearContent() {
      this.scriptCustomApplyForm = {}
    },
    checkFormData() {
      if (this.scriptCustomApplyForm.applyName === '' || this.scriptCustomApplyForm.applyContent === '') {
        ElementUI.Message.warning("名称和描述都不可为空")
        return false;
      }

      return true;
    },

    addScriptCustomApply() {
      this.$axios.post("script_apply/add", {
        ...this.scriptCustomApplyForm,
      })
    },

    handleClose(done) {
      if (this.loading) {
        return;
      }
      if (!this.checkFormData()) {
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
    this.isPermissionAction();
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