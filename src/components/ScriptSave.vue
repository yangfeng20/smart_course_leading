<template>
  <div>
    <el-form :model="scriptInfo">

      <el-form-item label="脚本名称" :label-width="formLabelWidth">
        <el-input v-model="scriptInfo.scriptName" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="脚本描述" :label-width="formLabelWidth">
        <el-input v-model="scriptInfo.scriptDesc" autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="脚本文件"/>
      <div>
        <div style="width: 100px"></div>
        <el-upload drag action="#"
                   ref="upload"
                   :file-list="fileList"
                   :multiple="false"
                   :auto-upload="false"

                   :on-change="handleChange">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将脚本拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div v-if="!scriptInfo.fileName"><br></div>
        <el-tag type="info" v-text="scriptInfo.fileName" v-show="scriptInfo.fileName"></el-tag>
      </div>


      <el-form-item label="脚本教程" :label-width="formLabelWidth">
        <quill-editor v-model="scriptInfo.scriptCourse" :options="editorOption"
                      style="height: 500px"></quill-editor>
      </el-form-item>
    </el-form>

    <el-progress type="circle" :percentage="schedule" status="success" ref="progress"></el-progress>

    <el-button type="primary" @click="commitScript">提交脚本</el-button>
  </div>
</template>

<script>
import ElementUI from 'element-ui'

export default {

  name: "ScriptSave",
  data() {
    return {
      fileList: [],
      scriptInfo: {},
      formLabelWidth: '80px',
      editorOption: {
        placeholder: '脚本教程',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            ['image'],
            ['clean'],
          ],
        },
      },
      commitPercentage: 0,
      schedule: 0,
    }
  },


  watch: {
    $route(to, from) {
      this.refresh()
    },
  },
  created() {
    this.refresh()
  },

  methods: {
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        fileList.shift()
      }

      if (file.status === 'ready') {
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
      this.$axios.post("/script_info/" + url, this.scriptInfo).then(resp => {
        this.commitPercentage = 0
        ElementUI.Message.success("脚本提交成功");
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

</style>