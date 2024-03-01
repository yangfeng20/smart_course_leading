<template>

  <div style="position: relative;">

    <div data-v-4a9485b9="" class="search-bar" style="margin-top: 10px;display: flex;margin-left: 30px;">
      <el-input v-model="searchParam.applyName" placeholder="定制申请名称" v-show="isPermission" style="width: 20%"
                :clearable="true" @keydown.enter.native="searchScriptCustom"></el-input>
      <el-select v-model="searchParam.applyStatus" v-show="isPermission" placeholder="申请状态" :clearable="true">
        <el-option label="已提交" value="1"></el-option>
        <el-option label="制作中" value="2"></el-option>
        <el-option label="已拒绝" value="3"></el-option>
        <el-option label="已完成" value="4"></el-option>
      </el-select>
      <el-button type="primary" style="margin-left: 10px;" icon="el-icon-refresh" :loading="listLoading"
                 @click="refreshList">刷新列表
      </el-button>
      <el-button type="primary" icon="el-icon-edit" @click="dialog = true">新增定制</el-button>
    </div>

    <div class="data-page">
      <div class="data-list-div">
        <el-row :gutter="1" style="margin-left: 20px;margin-right: 20px;">
          <el-col v-for="(custom, index) in customList" :key="index" :span="8">
            <transition :name="getTransitionName(index)">
              <div v-show="listShowRender" class="data-info">
                <div class="script-info-inner" v-show="isPermission">申请Id：
                  <el-link type="primary" @click="inDetail">{{ custom.id }}</el-link>
                </div>
                <div class="script-info-inner">申请名称：{{ custom.applyName }}</div>
                <div class="script-info-inner">网站地址：
                  <el-link :href="custom.website" target="_blank" :underline="false"><i
                      class="el-icon-view el-icon--right"></i> {{ custom.website }}
                  </el-link>
                </div>
                <div class="script-info-inner">状态：
                  <el-tag :type="tagType(custom.applyStatus?.key)" ref="statusTag" :value="custom.applyStatus?.key">{{
                      custom.applyStatus?.desc
                    }}
                  </el-tag>
                  <span v-if="custom.comment"><span
                      v-text="custom?.applyStatus?.key === 3 ? '拒绝原因：':'备注：'"></span>{{ custom.comment }}</span>
                </div>
                <div class="script-info-inner">申请时间：{{ custom.createdDate }}</div>
              </div>
            </transition>
          </el-col>
        </el-row>
        <!--空白占位；用于展示分页组件-->
        <el-row>
          <div style="height: 40px"></div>
        </el-row>
      </div>
      <div class="pagination-wrapper">
        <el-pagination
            :current-page.sync="customPage.page"
            :page-size.sync="customPage.size"
            :page-sizes="[9,18,27,36,45]"
            :total="customPage.total"
            layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>

        <el-empty v-show="isShowEmptyList && listShowRender" description="没有满足条件的定制申请"></el-empty>
      </div>
    </div>


    <!-- 侧边栏抽屉-->
    <el-drawer
        title="新增脚本定制申请"
        :before-close="handleClose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
        :size="'45%'">
      <div class="drawer__content">
        <el-form :model="scriptCustomApplyForm">

          <el-form-item label="申请名称" :label-width="formLabelWidth">
            <el-input v-model="scriptCustomApplyForm.applyName" autocomplete="off"
                      placeholder="需要定制的脚本简短描述"></el-input>
          </el-form-item>

          <el-form-item label="网站地址" :label-width="formLabelWidth">
            <el-input v-model="scriptCustomApplyForm.website" autocomplete="off"
                      placeholder="需要定制脚本的网站url"></el-input>
          </el-form-item>

          <el-form-item label="账号信息" :label-width="formLabelWidth">
            <el-input
                type="textarea"
                :rows="2"
                :autosize="{ minRows: 3, maxRows:8}"
                placeholder="定制脚本网站的账号密码（用于站长制造调试脚本，不会在列表显示）"
                autocomplete="off"
                v-model="scriptCustomApplyForm.accountInfo">
            </el-input>
          </el-form-item>

          <el-form-item label="申请描述" :label-width="formLabelWidth">
            <quill-editor v-model="scriptCustomApplyForm.applyContent" :options="editorOption"
                          style="height: 500px"></quill-editor>
          </el-form-item>
        </el-form>

        <div class="drawer__footer" style="bottom: 10px; position: absolute">
          <el-button @click="cancelForm" type="warning">关 闭</el-button>
          <el-button @click="clearContent" type="danger">清 空</el-button>
          <el-button type="primary" @click="commitAction" :loading="commitLoading">
            {{ commitLoading ? '提交中 ...' : '确 定' }}
          </el-button>
        </div>
      </div>
    </el-drawer>


  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor';
