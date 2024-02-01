<template>
  <div class="body">
    <el-container style="height: 100%">
      <el-aside v-if="true" width="220px" class="user-list bg">
          <MessageUser :user-info="user"></MessageUser>
      </el-aside>

      <el-main class="message-body bg">
      </el-main>

    </el-container>
  </div>
</template>

<script>
import MessageUser from "../components/MessageUser";

export default {
  name: "MessageCenter",
  components: {
    MessageUser
  },
  data(){
    return {
      user:{
        name:"哈哈哈",
        imgUrl:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      }
    }
  },

  created() {
    // todo 用户消息列表，新消息，
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
  padding-top: 3px;
  /*background-color: #f2f3f5;*/
  /*margin: 10px;*/

  height: 100%;
}

</style>