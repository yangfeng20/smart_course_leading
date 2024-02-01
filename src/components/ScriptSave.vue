<template>
  <div>
    <div v-show="isPermission">
      <el-row style="height: 20%"></el-row>
      <h3>&nbsp;请填写脚本信息</h3>
      <el-col :span="12">
        <el-row>
          <el-tag>脚本名称</el-tag>
          <el-input v-model="scriptInfo.scriptName" placeholder="脚本名称"></el-input>
        </el-row>
        <el-row>
          <el-tag>脚本描述</el-tag>
          <el-input
              type="textarea"
              :rows="2"
              :autosize="{ minRows: 3}"
              placeholder="脚本描述"
              v-model="scriptInfo.scriptDesc">
          </el-input>
        </el-row>

        <el-select v-model="scriptInfo.scriptStatus.key" placeholder="上架状态">
          <el-option label="未上架" :value="1"></el-option>
          <el-option label="已上架" :value="2"></el-option>
        </el-select>
      </el-col>

      <el-col :span="10" style="margin-left: 10px">
        <el-row>
          <el-col>
            <el-upload drag action="#"
                       ref="upload"
                       :multiple="false"
                       :auto-upload="false"
                       :show-file-list="false"
                       :on-change="handleChange">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将脚本拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <el-tag v-if="scriptInfo.fileName">{{ scriptInfo.fileName }}</el-tag>
          </el-col>
          <el-col>
            <el-progress :width="80" type="circle" :percentage="schedule" status="success" ref="progress"></el-progress>
            <el-tag type="info">上传进度</el-tag>
            <el-button type="primary" @click="commitScript">提交脚本</el-button>
          </el-col>
        </el-row>

      </el-col>


      <el-col>
        <div>
          <quill-editor v-model="scriptInfo.scriptCourse" :options="editorOption"
                        style="height: 400px"></quill-editor>
        </div>
      </el-col>


    </div>
  </div>
</template>

<script>
import ElementUI from 'element-ui'

export default {

  name: "ScriptSave",
  data() {
    return {
      isPermission: false,
      schedule: 0,
      scriptInfo: {
        scriptStatus: {},
      },
      editorOption: {
        placeholder: '脚本教程',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'color': []}, {'background': []}],
            ['image'],
            [{'align': []}],
            ['clean'],
          ],
        },
      },
    }
  },


  watch: {
    $route(to, from) {
      this.refresh()
    },
  },
  created() {
    this.$func.isPermissionAction().then(data=>{this.isPermission=data});
    this.refresh()
  },

  methods: {
    getCookie(cookieName) {
      const cookies = document.cookie.split("; ")
      for (let i = 0; i < cookies.length; i++) {
        const [name, value] = cookies[i].split("=")
        if (name === cookieName) {
          return decodeURIComponent(value)
        }
      }
      return ""
    },
    handleChange(file) {
      if (file.status === 'ready') {
        this.scriptInfo.updateFile = true
        this.scriptInfo.fileName = file.name

        this.fileToBase64(file.raw).then(dataStr => {
          this.scriptInfo.byteContentStr = dataStr
        })
      }
    },
    fileToBase64(file) {
      this.schedule = 0
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        // 监听读取进度
        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            // 更新进度
            this.schedule = Math.round((event.loaded / event.total) * 100)
          }
        }
        reader.onload = () => {
          const base64 = reader.result
          resolve(base64)
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    },
    commitScript() {
      let url = this.scriptInfo?.id ? "update" : "add";
      this.scriptInfo.createdDate = null
      this.scriptInfo.updatedDate = null
      if (this.scriptInfo.scriptStatus?.key) {
        this.scriptInfo.scriptStatus = this.scriptInfo.scriptStatus.key
      }
      // 上传接口需要单独设置超时时间 【20秒】
      this.$axios.post("/script_info/" + url, this.scriptInfo, {timeout: 20000}).then(resp => {
        ElementUI.Message.success("脚本提交成功");
        this.$router.push({path: "/script_detail", query: {id: resp.data.data}})
      })
    },
    refresh() {
      let id = this.$route.query.id;

      if (!(id)) {
        return;
      }

      this.$axios.get("script_info/" + id).then(resp => {
        this.scriptInfo = resp.data.data;
      })
    }

  }

}
</script>


<style scoped>
.el-row {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>