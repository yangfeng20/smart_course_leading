<template>
  <div>
    <el-input placeholder="暂不支持内容搜索" v-model="input" class="input-with-select" @keyup.native.enter="search">

      <el-select v-model="msgType" slot="prepend" placeholder="请选择">
        <el-option label="全部" value="0"></el-option>
        <el-option v-for="item in typeList" :label="item.desc" :value="item.key"></el-option>
      </el-select>

      <el-select v-model="msgStatus" slot="prepend" placeholder="请选择">
        <el-option label="全部" value="0"></el-option>
        <el-option v-for="item in statusList" :label="item.desc" :value="item.key"></el-option>
      </el-select>

      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>

    <MessageItem v-for="message in messageList" :message="message"></MessageItem>

    <el-pagination style="position: absolute;bottom: 0;display: inline;"
                   background
                   :total="messagePage.total"
                   :current-page.sync="messagePage.page"
                   layout="total, prev, pager, next">
    </el-pagination>
  </div>
</template>

<script>
import MessageItem from "../components/MessageItem";

export default {
  name: "MessageManager",
  components: {
    MessageItem,
  },

  data() {
    return {
      typeList: [],
      statusList: [],
      messageList: [],
      msgType: "",
      msgStatus: "",
      input: "",
      messagePage: {
        page: 1,
        size: 9,
        total: 100,
      }
    }
  },
  methods: {
    search() {
      const postData = this.messagePage.total
          ? {...this.messagePage, msgType: this.msgType, status: this.msgStatus}
          : {msgType: this.msgType, status: this.msgStatus};

      this.$axios.post("/message/search", postData).then(resp => {
        this.messageList = resp.data.data.content
        this.messagePage.page = resp.data.data.page
        this.messagePage.size = resp.data.data.size
        this.messagePage.total = resp.data.data.total
      })
    }
  },
  watch: {
    'messagePage.page': {
      handler: function () {
        this.search()
      }
    },
  },

  created() {
    this.$axios.post("/message/get_all_type").then(resp => {
      this.typeList = resp.data.data
    })
    this.$axios.post("/message/get_all_status").then(resp => {
      this.statusList = resp.data.data
    })

    this.search()
  }
}
</script>

<style scoped>
.el-select {
  width: 150px;
}
</style>