<template>
  <div class="body">
    <el-container>
      <el-header class="header-edit">
        <el-input class="title-edit" v-model="article.title" placeholder="文章标题"></el-input>
        <div class="but-opt">
          <el-button type="primary" @click="saveArticleDraft" plain>保存草稿</el-button>
          <el-button type="primary" @click="clickReleaseArticle">发布文章</el-button>
          <!--<div style="margin-left: 10px">-->
          <!--  <el-image-->
          <!--      style="width: 40px; height: 40px;border-radius: 50%;"-->
          <!--      :src="userInfo.imgUrl"-->
          <!--      fit="fit"></el-image>-->
          <!--</div>-->
        </div>
      </el-header>
      <el-main>
        <mavon-editor
            ref='md'
            :boxShadow="false"
            previewBackground="#fff"
            placeholder="编辑文章..."
            style="min-height: 700px"
            @imgAdd="imgAdd"
            @keydown.native="deleteWord"
            v-model="article.content"></mavon-editor>
      </el-main>
    </el-container>

    <el-dialog
        title="发布文章"
        :visible.sync="saveArticleDialogVisible"
        width="40%">
      <div>
        <el-dialog
            width="30%"
            title="创建标签"
            :visible.sync="newTagInnerVisible"
            append-to-body>
          <div class="block">
            预览效果：
            <el-tag style="color: #eff0f1" ref="articleTag"
                    :color="newTag.color"
                    @mouseenter.native="articleTagMouseEntry"
                    @mouseout.native="articleTagMouseOut"
                    @click.stop=""
                    effect="plain">{{ newTag.name }}
            </el-tag>
            <el-divider></el-divider>
            标签内容：
            <el-input
                style="width: 45%"
                type="text"
                placeholder="标签内容"
                v-model="newTag.name"
                :maxlength="9"
                :minlength="2"
                show-word-limit/>
            <span class="demonstration"> 标签背景色：</span>
            <el-color-picker style="position: relative;top: 13px;" v-model="newTag.color"
                             @active-change="colorChange"></el-color-picker>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="saveNewTag">创 建
            </el-button>
          </div>
        </el-dialog>
        <div>
          文章类型：
          <el-radio-group v-model="article.type.key">
            <el-radio-button @click="article.type.key = item.key" v-for="item in typeList" :label="item.key" border>
              {{ item.desc }}
            </el-radio-button>
          </el-radio-group>
          <br>
          <br>
          <!--为任务时可支持奖励-->
          <div v-if="typeList?.map(item=>item.key).includes(4)" style="display: flex">
            任务奖励：
            <el-input style="width: 40%"
                      placeholder="输入任务奖励金币数"
                      v-model="article.award"
                      :disabled="article.type.key!==4">
            </el-input>
          </div>
          <br>
          文章标签：
          <el-select
              v-model="article.tagList"
              value-key="key"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="请输入标签搜索"
              :remote-method="searchTag"
              :loading="loading">
            <el-option
                v-for="item in searchTagsTemp" :key="item.key" :label="item.label" :value="item">
              <span style="float: left"><el-tag style="color: #eff0f1"
                                                :color="item.color"
                                                effect="plain">{{ item.label }}</el-tag></span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.key }}</span>
            </el-option>
          </el-select>
          <el-button type="primary" @click="newTagInnerVisible = true">创建标签</el-button>
          <div style="margin-top: 10px;">
            文章封面：
            <el-upload
                style="width: 280px"
                class="upload-demo"
                drag
                :limit="1"
                :before-upload="upCompressImg"
                :on-success="uploadSuccess"
                :on-remove="removeImg"
                :headers="this.$func.getAuthHeader()"
                :on-exceed="(files, fileList)=>this.$notify({title: '上传文章封面失败',message: '请先移除之前上传的封面',type: 'error'})"
                :action="this.$axios.defaults.baseURL+'file/upload'">
              <div v-if="coverImgUrlShow" style="height: 360px;width: 360px;">
                <el-image :src="article.coverImgUrl" fit="fit"/>
              </div>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过2M</div>
            </el-upload>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="saveArticleDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="releaseArticle">发 布</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import ElementUI from "element-ui";

