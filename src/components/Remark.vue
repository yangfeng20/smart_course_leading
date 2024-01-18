<template>
  <div style="padding-left: 10px;padding-top: 10px;padding-bottom:10px;">
    <div>
      <el-form ref="form" :model="comment" label-width="60px" v-if="showCreateComment"
               style="width: 100%;display: flex;">
        <el-image class="new-comment-message-created-icon message-created-icon"
                  src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"></el-image>
        <div style="display: flex;padding: 10px;align-items: flex-end;width: 100%">
          <el-input :autosize="{ minRows: 2}" type="textarea" v-model="comment.content" placeholder="编写评论" maxlength="100"
                    style="width: 60%;"></el-input>
          <div>
            <el-button style="margin-left: 10px;" size="small" type="primary" @click="onSubmit">提交</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <div v-for="message in messageList">
      <div style="margin: 10px">
        <el-row>
          <el-col :span="1">
            <el-image class="message-created-icon"
                      :src="message.createdUser.imgUrl"></el-image>
          </el-col>
          <el-col :span="4" class="message-created-name">{{ message.createdUser.name }} | {{ message.createdDate }}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2"></el-col>
          <el-col style="padding-left: 50px" :span="22" class="message-created-name"
                  v-html="message.msgContent"></el-col>
        </el-row>
      </div>

      <div class="sub-message">
        <Remark :message-list="message.subMessageList"></Remark>
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
  props: ['messageList', 'showCreateComment'],
  data() {
    return {
      comment: {
        content: ""
      }
    }
  },

  methods: {
    onSubmit() {

    },
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
</style>