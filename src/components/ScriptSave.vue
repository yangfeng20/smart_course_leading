<template>
  <div>
    <el-form :model="scriptInfo">

      <el-form-item label="脚本名称" :label-width="formLabelWidth">
        <el-input v-model="scriptInfo.scriptName" autocomplete="off" placeholder="需要定制的脚本简短描述"></el-input>
      </el-form-item>

      <el-form-item label="脚本文件" :label-width="formLabelWidth">
        <el-input v-model="scriptInfo.scriptDesc" autocomplete="off"
                  placeholder="需要定制脚本的网站url"></el-input>
      </el-form-item>

      <FileUpload @upload="handleUpload" />

      <el-form-item label="账号信息" :label-width="formLabelWidth">
        <el-input v-model="scriptInfo.accountInfo" autocomplete="off"
                  placeholder="定制脚本网站的账号（用于站长制造调试脚本，不会在列表显示）"></el-input>
      </el-form-item>

      <el-form-item label="脚本教程" :label-width="formLabelWidth">
        <quill-editor v-model="scriptInfo.scriptCourse" :options="editorOption"
                      style="height: 500px"></quill-editor>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FileUpload from "@/components/FileUpload";

export default {
  components: {
    FileUpload
  },
  name: "ScriptSave",
  data() {
    return {
      scriptInfo: {},
      formLabelWidth: '80px',
      editorOption: {
        placeholder: '请输入定制脚本的描述\n包含需要定制脚本的网站地址\n网站账号',
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
    handleUpload(){
      console.log("aaaaa")
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