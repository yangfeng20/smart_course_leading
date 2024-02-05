<template>
  <div>
    <el-container class="articleList-div">
      <!--文章主体内容-->
      <el-main class="article-item-parent">
        <div @click="()=>{this.$router.push('/article/detail/'+this.article.id)}">
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
                <div style="margin-top: 10px;" v-if="opt">
                  <el-tooltip class="item" effect="dark" content="编辑文章" placement="bottom">
                    <el-button @click="()=>this.$router.push('/article/edit/' + article.id)" type="primary"
                               icon="el-icon-edit" size="mini" circle></el-button>
                  </el-tooltip>

                  <el-tooltip class="item" effect="dark" content="删除文章" placement="bottom">
                    <el-button type="danger" icon="el-icon-delete" size="mini" circle></el-button>
                  </el-tooltip>

                  <el-tooltip class="item" effect="dark" content="发布文章" placement="bottom">
                    <el-button v-if="article.status?.key===1" type="success" icon="el-icon-check" size="mini"
                               circle></el-button>
                  </el-tooltip>

                </div>

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
    return {}
  },
  props: ['article', 'opt']
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
