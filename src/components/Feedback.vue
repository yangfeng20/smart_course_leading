<template>

  <div style="margin: 10px">

    <!--空白占位；-->
    <el-row>
      <div style="height: 40px"></div>
    </el-row>
    <el-input v-model="form.email" prefix-icon="el-icon-chat-dot-square" placeholder="回件邮箱"
              style="width: 50%"></el-input>
    <el-button type="primary" @click="submitForm">提交反馈</el-button>
    <br/>
    <div>
      <quill-editor v-model="form.content" :options="editorOption"
                    style="height: 500px"></quill-editor>
    </div>


  </div>

</template>

<script>
import ElementUI from 'element-ui'

export default {
  data() {
    return {
      form: {
        email: '',
        content: ''
      },
      editorOption: {
        placeholder: '反馈内容',
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
    };
  },
  methods: {
    async submitForm() {
      if (!this.form.email || !this.form.content) {
        ElementUI.Message.warning("您的邮箱和反馈意见不可为空哟")
        return
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(this.form.email)) {
        ElementUI.Message.warning("您的邮箱不是合法邮箱地址")
        return
      }

      this.$axios.post('/feedback/send_email', {
        msg: this.form.content,
        senderEmail: this.form.email
      }).then(_=> {
        ElementUI.Message.success("提交成功");
        this.$router.push("/")
      })
    }
  }
};
</script>
