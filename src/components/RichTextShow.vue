<template>
  <div>

    <quill-editor ref="quill-editor" v-model="innerTextData" :options="editorOption"
                  style="height: 500px;width: 100%" :readonly="true"></quill-editor>


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
      innerTextData: ""
    }
  },
  watch: {
    content() {
      this.innerTextData = this.content
    },

    innerTextData(){
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