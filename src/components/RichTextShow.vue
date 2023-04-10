<template>
  <div>

    <quill-editor ref="quill-editor" v-model="innerTextData" :options="editorOption"
                  style="height: 500px" :readonly="true"></quill-editor>


  </div>

</template>

<script>

import {quillEditor} from 'vue-quill-editor';


export default {
  components: {quillEditor},
  name: "RichTextShow",
  props: ["content"],
  data() {
    return {
      editorOption: {
        placeholder: '无提示',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            ['image'],
          ],
        },
      },
      innerTextData: ""
    }
  },
  watch: {
    content() {
      console.log("watch执行")
      this.innerTextData = this.content
    },

    innerTextData(){
      console.log("inner 监听执行")
      return this.innerTextData
    }
  }

}

</script>
<style>
.editor,
.ql-toolbar {
  white-space: pre-wrap !important;
  line-height: normal !important;
}

</style>