<template>
  <div>
    <div v-for="message in messageList">
      <el-row>
        <el-col :span="2">
          <el-image class="message-created-icon"
                    :src="message.createdUser.imgUrl"></el-image>
        </el-col>
        <el-col :span="4" class="message-created-name">{{message.createdUser.name}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="2"> </el-col>
        <el-col style="padding-left: 50px" :span="22" class="message-created-name">{{message.msgContent}}</el-col>
      </el-row>
      <slot>
        <Remark :message-list="messageList.subMessageList"></Remark>
      </slot>
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
  props: {
    messageList: [],
  },
  data() {
    return {
    }
  },

  created() {
    console.log(this.props.messageList)
  }
}

</script>
<style scoped>

.body {
  height: 100%;
  position: relative;
  background-color: #ffffff;
}

.message-created-icon{
  width: 40px; height: 40px;border-radius: 50%;
}

.message-created-name{
  top: 10px;
  position: relative;
}
</style>