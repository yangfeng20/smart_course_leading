<template>
  <div>
    <el-container class="articleList-div" v-if="!deleted">
      <!--文章主体内容-->
      <el-main class="article-item-parent">
        <div @click="clickArticleItem">
          <el-descriptions class="article-item" :column="1" :colon="false">
            <el-descriptions-item><span class="article-title">{{ article.title }}</span>
            </el-descriptions-item>
            <el-descriptions-item>{{ article.content }}</el-descriptions-item>
            <el-descriptions-item>
              <el-row :gutter="0" class="article-last-row">

                <div>
                  <el-row :gutter="5" class="article-tag-div">
                    <el-col :span="3.5" v-for="tag in article.tagList">
                      <el-tag style="color: #eff0f1" ref="articleTag"
                              size="medium"
                              :color="tag.color"
                              @click.stop=""
                              effect="plain">{{ tag.name }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </div>

                <div style="display: flex;gap: 20px;padding-top: 5px;">
                  <div class="grid-content bg-purple" style="display:flex;gap: 10px;">
                    <el-tag effect="plain" size="mini">{{ article.type?.desc }}</el-tag>
                    <el-tag effect="plain" size="mini">{{ article.status?.desc }}</el-tag>
                    <!-- 下架理由-->
                    <el-tag v-if="article.status?.key===4" effect="plain" size="mini" color="red" style="color: #eff0f1">
                      文章下架原因：{{ article?.takenDownCause }}
                    </el-tag>
                    <!--审核拒绝理由-->
                    <el-tag v-if="article.status?.key===5" effect="plain" size="mini" color="red" style="color: #eff0f1">
                      审核拒绝原因：{{ JSON.parse(article.extInfo)?.rejectText }}
                    </el-tag>

                    <div>
                      | {{ article.author.desc.name }}
                    </div>
                  </div>

                  <div class="grid-content bg-purple text-item">
                    <i class="el-icon-view"></i>
                    {{ article.readingQuantity }}
                    <i class="el-icon-star-on"></i>
                    {{ article.starQuantity }}
                  </div>
                </div>
                <div style="display: flex;gap: 20px;">
                  <div class="text-item">创建时间：{{ article.createdDate }}</div>
                  <div class="text-item">更新时间：{{ article.updatedDate }}</div>
                </div>
                <div style="margin-top: 10px;" v-if="opt" class="optDiv">
                  <el-tooltip class="item" effect="dark" content="编辑文章" placement="bottom">
                    <el-button @click.stop="()=>this.$router.push('/article/edit/' + article.id)" type="primary"
                               icon="el-icon-edit" size="mini" circle></el-button>
                  </el-tooltip>

                  <el-tooltip class="item" effect="dark" content="删除文章" placement="bottom">
                    <el-button @click.stop="deleteArticle" type="danger" icon="el-icon-delete" size="mini"
                               circle></el-button>
                  </el-tooltip>

                  <el-tooltip class="item" effect="dark" content="发布文章" placement="bottom">
                    <el-button v-if="article.status?.key===1" type="success" icon="el-icon-check" size="mini"
                               circle></el-button>
                  </el-tooltip>

                  <el-tooltip class="item" effect="dark" content="下架文章" placement="bottom">
                    <el-button v-if="adminPermission" @click.stop="articleDownDialogVisible=true" type="warning"
                               icon="el-icon-error"
                               size="mini"
                               circle></el-button>
                  </el-tooltip>

                  <el-tooltip class="item" effect="dark" content="审核文章" placement="bottom">
                    <el-button v-if="adminPermission" @click.stop="auditDialogVisible=true" type="info"
                               icon="el-icon-printer"
                               size="mini"
                               circle></el-button>
                  </el-tooltip>

                </div>

                <el-dialog
                    title="审核文章"
                    :visible.sync="auditDialogVisible"
                    width="30%"
                    :before-close="handleClose">
                  <el-input @click.stop="" v-model="rejectText" placeholder="不通过请说明原因"></el-input>
                  <span slot="footer" class="dialog-footer">
                <el-button @click.stop="doAudit(false)">不通过</el-button>
                <el-button type="primary" @click.stop="doAudit(true)">通过</el-button>
                </span>
                </el-dialog>

                <el-dialog
                    title="下架文章"
                    :visible.sync="articleDownDialogVisible"
                    width="30%"
                    :before-close="handleClose">
                  <el-input @click.stop="" v-model="takenDownCause" placeholder="下架原因"></el-input>
                  <span slot="footer" class="dialog-footer">
                <el-button @click.stop="articleDownDialogVisible=false">取消</el-button>
                <el-button type="primary" @click.stop="doRemovedFromShelves">提交</el-button>
                </span>
                </el-dialog>

              </el-row>
            </el-descriptions-item>
          </el-descriptions>
        </div>
      </el-main>

      <!--文章首页图片-->
      <el-aside width="130px" style="padding-top: 10px;">
        <el-image
            style="width: 100px; height: 100px"
            :src="article.coverImgUrl"
            fit="fit"></el-image>
      </el-aside>

    </el-container>
  </div>
</template>

<script>
export default {
  name: "ArticleListItem",
  data() {
    return {
      deleted: false,
      auditDialogVisible: false,
      articleDownDialogVisible: false,
      rejectText: "",
      takenDownCause: "",
    }
  },
  props: ['article', 'opt', 'adminPermission'],
  methods: {
    // 下架文章
    doRemovedFromShelves() {
      this.$axios.post("/article/taken_down_article?articleId=" + this.article.id + "&takenDownCause=" + this.takenDownCause).then(resp => {
        this.$notify({
          type: "success",
          title: "文章下架成功",
          message: "文章下架成功"
        })
      })
      this.articleDownDialogVisible = false
    },
    clickArticleItem(e) {
      // 操作列表不进入文章详情
      // todo 暂时有个bug，就是点击弹窗空白还是会跳转详情
      if (e.target.classList instanceof DOMTokenList
          && (e.target.classList.contains("el-dialog__close") || e.target.classList.contains("el-input__inner")
              || e.target.classList.contains("el-dialog__wrapper"))) {
        return;
      }
      this.$router.push('/article/detail/' + this.article.id)
    },
    doAudit(pass) {
      if (!pass && !this.rejectText) {
        this.$notify({
          type: "error",
          title: "审核失败",
          message: "拒绝通过请说明原因"
        })
        return;
      }

      this.$axios.post("/article/audit_article?articleId=" + this.article.id + "&pass=" + pass + "&rejectText=" + this.rejectText).then(resp => {
        this.$notify({
          type: "success",
          title: "审核文章",
          message: "操作成功"
        })
      })
      this.auditDialogVisible = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
    },
    deleteArticle() {
      this.$axios.delete("/article/delete?idList=" + this.article.id).then(resp => {
        this.$notify({
          title: '删除成功',
          message: '文章删除成功',
          type: 'success'
        });
        this.deleted = true
      })
    },
  },
}
</script>

<style scoped>

.articleList-div {
  border-bottom: 1px solid rgba(228, 230, 235, 0.5);
  background-color: #ffffff;
}

.article-item-parent {
  padding-top: 0;
  padding-bottom: 0;
  background-color: transparent;
}

.article-item > :first-child {
  background-color: transparent;
}

/*鼠标悬停文章效果*/
.articleList-div:hover, .article-item-parent:hover, .article-item:hover {
  background: #eff0f1;
}

.article-hit-dev {
  background-color: #ffffff;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: left;
}

.text-item {
  position: relative;
  /*top: 5px*/
}
</style>
