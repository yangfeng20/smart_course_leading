<template>
  <div class="body">
    <el-container>
      <el-aside width="200px" class="catalogue">
        <div style="border-bottom: 1px solid rgba(228, 230, 235, 0.5);">
          <div><span style="font-size:18px;padding-left:5px;padding-top: 10px;">目录</span></div>
          <el-divider></el-divider>
          <div v-for="item in catalogue">
            <el-link :underline="false" type="primary" @click="slide(item.href)">{{ item.name }}</el-link>
          </div>
        </div>

        <!--点赞，评论，收藏-->
        <div style="border-bottom: 1px solid rgba(228, 230, 235, 0.5);padding: 20px">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content bg-purple icon"><i class="el-icon-star-off"></i></div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content bg-purple icon"><i class="el-icon-s-comment"></i></div>
            </el-col>
          </el-row>
        </div>
        <div></div>
      </el-aside>
      <el-main class="article-aside-main">
        <el-container>
          <el-main class="one-article-main">
            <el-container>
              <el-header class="article-top">
                <div>
                  <el-descriptions class="article-item" :column="1" :colon="false">
                    <el-descriptions-item><h1>{{ article.title }}</h1></el-descriptions-item>
                    <el-descriptions-item><h1>{{ article.type }}</h1></el-descriptions-item>

                  </el-descriptions>
                </div>
              </el-header>
              <mavon-editor
                  :subfield="false"
                  :toolbarsFlag="false"
                  defaultOpen="preview"
                  :navigation="true"
                  :boxShadow="false"
                  previewBackground="#fff"
                  style="max-height: 10000px"
                  v-model="article.content"></mavon-editor>
              <el-footer>Footer</el-footer>
            </el-container>
          </el-main>
          <el-aside width="260px" class="aside-right">Aside</el-aside>
        </el-container>
      </el-main>
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
      catalogue: [],
      article: {
        content: "\n## 标题1\n### 标题1-1 \n" +
            "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈123" +
            "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈123" +
            "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈123" +
            "\n## 标题2 \n## 后续标题\n## 后续标题\n## 后续标题\n## 后续标题\n## 后续标题\n## 后续标题\n我的内容",
        title: "关于Java",
        author: "作者",
        readingQuantity: 120,
        starQuantity: 4,
        type: "任务",
        coverImgUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        tagList: ["大数据", "python", "java", "java", "javaaaaaaa", "javavvvv"]
      }

    }
  },

  mounted() {
    this.$nextTick(() => {
      let originalCatalogue = document.querySelector(".v-note-navigation-wrapper.transition");
      originalCatalogue.style = 'display: none;';

      let titleList = document.querySelectorAll(".v-note-navigation-wrapper.transition a");
      let catalogue = []
      titleList.forEach(item => {
        if (item.id) {
          catalogue.push({
            href: item.id,
            name: item.parentElement.innerText
          })
        }
      })

      this.catalogue = catalogue
    })
  },
  methods: {
    slide(id) {
      // 获取指定元素
      let element = document.getElementById(id);

      if (element) {
        // 获取元素的位置信息
        let position = element.getBoundingClientRect();

        // 调整位置信息的top属性，减去80个像素
        let newPositionTop = position.top + window.scrollY - 120.8;

        // 使用原生JavaScript的scrollTo方法实现页面滚动效果
        window.scrollTo({
          top: newPositionTop,
          behavior: 'smooth'  // 添加平滑滚动效果
        });
      }
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

    this.$axios.post('/article' + articleId).then(resp => {
      let article = resp.data.data
      if (article) {
        this.article = article;
      }
      ElementUI.Message.warning("文章不存在，正在跳转列表")
      setTimeout(() => {
        this.$router.push("/article")
      }, 2000)
    }).catch(_ => {
    })
  },
}
</script>

<style scoped>
.body {
  position: relative;
  background-color: #f2f3f5;
}

.el-card__body, .el-main {
  padding: 0;
}

.article-top {
  background-color: #ffffff;
}

.catalogue {
  background-color: #ffffff;
  margin-top: 40px;
}

.el-link {
  line-height: 22px;
  display: inline-block;
  padding: 0 20px 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-aside-main {
  padding-top: 40px;
  padding-left: 20px;
  padding-right: 40px;
}

.one-article-main {
  padding-right: 20px;
}

.aside-right {
  background-color: #ffffff;
}

.grid-content.bg-purple.icon {
  font-size: 2em;
}
</style>