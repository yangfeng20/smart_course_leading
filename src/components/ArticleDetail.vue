<template>
  <div class="body">
    <el-container style="height: 100%">
      <el-aside width="200px" class="catalogue" style="position: fixed;">

        <!--点赞，评论，收藏-->
        <div style="border-bottom: 1px solid rgba(228, 230, 235, 0.5);padding: 10px 10px">
          <el-row :gutter="8">
            <el-col :span="6">
              <div class="grid-content bg-purple icon">
                <i @click="windowWith.history.back()" class="el-icon-back opt-icon"></i>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple icon">
                <i @click="shareArticle" class="el-icon-share opt-icon"></i>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple icon" @click="starArticle">
                <el-badge :value="article.starQuantity" :max="999" class="item" type="primary">
                  <i v-if="stared" class="el-icon-star-on opt-icon"></i>
                  <i v-if="!stared" class="el-icon-star-off opt-icon"></i>
                </el-badge>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple icon">
                <el-badge :value="messageTotal" :max="99" class="item" type="warning">
                  <i @click="slide('commentList')" class="el-icon-s-comment opt-icon"></i>
                </el-badge>
              </div>
            </el-col>
          </el-row>
        </div>

        <div style="border-bottom: 1px solid rgba(228, 230, 235, 0.5);min-height: 900px">
          <div><span style="font-size:18px;padding-left:5px;padding-top: 10px;">目录</span></div>
          <div style="height: 20px"></div>
          <div v-for="item in catalogue">
            <el-link :underline="false" type="primary" @click="slide(item.href)">{{ item.name }}</el-link>
          </div>
        </div>
      </el-aside>

      <el-main class="article-aside-main">
        <el-container>
          <el-main class="one-article-main">
            <el-container>
              <el-header class="article-top">
                <div>
                  <h1>{{ article.title }}</h1>
                </div>
              </el-header>
              <el-row :gutter="0" class="article-last-row">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                    <el-tag effect="dark">{{ article?.type?.desc }}</el-tag>
                    | {{ article?.author?.desc?.nickname }}
                  </div>
                </el-col>

                <el-col :span="4" class="article-icon">
                  <div class="grid-content bg-purple">
                    <i class="el-icon-view"></i>
                    {{ article.readingQuantity }}
                    <i class="el-icon-star-on"></i>
                    {{ article.starQuantity }}
                  </div>
                </el-col>

                <el-col :span="14">
                  <el-row :gutter="5" class="article-tag-div">
                    <el-col :span="3.5" v-for="tag in article.tagList">
                      <el-tag style="color: #eff0f1" ref="articleTag"
                              :color="tag.color"
                              @click.stop=""
                              effect="plain">{{ tag.name }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>

              </el-row>
              <mavon-editor
                  :subfield="false"
                  :toolbarsFlag="false"
                  defaultOpen="preview"
                  :navigation="true"
                  :boxShadow="false"
                  previewBackground="#fff"
                  style="max-height: 10000px"
                  v-model="article.content"></mavon-editor>
              <el-footer style="height: 100%">
                <div class="footer-body" id="commentList">
                  <Remark :message-list="messageList" :show-create-comment="true" :link-id="article.id"></Remark>
                </div>
              </el-footer>
            </el-container>
          </el-main>
          <el-aside width="280px" class="aside-right">
            <div style="height: 200px">
              <UserInfoCard :user-info="authorUserInfo"></UserInfoCard>
            </div>
            <div v-if="article.type === '任务'">
              <el-card shadow="hover">
                <el-steps direction="vertical" :space="100" :active="task?.status" finish-status="success">
                  <el-step @click.native="taskApply" title="申请" icon="el-icon-collection-tag"></el-step>
                  <el-step @click.native="taskCommit" title="提交" icon="el-icon-edit-outline"></el-step>
                  <el-step @click.native="taskAudit" title="审核" icon="el-icon-monitor"
                           :description="task?.ext?.audit?.desc"
                           :status="task?.ext?.audit?.status"></el-step>
                  <el-step @click.native="taskFinish" title="完成" icon="el-icon-folder-checked"
                           :description="task.status === 4 ? '点击领取金币':''"></el-step>
                </el-steps>
              </el-card>
            </div>
            <div style="margin-top: 40px">
              <HotArticleList></HotArticleList>
            </div>

            <div style="margin-top: 40px">
              <Sponsor></Sponsor>
            </div>

            <div style="margin-top: 40px">
              <SiteManager></SiteManager>
            </div>

          </el-aside>
        </el-container>
      </el-main>
    </el-container>
    <el-backtop style="right: 1px"></el-backtop>

    <!--提交任务内容-->
    <el-dialog
        title="提交任务"
        :visible.sync="commitFormDialogVisible"
        width="50%"
        :before-close="handleClose">
      <mavon-editor
          ref='md'
          :boxShadow="false"
          previewBackground="#fff"
          placeholder="提交您的任务凭证，文字以及截图..."
          @imgAdd="wrappedImgAdd"
          v-model="task.content"></mavon-editor>
      <span slot="footer" class="dialog-footer">
    <el-button @click="commitFormDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doTaskCommit">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import ElementUI from 'element-ui'
import {mavonEditor} from 'mavon-editor';
import Remark from "../components/Remark";
import UserInfoCard from "../components/UserInfoCard";
import 'mavon-editor/dist/css/index.css';
import HotArticleList from "../components/HotArticleList";
import Sponsor from "../components/Sponsor";
import SiteManager from "../components/SiteManager";

export default {
  name: "ArticleDetail",
  components: {
    mavonEditor,
    Remark,
    UserInfoCard,
    HotArticleList,
    Sponsor,
    SiteManager
  },
  data() {
    return {
      authorUserInfo: {},
      stared: false,
      messageTotal: 0,
      catalogue: [],
      commitFormDialogVisible: false,
      task: {
        status: 4,
        ext: {
          audit: {
            status: 'error',
            desc: "上传文件不对",
          }
        }
      },
      article: {},
      messageList: [],
    }
  },

  mounted() {
    this.$nextTick(() => {
      // 隐藏自带目录
      let originalCatalogue = document.querySelector(".v-note-navigation-wrapper.transition");
      originalCatalogue.style = 'display: none;';

      // 构建侧边目录
      let catalogue = []
      setTimeout(() => {
        let titleList = document.querySelectorAll(".v-note-navigation-wrapper.transition a");
        titleList.forEach(item => {
          if (item.id) {
            catalogue.push({
              href: item.id,
              name: item.parentElement.innerText
            })
          }
        })
        this.catalogue = catalogue
      }, 300)
    })
  },
  methods: {

    wrappedImgAdd(pos, $file) {
      this.$func.imgAddVue(pos, $file, this);
    },

    taskApply() {
      if (this.task.status >= 1) {
        this.$notify({
          title: '申请失败',
          message: '当前任务已经申请了哟!',
          type: 'info'
        });
        return;
      }

      this.$axios.post('/task/task_apply?articleId=' + this.task.articleId).then(_ => {
        this.$notify({
          title: '任务申请成功',
          message: '请按照教程完成任务，然后提交任务信息',
          type: 'success'
        });
      })
    },

    handleClose(done) {
      // 关闭确认，不需要
      // this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {
      //     });
    },

    doTaskCommit() {
      this.commitFormDialogVisible = true
      this.$axios.post("/task/commit", {
        taskId: this.task.id,
        articleId: this.task.articleId,
        content: this.task.content
      }).then(_ => {
        this.$notify({
          title: '任务提交成功',
          message: '提交成功，等待管理员审核',
          type: 'success'
        });
      })
    },

    taskCommit() {
      // 这里这是显示弹框，不是真正提交
      // 申请任务（第一次提交），提交任务（更新提交），
      if (this.task.status === 1 || this.task.status === 2) {
        this.commitFormDialogVisible = true
      }

      // 审核（被驳回，重新提交）
      if (this.task.status === 3 && this.task.ext?.audit?.status === 'error') {
        this.commitFormDialogVisible = true
      }
    },
    taskAudit() {
      if (this.task.status !== 3) {
        return;
      }
      this.$notify({
        title: '等待管理员审核',
        message: '当前任务已经申请了哟!',
        type: 'info'
      });
    },
    taskFinish() {
      if (this.task.status !== 4) {
        return;
      }

      this.$axios.post('/task/task_award?id=' + this.task.id).then(_ => {
        this.$notify({
          title: '任务奖励领取成功',
          message: '金币已放入您的个人钱包中了哟!',
          type: 'success'
        });
      })
    },
    starArticle() {
      if (this.stared) {
        this.$notify({
          title: '收藏文章失败',
          message: '已经收藏过文章了哟',
          type: 'warning'
        });
        return;
      }

      this.$axios.post("/article/star?articleId=" + this.article.id).then(resp => {
        if (resp.data.data) {
          this.$notify({
            title: '收藏文章',
            message: '文章已经放进你的收藏夹了哟',
            type: 'success'
          })
          this.stared = true
          this.article.starQuantity += 1
        } else {
          this.$notify({
            title: '收藏失败',
            message: '未知错误',
            type: 'error'
          })
        }
      })
    },
    shareArticle() {
      this.copyToClipboard(location.href)
      this.$notify({
        title: '链接复制成功',
        message: '文章链接已复制到剪辑版，快去分享吧！',
        type: 'success'
      });
    },
    copyToClipboard(content) {
      // 创建一个临时的textarea元素
      const textarea = document.createElement('textarea');
      textarea.value = content;
      document.body.appendChild(textarea);

      // 选择并复制文本
      textarea.select();
      document.execCommand('copy');

      // 移除临时元素
      document.body.removeChild(textarea);
    },
    slide(id) {
      // 获取指定元素
      let element = document.getElementById(id);

      if (element) {
        // 获取元素的位置信息
        let position = element.getBoundingClientRect();

        // 调整位置信息的top属性，减去80个像素
        let newPositionTop = position.top + window.scrollY - 100;

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
  }
  ,
  computed: {
    windowWith() {
      return window;
    }
  }
  ,
  created() {
    let pathArr = this.$route.path.split("/");
    let articleId = pathArr[pathArr.length - 1];
    if (!this.isIntegerString(articleId)) {
      console.log("跳转list")
      this.$router.push("/article")
      return;
    }

    this.$axios.get('/article/' + articleId).then(resp => {
      let article = resp.data.data
      if (!article) {
        ElementUI.Message.warning("文章不存在，正在跳转列表")
        setTimeout(() => {
          this.$router.push("/article")
        }, 2000)
        return;
      }

      this.article = article;
      this.authorUserInfo = article?.author?.desc
      this.$axios.post("/message/search", {
        linkId: articleId,
        recursion: true,
        msgType: 4,
      }).then(resp => {
        this.messageList = resp.data.data.content
        this.messageTotal = resp.data.data.total
      })

      // 是否收藏文章
      this.$axios.post("/article/get_my_start_article_list_id").then(resp => {
        let articleList = resp.data.data;
        if (articleList.includes(parseInt(articleId))) {
          this.stared = true
        }
      })


    }).catch(_ => {
    })

  }
  ,
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
  padding-left: 220px;
  padding-right: 40px;
  overflow: visible;
}

.one-article-main {
  padding-right: 20px;
  overflow: visible;
}

.aside-right {
  background-color: #ffffff;
  padding: 10px;
}

.grid-content.bg-purple.icon {
  font-size: 1.5em;
}

.article-last-row {
  background-color: #ffffff;
  padding-left: 20px;
}

.footer-body {
  /*margin: 40px 0;*/
  margin: 40px 0 0 0;
  padding: 0;
  background-color: #ffffff;
}

.el-footer {
  padding: 0;
}

.opt-icon {
  border-radius: 50%;
  background-color: #f2f3f5;
  padding: 5px;
}

/*鼠标悬停文章效果*/
.opt-icon:hover {
  cursor: pointer;
}

.item > :nth-child(2) {
  top: 5px;
  right: 12px;
}
</style>