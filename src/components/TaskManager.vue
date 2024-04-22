<template>
  <div>
    <el-input placeholder="请输入任务关联文章标题搜索" v-model="input" class="input-with-select" @keyup.native.enter="search">

      <el-select v-model="taskStatus" slot="prepend" placeholder="请选择">
        <el-option label="全部" value="0"></el-option>
        <el-option v-for="item in statusList" :label="item.desc" :value="item.key"></el-option>
      </el-select>

      <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
    </el-input>

    <div v-if="taskList.length">
      <TaskItem v-for="task in taskList" :task="task"></TaskItem>
      <el-pagination style="position: absolute;bottom: 0;display: inline;"
                     background
                     page-size="9"
                     :total="taskPage.total"
                     :current-page.sync="taskPage.page"
                     layout="total, prev, pager, next">
      </el-pagination>
    </div>
    <el-empty v-if="!taskList.length"></el-empty>

  </div>
</template>

<script>
import TaskItem from "../components/TaskItem";

export default {
  name: "TaskManager",
  components: {
    TaskItem,
  },

  data() {
    return {
      statusList: [],
      taskList: [],
      taskStatus: "",
      input: "",
      taskPage: {
        page: 1,
        size: 9,
        total: 0,
      }
    }
  },
  methods: {
    search() {
      const postData = this.taskPage.total
          ? {...this.taskPage, status: this.taskStatus, articleTitle: this.input}
          : {status: this.taskStatus, articleTitle: this.input};

      this.$axios.post("/task/search", postData).then(resp => {
        this.taskList = resp.data.data.content
        this.taskPage.page = resp.data.data.page
        this.taskPage.size = resp.data.data.size
        this.taskPage.total = resp.data.data.total
      })
    }
  },
  watch: {
    'taskPage.page': {
      handler: function () {
        this.search()
      }
    },
  },

  created() {
    this.$axios.post("/task/get_all_process_status").then(resp => {
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
