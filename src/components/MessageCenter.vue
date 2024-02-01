<template>
  <div class="body">
    <el-container style="height: 100%">
      <el-aside v-if="true" width="220px" class="user-list bg">
        <div v-for="(item, index) in messageList">
          <MessageUser @click.native="selectUserMsg(index)" class="message-user" :user-info="item.toUser"
                       :class="{ 'selectedMsg': selectMsgIndex === index }"
          ></MessageUser>
        </div>

      </el-aside>

      <el-main class="message-body bg">
        <div>
          <div style="height: 500px;border-bottom: 1px solid #e4e6eb;overflow-y: auto">
            <div class="bout" v-for="message in messageList[selectMsgIndex].message">
              <div style="text-align: center;" class="message-date">{{ message.createdDate }}</div>

              <div v-if="!message.me" style="display: flex; justify-content: flex-start; align-items: center;">
                <el-avatar :src="messageList[selectMsgIndex].toUser.imgUrl"></el-avatar>
                <div class="to-message message-div">
                  {{ message.msgContent }}
                </div>
              </div>
              <div v-if="message.me" style="display: flex; justify-content: flex-end; align-items: center;">
                <div class="from-message message-div">
                  {{ message.msgContent }}
                </div>
                <el-avatar :src="user.imgUrl"></el-avatar>
              </div>
              <div style="height: 10px"></div>
            </div>

          </div>
          <el-input class="text-div" :autosize="{ minRows: 4, maxRows: 4}" :rows="4" type="textarea" v-model="inputMsg"
                    placeholder=" " maxlength="200"
                    show-word-limit clearable>

          </el-input>
          <el-button @click="sendMessage" size="small" type="primary"
                     style="position: relative;top: -128px">发送消息
          </el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import MessageUser from "../components/MessageUser";
import Moment from "moment";

export default {
  name: "MessageCenter",
  components: {
    MessageUser,
  },
  data() {
    return {
      inputMsg: "",
      selectMsgIndex: 0,
      messageList: [
        {
          toUser: {
            name: "哈哈哈",
            imgUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          },
          message: [
            {
              me: true,
              msgContent: "哈哈哈",
              createdDate: "14:30",
            },
            {
              me: false,
              msgContent: "我是消息的是覅回我\n我是消息的是覅回我我是消息的是覅回我我是消息的是覅回我我是消息的是覅回我我是消息的是覅回我我是消息的是覅回我我是消息的是覅回我\n",
              createdDate: "14:31",
            },
            {
              me: false,
              msgContent: "我是消息的是覅回我",
              createdDate: "14:31",
            },
            {
              me: false,
              msgContent: "我是消息的是覅回我",
              createdDate: "14:31",
            },
            {
              me: true,
              msgContent: "我是消息的是覅回我",
              createdDate: "14:31",
            },
            {
              me: false,
              msgContent: "我是消息的是覅回我",
              createdDate: "14:31",
            },
            {
              me: false,
              msgContent: "我是消息的是覅回我",
              createdDate: "14:31",
            },
            {
              me: false,
              msgContent: "我是消息的是覅回我",
              createdDate: "14:31",
            },
            {
              me: false,
              msgContent: "我是消息的是覅回我",
              createdDate: "14:31",
            },
          ]
        },
        {
          toUser: {
            name: "用户b",
            imgUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
          },
          message: [
            {
              me: true,
              msgContent: "我是新的消息",
              createdDate: "14:30",
            },
            {
              me: false,
              msgContent: "确定吗？",
              createdDate: "14:31",
            }
          ]
        },
      ],
      user: {
        name: "哈哈哈",
        imgUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      }
    }
  },

  methods: {
    wrappedImgAdd(pos, $file) {
      this.$func.imgAddVue(pos, $file, this);
    },
    selectUserMsg(index) {
      this.selectMsgIndex = index
      this.inputMsg = ""
    },

    sendMessage() {
      if (!this.inputMsg){
        this.$notify({
          title: '发送私信失败',
          message: '私信不能为空哟',
          type: 'warning'
        })
        return;
      }
      let toUserId = this.messageList[this.selectMsgIndex].toUser.id

      // todo 添加消息接口

      // 添加到页面
      this.messageList[this.selectMsgIndex].message = this.messageList[this.selectMsgIndex].message || []
      this.messageList[this.selectMsgIndex].message.push({
        me: true,
        msgContent: this.inputMsg,
        createdDate: new Moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },)

      this.inputMsg = ""
    },
  },

  created() {
    let pathArr = this.$route.path.split("/");
    let toUserId = pathArr[pathArr.length - 1];

    this.$axios.post("/user/info?userId=" + toUserId).then(resp => {
      console.log(resp.data.data)
      this.messageList.unshift({
        toUser: {
          id: resp.data.data.id,
          name: resp.data.data.name,
          imgUrl: resp.data.data.imgUrl
        }
      })
    })


    this.$axios.post("/message/my_message").then(resp => {

    })
  }
}
</script>


<style scoped>
.body {
  position: relative;
  height: 100%;
  background-color: #ffffff;
}

.bg {
  border: 1px solid #e4e6eb;
  padding-top: 2px;

  height: 100%;
}

.text-div > :first-child {
  resize: none;
}

.message-date {
  margin: 12px auto;
  text-align: center;
  color: #8a919f;
}

.message-div {
  background-color: #c9e1ff;
  padding: 12px;
  border-radius: 4px;
  max-width: 400px;
  min-height: 20px;
  word-break: break-all;
  overflow-wrap: break-word;
}

.selectedMsg > :first-child {
  background-color: #d9e6fa;
}

</style>