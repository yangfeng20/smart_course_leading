<template>
  <div>

    <quill-editor ref="quill-editor" v-model="content" :options="editorOption"
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

      innerText:this.props['content']
    }
  },
  watch: {
    content() {
      return this.props['content']
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