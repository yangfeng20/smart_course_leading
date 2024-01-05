<template>
  <div class="body">
    <el-container>
      <el-header style="height: 100%">

        <el-row>
          <el-col :span="24 / topList.length" v-for="topItem in topList" class="top-card">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{topItem.name}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div>
                {{topItem.content}}
              </div>
            </el-card>
          </el-col>
        </el-row>

      </el-header>
      <el-container>
        <el-aside width="200px">
          <div>
            <p>
              <el-button icon="el-icon-discover" type="text">综合</el-button>
            </p>
            <p>
              <el-button icon="el-icon-chat-round" type="text">闲聊</el-button>
            </p>
            <p>
              <el-button icon="el-icon-cpu" type="text">脚本</el-button>
            </p>
            <p>
              <el-button icon="el-icon-collection" type="text">教程</el-button>
            </p>
            <p>
              <el-button icon="el-icon-folder-checked" type="text">任务</el-button>
            </p>
            <p>
              <el-button icon="el-icon-date" type="text">系统公告</el-button>
            </p>
          </div>
        </el-aside>
        <el-container>

          <!--todo 底部到底，内部内容和侧边-->
          <el-main>
            <el-container style="padding: 10px">
              <el-header>Header</el-header>
              <el-aside style="width: 100px">侧边</el-aside>
              <el-main>Main</el-main>
            </el-container>
          </el-main>

        </el-container>
      </el-container>
    </el-container>
  </div>

</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      topList:[
        {
          "id":1,
          "name":"顶部卡片1",
          "content":"测试文本"
        },
        {
          "id":2,
          "name":"顶部卡片2",
          "content":"Hello World"
        },
        {
          "id":2,
          "name":"顶部卡片2",
          "content":"Hello World"
        },
        {
          "id":2,
          "name":"顶部卡片2",
          "content":"Hello World"
        },
      ]
    }
  },
  created() {
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  padding: 0px 5px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 35%;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.body {
  position: relative;
}

.top-card{
  padding: 10px 5px;
}

</style>