<template>
  <div>
    <el-card>
      <div class="container">
        <el-page-header @back="windowWith.history.back()" title="返回列表" content="脚本详情">
        </el-page-header>
        <div class="box1" slot="header">
          <h2>{{ scriptInfo.scriptName }}</h2>
          <el-tag :type="scriptInfo?.scriptStatus?.key === 1 ? 'info' : 'success'">{{
              scriptInfo?.scriptStatus?.desc
            }}
          </el-tag>
        </div>

        <div>
          <el-button style="transform: translateY(-50%);" type="primary" round icon="el-icon-download"
                     @click="downAndUpdateCount">点击下载
          </el-button>
        </div>

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
        <RichTextShowReadonly :content="scriptInfo?.scriptCourse"/>
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
import RichTextShowReadonly from "../components/RichTextShowReadonly";
import ElementUI from "element-ui";
import qs from "qs";

export default {
  name: "ScriptDetail",
  components: {
    RichTextShowReadonly,
  },
  data() {
    return {
      scriptInfo: {}
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
      }).catch(e => {

      })
    },
    downAndUpdateCount() {
      this.$axios.put("script_info/get_url_and_update_count?id=" + this.$route.query.id)
          .then(resp => {
            window.open(resp.data.data, "_blank")
          }).catch(error => {
      })
    }
  },
  computed: {
    windowWith() {
      return window;
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