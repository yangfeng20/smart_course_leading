<template>
  <div class="body">
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <mavon-editor
              :subfield="false"
              :toolbarsFlag="false"
              defaultOpen="preview"
              :navigation="true"
              @navigationToggle="addUrl"
              style="max-height: 10000px"
              v-model="article.content"></mavon-editor>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
import {mavonEditor} from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

export default {
  name: "ArticleDetail",
  components: {
    mavonEditor
  },
  data() {
    return {
      article: {
        content: "# 文章标题\n## 标题1\n### 标题1-1 \n" +
            "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈123" +
            "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈123" +
            "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈123" +
            "\n## 标题2 \n## 后续标题\n## 后续标题\n## 后续标题\n## 后续标题\n## 后续标题\n## 后续标题\n我的内容"
      }
    }
  },

  methods: {
    test(status, val) {
      console.log(status, val)
    },
    addUrl() {
      console.log("aaaa")
      this.$nextTick(function () {
        let _aList = document.querySelectorAll(".v-note-navigation-content a");
        for (let i = 0; i < _aList.length; i++) {
          let _aParent = _aList[i].parentNode;
          let _a = _aParent.firstChild;
          if (!_a.id) continue; // 把不属于导航中的a标签去掉，否则会报错
          let _text = _aParent.lastChild;
          let text = _text.textContent;
          _a.href = "#" + _a.id;
          _a.innerText = text;
          _aParent.removeChild(_text);
          // _a.style.color = "red";
        }
      });
    },

    isIntegerString(str) {
      // 检查字符串是否只包含数字字符
      const isNumberString = /^[0-9]*$/.test(str);

      // 检查字符串是否以数字开头
      const startsWithNumber = !isNaN(parseInt(str.charAt(0)));

      // 检查字符串是否为整数
      const isInteger = !isNaN(Number(str));

      return isNumberString && startsWithNumber && isInteger;
    }
  },
  created() {
    let pathArr = this.$route.path.split("/");
    let articleId = pathArr[pathArr.length - 1];
    if (!this.isIntegerString(articleId)) {
      console.log("跳转list")
      this.$router.push("/article")
      return;
    }

    // this.$axios.post('/article' + articleId).then(resp => {
    //   let article = resp.data.data
    //   if (article) {
    //     this.article = article;
    //   }
    //   ElementUI.Message.warning("文章不存在，正在跳转列表")
    //   setTimeout(() => {
    //     this.$router.push("/article")
    //   }, 2000)
    // }).catch(_ => {
    // })
  },
}
</script>

<style scoped>
.body {
  position: relative;
}


.v-note-navigation-wrapper.transition{
  display: none;
}
</style>