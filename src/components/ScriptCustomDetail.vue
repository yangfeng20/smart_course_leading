<template>
  <div class="container" v-show="isPermission">
    <div class="header">
      <div class="apply-name">{{ scriptCustomApply.applyName }}</div>
      <div class="website-icon">
        <el-image
            style="width: 100px; height: 100%"
            :src="scriptCustomApply.website+'/favicon.ico'"
            fit="contain"></el-image>
      </div>
    </div>
    <div class="content">

      <div class="divider"></div>
      <div class="detail-wrapper">
        <div class="label">定制网站:</div>
        <div class="value">{{ scriptCustomApply.website }}</div>
      </div>
      <div class="divider"></div>
      <div class="detail-wrapper">
        <div class="label">账号信息:</div>
        <div class="value">{{ scriptCustomApply.accountInfo }}</div>
      </div>
      <div class="divider"></div>
      <div class="detail-wrapper">
        <div class="label">申请状态:</div>
        <div class="value">{{ scriptCustomApply.applyStatus?.desc }}</div>

        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="">
            <el-select v-model="newApplyStatus" placeholder="申请状态">
              <el-option label="已提交" value="1"></el-option>
              <el-option label="制作中" value="2"></el-option>
              <el-option label="已拒绝" value="3"></el-option>
              <el-option label="已完成" value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updateApplyStatus">更新申请状态</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="divider"></div>
      <div class="detail-wrapper">
        <div class="label">创建时间:</div>
        <div class="value">{{ scriptCustomApply.createdDate }}</div>
      </div>
      <div class="divider"></div>
      <div class="detail-wrapper">
        <div class="label">更新时间:</div>
        <div class="value">{{ scriptCustomApply.updatedDate }}</div>
      </div>

      <RichTextShow :content="scriptCustomApply.applyContent"/>

    </div>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
import RichTextShow from "@/components/RichTextShow";

export default {
  name: "ScriptCustomDetail",
  components: {RichTextShow},
  comments: [RichTextShow],

  data() {
    return {
      isPermission:false,
      scriptCustomApply: {
        applyName: '',
        website: "",
        applyContent: '',
        accountInfo: "",
        applyStatus: "",
        createdDate: "",
        updatedDate: ""
      },

      newApplyStatus: "",
    }
  },

  watch: {
    $route(to, from) {
      this.refresh()
    }
  },

  methods: {
    refresh() {
      let id = this.$route.query.id;
      let permission = this.$route.query.permission;

      if (!(id && permission)) {
        ElementUI.Message.error("拒绝访问")
        return;
      }

      this.$axios.get("script_apply/" + id).then(resp => {
        this.scriptCustomApply = resp.data.data;
        this.isPermission = true
      }).catch(e => {
      })
    },
    updateApplyStatus() {
      this.$axios.get("script_apply/" + this.$route.query.id).then(resp => {
        let scriptApply = resp.data.data
        if (this.newApplyStatus === "" || this.newApplyStatus === scriptApply.applyStatus?.key + "") {
          return;
        }

        scriptApply.applyStatus = this.newApplyStatus
        scriptApply.createdDate = ""
        scriptApply.updatedDate = ""
        this.$axios.put("script_apply/update", scriptApply).then(resp => {
          let isUpdateSuccess = resp.data.data
          if (isUpdateSuccess) {
            ElementUI.Message.info("更新状态成功");
            this.refresh()
          } else {
            ElementUI.Message.warning("更新状态失败");
          }
        })
      })
    }
  },
  created() {
    this.refresh()
  }
}
</script>


<style>
.container {
  padding: 20px;
  background-color: #F6F7FB;
  border-radius: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.apply-name {
  font-size: 24px;
  font-weight: bold;
  color: #191919;
}

.website-icon {
  font-size: 14px;
  color: #7D899C;
  text-align: right;
}

.content {
  margin-top: 20px;
}

.detail-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  width: 150px;
  font-weight: bold;
  color: #7D899C;
  text-align: right;
  margin-right: 20px;
}

.value {
  flex: 1;
  color: #191919;
  word-wrap: break-word;
}

.divider {
  height: 1px;
  background-color: #D8DCE5;
  margin: 20px 0;
}
</style>