import ElementUI from 'element-ui'
import RichTextShow from "../components/RichTextShow";

export default {
  components: {quillEditor, RichTextShow},
  name: "ScriptCustom",
  data() {
    return {
      listShowRender: true,
      listLoading: false,
      customList: [],
      customPage: {
        page: 1,
        size: 9,
        total: 0
      },

      searchParam: {
        applyName: "",
        applyStatus: "",
      },

      editorOption: {
        placeholder: '请输入定制脚本的描述\n并留下您的邮件，以便告知脚本制造进度。',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'color': []}, {'background': []}],
            ['image'],
            [{'align': []}],
            ['clean'],
          ],
        },
      },

      dialog: false,
      commitLoading: false,
      isPermission: false,
      scriptCustomApplyForm: {},
      formLabelWidth: '80px',
      timer: null,
    }
  },

  methods: {
    tagType(status) {
      if (!status) {
        return
      }
      // 提交
      if (status === 1) {
        return 'success'
        //  制作中
      } else if (status === 2) {
        return 'warning'
      }
      //  拒绝
      else if (status === 3) {
        return 'danger'
        // 完成
      } else {
        return ''
      }
    },
    searchScriptCustom() {
      this.listLoading = true
      this.listShowRender = false
      this.$axios.post("/script_apply/search", {
        ...this.customPage,
        applyName: this.searchParam.applyName,
        applyStatus: this.searchParam.applyStatus,
      }).then(resp => {
        let result = resp.data.data;
        this.customList = result.content === null ? [] : result.content;
        if (result.total) {
          this.customPage.total = result.total;
          this.customPage.page = result.page;
          this.customPage.size = result.size;
        }
      }).catch(e => {

      }).finally(() => {
        setTimeout(() => {
          this.listLoading = false
          this.listShowRender = true
        }, 200)
      })
    },
    inDetail(e) {
      this.$router.push({path: "/script_custom_detail", query: {id: e.target.innerText, permission: this.isPermission}})
    },
    refreshList() {
      this.searchScriptCustom()
    },

    getTransitionName(index) {
      let toTopArr = [0, 1, 2, 5]
      let centerArr = [4]
      let toBottomArr = [3, 6, 7, 8]
      if (toTopArr.includes(index)) {
        return "el-zoom-in-bottom";
      } else if (toBottomArr.includes(index)) {
        return "el-zoom-in-top";
      } else if (centerArr.includes(index)) {
        return "el-zoom-in-center";
      }
      return "el-zoom-in-center";
    },

    clearContent() {
      this.scriptCustomApplyForm = {}
    },
    checkFormData() {
      if (!this.scriptCustomApplyForm.applyName || !this.scriptCustomApplyForm.website
          || !this.scriptCustomApplyForm.accountInfo) {
        ElementUI.Message.warning("名称 | 网址 | 账号 不可为空")
        return false;
      }

      return true;
    },

    addScriptCustomApply() {
      this.scriptCustomApplyForm.applyStatus = 1
      this.$axios.post("script_apply/add", {
        ...this.scriptCustomApplyForm,
      }).then(resp => {
        this.scriptCustomApplyForm = {}
      })
    },

    commitAction() {
      if (!this.checkFormData()) {
        return;
      }
      this.commitLoading = true
      this.$confirm('确定提交脚本定制申请吗？')
          .then(_ => {
            this.addScriptCustomApply();
            this.$refs.drawer.closeDrawer()
          })
          .catch(e => {
            this.commitLoading = false
            // 点击取消或者叉号,都不关闭抽屉
            // this.cancelForm()
          });
    },

    handleClose(done) {
      if (this.commitLoading) {
        // 提交时关闭
        done()
        this.commitLoading = false
        return;
      }

      // 主动关闭抽屉
      this.$confirm('放弃编辑？').then(_ => {
        // 确认放弃编辑，关闭抽屉
        done();
        this.scriptCustomApplyForm = {}
      }).catch(e => {
      })
    },

    cancelForm() {
      this.commitLoading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }

  },

  created() {
    this.searchScriptCustom();
    this.$func.isPermissionAction().then(data => {
      this.isPermission = data
    });
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
    isShowEmptyList() {
      return !this.customList.length;
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