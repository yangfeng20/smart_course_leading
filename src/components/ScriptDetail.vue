<template>
  <div>
    <el-card>
      <div class="container">
        <div class="box1" slot="header">
          <h2>{{ scriptInfo.scriptName }}</h2>
        </div>

        <div class="box2" style="display: flex; align-items: center;">
          <label>下载链接：</label>
          <el-button type="primary" round :href="scriptInfo.scriptUrl" target="_blank">点击下载</el-button>
        </div>
      </div>

      <el-divider></el-divider>


      <div style="display: flex; align-items: center">
        <el-tag effect="dark">脚 本 描 述: </el-tag>
        <span>{{ scriptInfo.scriptDesc }}</span>
      </div>



      <div style=" align-items: center">
        <label>脚本教程：</label>
        <RichTextShowReadonly :content="scriptInfo.scriptCourse"/>
      </div>

      <el-tag :type="scriptInfo.scriptStatus.key === 1 ? 'success' : 'danger'">{{
          scriptInfo.scriptStatus.desc
        }}
      </el-tag>

      <div style="display: flex; align-items: center">
        <label>下载次数：</label>
        <span>{{ scriptInfo.downloadCount }}</span>
      </div>

      <div style="display: flex; align-items: center">
        <label>创建人：</label>
        <span>{{ scriptInfo.createdId }}</span>
      </div>

      <div style="display: flex; align-items: center">
        <label>创建时间：</label>
        <span>{{ scriptInfo.createdDate }}</span>
      </div>

      <div style="display: flex; align-items: center">
        <label>更新人：</label>
        <span>{{ scriptInfo.updatedId }}</span>
      </div>

      <div style="display: flex; align-items: center">
        <label>更新时间：</label>
        <span>{{ scriptInfo.updatedDate }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import RichTextShowReadonly from "@/components/RichTextShowReadonly";
import ElementUI from "element-ui";

export default {
  name: "ScriptDetail",
  components: {
    RichTextShowReadonly,
  },
  data() {
    return {
      scriptInfo: {
        id: 0,
        scriptName: "职教云全流程1.0",
        scriptDesc: "智慧职教刷课",
        scriptUrl: "http:www.baidu.com",
        scriptCourse: "",
        downloadCount: 12,
        scriptStatus: {
          key: 1,
          desc: "已上架"
        },
        createdId: 1,
        createdDate: "2023-04-10 22:22:07",
        updatedId: 2,
        updatedDate: "2023-04-10 22:22:07"
      }
    }
  },

  watch: {
    $route(to, from) {
      this.refresh()
    }
  },
  created() {
    this.refresh()
  },

  methods: {
    refresh() {
      let id = this.$route.query.id;
      console.log("detail",id)

      if (!(id)) {
        ElementUI.Message.error("拒绝访问")
        return;
      }

      this.$axios.get("script_info/" + id).then(resp => {
        this.scriptInfo = resp.data.data;
        console.log(this.scriptInfo.scriptCourse)
      })
    }

  }

}
</script>

<style scoped>
.container {
  width: 100%;
  overflow: hidden;
}
.box1 {
  width: 50%;
  height: 100px;
  float: left;
}

.box2 {
  width: 50%;
  height: 100px;
}
</style>