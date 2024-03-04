<template>
  <div style="padding-left: 10px;padding-top: 10px;padding-bottom:10px;">
    <div>
      <el-form ref="form" :model="comment" label-width="60px" v-if="showCreateComment"
               style="width: 100%;display: flex;">
        <el-image class="new-comment-message-created-icon message-created-icon"
                  :src="userInfo.imgUrl"></el-image>
        <div style="display: flex;padding: 10px;align-items: flex-end;width: 100%">
          <el-input :autosize="{ minRows: 3}" type="textarea" v-model="comment.inputMsg" placeholder="编写评论"
                    maxlength="100"
                    show-word-limit
                    style="width: 60%;"></el-input>
          <el-button style="position:relative;margin-left: -56px;" size="small" type="primary" @click="onSubmit({})">
            发送
          </el-button>
        </div>
      </el-form>
    </div>
    <div v-for="message in messageList" :key="message.id">
      <div style="margin: 10px">
        <el-row>
          <div style="display: flex">
            <div>
              <el-image class="message-created-icon"
                        :src="message?.createdUser?.imgUrl"></el-image>
            </div>
            <div class="message-created-name">{{ message.createdUser.name }}
            </div>
          </div>
        </el-row>
        <el-row>
          <div style="padding-left: 50px" :span="22" class="message-created-name"
               v-html="message.msgContent"></div>
        </el-row>
        <el-row>
          <div style="padding-left:50px;margin-top:10px;display: flex" class="message-created-name">
            <div>{{ message.createdDate }}</div>
            <el-button style="position: relative;margin-left: 10px;top: -3px;" type="text" plain
                       icon="el-icon-s-comment"
                       @click="openCommentInput(message)" size="mini">{{ commentBtnText }}
            </el-button>
          </div>
        </el-row>

        <el-row>
          <div v-if="message.newComment" style="padding-left: 50px" class="message-created-name">
            <el-input ref="input" :autosize="{ minRows: 3}" type="textarea" v-model="comment.replyInputMsg"
                      :placeholder="message.toUser"
                      maxlength="100"
                      show-word-limit
                      style="width: 60%;"></el-input>
            <el-button style="position:relative;margin-left: -56px;" size="small" type="primary"
                       @click="onSubmit(message)">回复
            </el-button>
          </div>
        </el-row>
      </div>

      <div class="sub-message">
        <Remark :message-list="message.subMessageList" :link-id="linkId"></Remark>
      </div>
    </div>
  </div>
</template>
<script>
import Remark from "../components/Remark";

export default {
  name: "Remark",
  components: {
    Remark,
  },
  props: ['messageList', 'showCreateComment', 'linkId'],
  data() {
    return {
      commentBtnText: "评论",
      comment: {
        inputMsg: "",
        replyInputMsg: "",
      },
      userInfo: {}
    }
  },

  methods: {
    onSubmit(message) {
      let parentMessageId = message.id
      let inputMsg
      if (parentMessageId) {
        inputMsg = this.comment.replyInputMsg
      } else {
        inputMsg = this.comment.inputMsg
      }

      if (!inputMsg) {
        return;
      }

      this.$axios.post("/message/add", {
        linkId: this.linkId,
        msgType: 4,
        msgContent: inputMsg,
        parentId: parentMessageId,
      }).then(resp => {
        this.$notify({
          title: '评论提交成功',
          message: '等待管理员审核后可查看',
          type: 'success'
        });

        // 清空评论区
        if (parentMessageId) {
          this.comment.replyInputMsg = ""
          // 关闭评论输入框
          this.closeCommentInput(message)
        } else {
          this.comment.inputMsg = ""
        }
      })
    },

    closeCommentInput(message) {
      console.log("失焦")
      message.newComment = false
      this.commentBtnText = "评论"
    },
    openCommentInput(message) {
      console.log("打开", message.newComment)
      if (message.newComment) {
        this.closeCommentInput(message)
        return;
      }
      message.newComment = true
      this.commentBtnText = "取消"
      message.toUser = "回复" + message.createdUser.name
    },
  },
  created() {
    if (!this.showCreateComment) {
      return;
    }

    this.userInfo = this.$func.getLocalUser()
  }
}

</script>
<style scoped>

.body {
  height: 100%;
  position: relative;
  background-color: #ffffff;
}

.new-comment-message-created-icon {
  top: 12px;
}

.message-created-icon {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.message-created-name {
  top: 10px;
  position: relative;
  padding-left: 10px;
}

.sub-message {
  padding-left: 30px;
  position: relative;
  /*top: 30px;*/
}


.el-textarea > :first-child {
  background-color: #f2f3f5;
}

.el-textarea > :nth-child(2) {
  color: #909399;
  background: #FFF;
  position: absolute;
  font-size: 12px;
  bottom: 5px;
  right: 65px;
}
</style>