<template>
  <div>
    <el-container class="articleList-div">
      <!--文章主体内容-->
      <el-main class="article-item-parent">
        <div>
          <el-descriptions class="article-item" :column="1" :colon="false">
            <el-descriptions-item><span class="article-title">{{ message.createdUser.name }}</span>
            </el-descriptions-item>
            <el-descriptions-item>
              <el-link icon="el-icon-view" type="success" @click="handlerClickMsg">{{ message.msgContent }}</el-link>
            </el-descriptions-item>
            <el-descriptions-item>
              <el-row :gutter="0" class="article-last-row">

                <div style="display: flex;gap: 20px;padding-top: 5px;">
                  <div class="grid-content bg-purple" style="display:flex;gap: 10px;">
                    <el-tag effect="plain" size="mini">{{ message.msgType?.desc }}</el-tag>
                    <el-tag effect="plain" size="mini">{{ message.status?.desc }}</el-tag>
                  </div>
                </div>
                <div style="display: flex;gap: 20px;">
                  <div class="text-item">创建时间：{{ message.createdDate }}</div>
                  <div class="text-item">更新时间：{{ message.updatedDate }}</div>
                </div>
                <div style="margin-top: 10px;" class="optDiv">

                  <el-tooltip class="item" effect="dark" content="审核消息" placement="bottom">
                    <el-button @click.stop="auditDialogVisible=true" type="info"
                               icon="el-icon-set-up"
                               size="mini"
                               circle></el-button>
                  </el-tooltip>

                </div>

                <el-dialog
                    title="审核文章"
                    :visible.sync="auditDialogVisible"
                    width="30%"
                    >
                  <el-input @click.stop="" v-model="rejectText" placeholder="不通过请说明原因"></el-input>
                  <span slot="footer" class="dialog-footer">
                <el-button @click.stop="doAudit(false)">不通过</el-button>
                <el-button type="primary" @click.stop="doAudit(true)">通过</el-button>
                </span>
                </el-dialog>


              </el-row>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-main>

    </el-container>
  </div>
</template>

<script>
export default {
  name: "MessageItem",
  data() {
    return {
      auditDialogVisible: false,
      rejectText: "",
    }
  },
  props: ['message'],
  methods: {
    doAudit(pass) {
      if (!pass && !this.rejectText) {
        this.$notify({
          type: "error",
          title: "审核失败",
          message: "拒绝通过请说明原因"
        })
        return;
      }

      this.$axios.post("/message/audit?msgId=" + this.message.id + "&pass=" + pass + "&rejectText=" + this.rejectText).then(resp => {
        this.$notify({
          type: "success",
          title: "审核消息",
          message: "操作成功"
        })
      })
      this.auditDialogVisible = false
    },
    handlerClickMsg() {
      switch (this.message.msgType.key) {
        case 4:
          this.$router.push("/article/detail/" + this.message.linkId);
          break;
        case 5:
          break;
      }
    }
  },
}
</script>

<style scoped>

/*鼠标悬停文章效果*/
.articleList-div:hover, .article-item-parent:hover, .article-item:hover {
  background: #eff0f1;
}
.articleList-div {
  border-bottom: 1px solid rgba(228, 230, 235, 0.5);
}
</style>