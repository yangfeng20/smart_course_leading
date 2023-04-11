<template>
<div>
  <div class="container-parent">
    <div class="container" v-html="value"></div>
    <!--<quill-editor-->
    <!--    v-model="value"-->
    <!--    :options="editorOption"-->
    <!--    style="height: 500px;width: 100%"-->
    <!--/>-->
  </div>
</div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor'

export default {
  name: 'RichTextShowReadonly',

  components: {
    quillEditor,
  },
  props: {
    content: {
      type: String,
      required: true,
    },
    rows: {
      type: Number,
      default: 6,
    },
  },
  watch: {
    content: function (newVal, oldVal){
      if (this.render === true) {
        return;
      }

      if (oldVal===''){
        this.render = true
        this.value = newVal
      }
    },
  },


  data() {
    return {
      editorOption: {
      },
      value:'',
      render: false,
    }
  },
}
</script>

<style scoped>
.el-input__suffix .el-icon-view {
  color: #999;
}

.container-parent {
  background-color: rgb(236, 204, 204);
  padding: 2px;
}

.container {
  background-color: rgb(245, 239, 239);
  margin: 2px;
  padding: 10px;
}

</style>
