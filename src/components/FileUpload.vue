<template>
  <div>
    <div class="file-upload">
      <el-upload
          ref="upload"
          action=""
          :on-change="handleChange"
          :file-list="fileList"
          :auto-upload="false"
          :show-file-list="false"
          :before-upload="beforeUpload">
        <slot name="trigger">
          <el-button size="small" type="primary">点击上传</el-button>
        </slot>
      </el-upload>
    </div>
    <el-tag type="info" v-text="file.name" v-show="file.name"></el-tag>
  </div>


</template>

<script>
export default {
  name: "FileUpload",
  data() {
    return {
      fileList: [],
      file: {
        name: '',
        byteContent: null
      }
    }
  },
  methods: {
    handleChange(event) {
      const file = event

      if (file.status === 'ready') {
        this.file.name = file.name

        const reader = new FileReader()

        reader.onload = () => {
          const content = reader.result
          this.file.byteContent = new Uint8Array(content)
        }

        reader.readAsArrayBuffer(file.raw)
      }
    },
    beforeUpload(file) {
      this.fileList.push(file)
      return false
    },
  }
}
</script>

<style scoped>
.file-upload {
  width: 200px;
  height: 100px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