export default {
  name: "EditArticle",
  components: {
    mavonEditor,
  },
  data() {
    return {
      newTag: {
        color: '#409EFF',
        name: "标签名"
      },
      searchTagsTemp: [],
      loading: false,
      newTagInnerVisible: false,
      saveArticleDialogVisible: false,
      typeList: [],
      coverImgUrlShow: false,
      article: {
        type: {
          key: 2
        },
        coverImgUrl: '',
        award: '',
      },
    }
  },

  created() {
    let pathArr = this.$route.path.split("/");
    let articleId = pathArr[pathArr.length - 1];
    if (!this.isIntegerString(articleId)) {
      return;
    }


    // 存在文章，获取文章数据
    this.$axios.get('/article/' + articleId).then(resp => {
      let article = resp.data.data

      if (article) {
        let tagList = resp.data.data.tagList.map(item => {
          return {key: item.id, label: item.name, color: item.color}
        });
        // 回显标签需要选项集合中有对应的值，才能回显
        this.searchTagsTemp = tagList
        this.article = {
          ...article,
          award: JSON.parse(article.extInfo).award,
          tagList: tagList
        };
        if (this.article?.coverImgUrl.startsWith("http")) {
          this.coverImgUrlShow = true
        }

        return;
      }
      ElementUI.Message.warning("文章不存在，正在跳转列表")
      setTimeout(() => {
        this.$router.push("/article")
      }, 2000)
    }).catch(_ => {
    })

  },
  methods: {
    clickReleaseArticle() {
      this.saveArticleDialogVisible = true

      if (this.typeList.length === 0) {
        this.$axios.post("/article/get_all_type").then(resp => {
          this.typeList = resp.data.data
        }).catch(_ => {
        })
      }
    },
    saveArticleDraft() {
      if (!this.article.title) {
        this.$notify({
          title: "文章发布失败",
          message: "请编写文章标题",
          type: "warning"
        })
        return;
      }

      let request
      let requestParam = {
        ...this.article,
        status: 1,
        type: this.article.type?.key,
        tagList: this.article.tagList?.map(tag => tag.key),
        extInfo: JSON.stringify({award: this.article.award})
      }
      if (this.article.id) {
        request = this.$axios.put("/article/update", requestParam)
      } else {
        request = this.$axios.post("/article/add", requestParam)
      }

      request.then(resp => {
        this.article.id = resp.data.data
        this.$notify({
          title: "文章草稿保存成功",
          message: "文章草稿保存成功",
          type: "success"
        })
      }).catch(_ => {

      })
    },
    releaseArticle() {
      if (!this.article.title) {
        this.$notify({
          title: "文章发布失败",
          message: "请编写文章标题",
          type: "warning"
        })
        return;
      }
      if (!this.article.type.key) {
        this.$notify({
          title: "文章发布失败",
          message: "请选择文章类型",
          type: "warning"
        })
        return;
      }
      if (this.article.type.key === 4 && !this.article.award) {
        this.$notify({
          title: "文章发布失败",
          message: "请指定任务奖励金币",
          type: "warning"
        })
        return;
      }
      this.saveArticleDialogVisible = false
      let request
      let requestParam = {
        ...this.article,
        status: 2,
        type: this.article.type?.key,
        tagList: this.article.tagList?.map(tag => tag.key),
        extInfo: JSON.stringify({award: this.article.award})
      }
      if (this.article.id) {
        request = this.$axios.put("/article/update", requestParam)
      } else {
        request = this.$axios.post("/article/add", requestParam)
      }

      request.then(resp => {
        this.$notify({
          title: "文章发布成功",
          message: "等待管理员审核文章-正在跳转列表",
          type: "success"
        })
        setTimeout(() => {
          this.$router.push("/article")
        }, 1000)
      }).catch(_ => {

      })
    },
    removeImg(file, fileList) {
      this.coverImgUrlShow = false
    },
    uploadSuccess(resp, file, fileList) {
      if (resp.code!==200){
        this.$notify({
          type:"error",
          title:"上传文件失败",
          message:resp.requestId
        })
        return;
      }
      this.article.coverImgUrl = resp.data
      this.coverImgUrlShow = true
    },

    upCompressImg($file) {
      if (!['image/jpeg', 'image/png', 'image/gif'].includes($file.type)) {
        // 如果不是图片类型，则提示错误并返回 false
        this.$notify({
          title: '上传文章封面失败',
          message: '只能上传图片',
          type: 'error'
        });
        return false;
      }
      if ($file.size / 1024 / 1024 > 2) {
        this.$notify({
          title: '上传文章封面失败',
          message: '上传文件不能大于2M',
          type: 'error'
        });
        return false;
      }
      console.debug("上传文件大小", $file.size / 1024, 'KB', $file)
      return new Promise((resolve, reject) => {
        if ($file.type === 'image/gif') {
          // todo gif文件不支持压缩
          return resolve($file)
        }
        this.$func.compressImg($file).then(newFile => {
          console.debug("压缩文件大小", newFile.size / 1024, 'KB', newFile)
          return resolve(newFile)
        })
      })
    },
    saveNewTag() {
      if (!this.newTag.name || !this.newTag.color) {
        this.$notify({
          title: '创建标签失败',
          message: '请输入标签名和背景色',
          type: 'error'
        });
        return;
      }
      this.newTagInnerVisible = false
      this.$axios.post("tag/save", this.newTag).then(_ => {
        this.$notify({
          title: '创建标签成功',
          message: '请在搜索框搜索使用',
          type: 'success'
        });
      }).catch(_ => {
      })
    },
    colorChange(color) {
      this.newTag.color = color
    },
    articleTagMouseEntry(event) {
      // 暂存标签原值
      event.target.temp1 = event.target.style.backgroundColor;
      event.target.temp2 = event.target.style.color;

      event.target.style.backgroundColor = '#fff';
      event.target.style.color = '#606278';
    },
    articleTagMouseOut(event) {
      // 还原标签颜色
      event.target.style.backgroundColor = event.target.temp1;
      event.target.style.color = event.target.temp2;
    },
    searchTag(query) {
      if (query === '') {
        return;
      }
      this.loading = true;
      this.$axios.post("tag/search", {
        name: query,
      }).then(resp => {
        this.loading = false
        this.searchTagsTemp = resp.data.data.content.map(item => {
          return {key: item.id, label: item.name, color: item.color};
        });
      })
    },
    deleteWord(event) {
      // 检查按下的键是否是 Backspace 键，并且是否按下了 Ctrl 键
      if (event.key === 'Backspace' && event.ctrlKey) {
        event.preventDefault(); // 阻止默认行为（删除一个字符）

        let textarea = document.querySelector(".auto-textarea-input.no-border.no-resize");

        // 获取文本框内容
        const text = textarea.value;

        // 寻找最后一个单词的起始位置
        const lastWordStart = text.lastIndexOf(' ', textarea.selectionStart - 1) + 1;

        // 截取字符串，保留最后一个单词之前的内容和之后的内容
        const newText = text.slice(0, lastWordStart) + text.slice(textarea.selectionEnd);

        // 更新文本框内容
        textarea.value = newText;
        this.article.content = newText;
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
    },

    imgAdd(pos, $file) {
      this.$func.imgAddVue(pos, $file, this)
    }
  }
}
</script>

<style scoped>

.body {
  position: relative;
  background-color: #f2f3f5;
}

.header-edit {
  height: 50px;
  display: flex;
  margin-top: 5px;
}

.title-edit > :first-child {
  font-size: 24px;
  height: 60px;
  font-weight: 600;
}

.but-opt {
  display: flex;
  padding: 10px;
  background-color: #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>