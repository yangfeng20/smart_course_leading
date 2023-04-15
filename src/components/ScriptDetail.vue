<template>
  <div>
    <el-card>
      <div class="container">
        <div class="box1" slot="header">
          <h2>{{ scriptInfo.scriptName }}</h2>
          <el-tag :type="scriptInfo.scriptStatus.key === 1 ? 'info' : 'success'">{{
              scriptInfo.scriptStatus.desc
            }}
          </el-tag>
        </div>

        <el-button type="primary" round icon="el-icon-download" @click="downAndUpdateCount">点击下载</el-button>


      </div>

      <el-divider></el-divider>


      <div style="display: flex; align-items: center">
        <h3>脚本简介：</h3><span>{{ scriptInfo.scriptDesc }}</span>
      </div>
      <div style="display: flex; align-items: center">
        <label>下载次数：</label>
        <span>{{ scriptInfo.downloadCount }}</span>
      </div>

      <el-divider></el-divider>

      <div style=" align-items: center">
        <h3>脚本教程：</h3>
        <RichTextShowReadonly :content="scriptInfo.scriptCourse"/>
      </div>


      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div style="display: flex; align-items: center">
        <label>脚本创建时间：</label>
        <span>{{ scriptInfo.createdDate }}</span>
      </div>

      <div style="display: flex; align-items: center" v-show="scriptInfo.updatedDate">
        <label>脚本更新时间：</label>
        <span>{{ scriptInfo.updatedDate }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import RichTextShowReadonly from "@/components/RichTextShowReadonly";
import ElementUI from "element-ui";
import qs from "qs";

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

      if (!(id)) {
        ElementUI.Message.error("拒绝访问")
        return;
      }

      this.$axios.get("script_info/" + id).then(resp => {
        this.scriptInfo = resp.data.data;
      })
    },
    downAndUpdateCount() {
      window.open(this.scriptInfo.scriptUrl, "_blank")
      this.$axios.put("script_info/update_count", qs.stringify({id: this.$route.query.id}))
          .then(resp => {

          }).catch(error => {

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
  margin-right: 1px;
}

.box2 {
  width: 50%;
  height: 100px;
}
</style>