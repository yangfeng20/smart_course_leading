<template>
  <div style="margin-top: 10px;display: flex;border-radius: 4px;">
    <div>
      <div style="text-align: center">
        <el-link :underline="false" :href="'/article/detail/'+task.article.key" type="primary">
          <i class="el-icon-view el-icon--right"></i>{{ task.article.desc?.title }}
        </el-link>
      </div>
      <UserInfoCard :user-info="task.user?.desc"/>
    </div>
    <el-card shadow="hover" style="width: 50%">
      <el-steps :space="100" :active="task?.status" finish-status="success">
        <el-step @click.native="taskApply" title="申请"
                 :description="task?.ext?.apply?.desc"
                 :status="task?.ext?.apply?.status"
                 icon="el-icon-collection-tag"></el-step>

        <el-step @click.native="taskCommit"
                 :description="task?.ext?.comment?.desc"
                 :status="task?.ext?.comment?.status"
                 title="提交" icon="el-icon-edit-outline"></el-step>

        <el-step @click.native="taskAudit" title="审核" icon="el-icon-monitor"
                 :description="task?.ext?.audit?.desc"
                 :status="task?.ext?.audit?.status"></el-step>

        <el-step @click.native="taskFinish" title="完成" icon="el-icon-folder-checked"
                 :description="task?.ext?.finish?.desc"
                 :status="task?.ext?.finish?.status"></el-step>
      </el-steps>
    </el-card>

    <!--提交任务内容-->
    <el-dialog
        title="提交任务"
        :visible.sync="commitFormDialogVisible"
        width="50%">
      <mavon-editor
          :subfield="false"
          :toolbarsFlag="false"
          defaultOpen="preview"
          :boxShadow="false"
          previewBackground="#fff"
          placeholder="提交您的任务凭证，文字以及截图..."
          @imgAdd="wrappedImgAdd"
          v-model="task.content"></mavon-editor>
      <span slot="footer" class="dialog-footer">
        <div style="display: flex">
          <span style="width: 10%">备注：</span><el-input v-model="passDesc"></el-input>
        </div>
    <el-button type="danger" @click="doAudit(false)">拒 绝</el-button>
    <el-button type="success" @click="doAudit(true)">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import UserInfoCard from '../components/UserInfoCard'

export default {
  name: "TaskItem",
  props: ['task'],
  components: {
    mavonEditor,
    UserInfoCard,
  },
  data() {
    return {
      commitFormDialogVisible: false,
      passDesc: "审核通过",
    }
  },

  created() {

  },

  methods: {
    wrappedImgAdd(pos, $file) {
      this.$func.imgAddVue(pos, $file, this);
    },

    taskApply() {

    },

    doTaskCommit() {
    },

    taskAudit() {
      if (this.task.status !== 2) {
        return;
      }

      this.commitFormDialogVisible = true
    },

    doAudit(pass) {
      let status = pass === true ? 1 : 2
      this.$axios.post("/task/audit", {
        taskId: this.task.id,
        status: status,
        desc: this.passDesc
      }).then(_ => {
        this.$notify({
          type: "success",
          title: "任务审核成功",
          message: "任务已处理"
        })
      }).catch(e => {
        this.$notify({
          type: "error",
          title: "任务审核失败",
          message: e
        })
      }).finally(() => {
        this.commitFormDialogVisible = false
      })
    },

    taskFinish() {
    },
  },
}
</script>

<style scoped>

</style>