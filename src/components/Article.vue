<template>
  <div class="body">
    <el-container>
      <el-header style="height: 100%">

        <el-row>
          <el-col :span="24 / topList.length" v-for="topItem in topList" class="top-card">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ topItem.name }}</span>
              </div>
              <div>
                {{ topItem.content }}
              </div>
            </el-card>
          </el-col>
        </el-row>

      </el-header>
      <el-container>
        <el-aside width="150px" class="type-aside">
          <div ref="articleTypeBtnGroup">
            <p v-for="(type,index) in typeList" :style="index===0 ? 'background-color: #ecf5ff':''">
              <el-button icon="el-icon-discover" type="text" @click="selectArticleType(type.key)">{{ type.desc }}
              </el-button>
            </p>
          </div>
        </el-aside>
        <el-container>

          <el-main style="padding: 0">
            <div class="content-div">
              <el-container>
                <el-header>
                  <div style="display: flex">
                    <div style="margin-top: 5px;width: 78%">
                      <el-input placeholder="请输入内容" v-model="userInput" class="input-with-select"
                                @keydown.native.enter="searchArticle" clearable>
                        <el-button type="primary" plain slot="append" icon="el-icon-search"
                                   @click="searchArticle"></el-button>
                      </el-input>
                    </div>
                    <div style="margin-top: 5px;margin-left: 5px">
                      <el-button @click="newArticle(null)" type="primary" icon="el-icon-edit">写文章</el-button>
                    </div>
                  </div>
                </el-header>
                <el-container>
                  <el-main
                      v-loading="listLoading"
                      element-loading-text="帖子加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, 0.3)"
                      style="padding-top: 0;min-height: 610px;text-align: center;">
                    <el-empty v-show="articleList.length<=0"></el-empty>
                    <!--文章内容+图片-->
                    <el-container v-for="article in articleList" class="articleList-div">
                      <!--文章主体内容-->
                      <el-main class="article-item-parent">
                        <div @click="clickArticle(article)">
                          <el-descriptions class="article-item" :column="1" :colon="false">
                            <el-descriptions-item><span class="article-title">{{ article.title }}</span>
                            </el-descriptions-item>
                            <el-descriptions-item>{{ article.content }}</el-descriptions-item>
                            <el-descriptions-item>
                              <el-row :gutter="0" class="article-last-row">
                                <el-col :span="6">
                                  <div class="grid-content bg-purple">
                                    <el-tag effect="dark">{{ article.type.desc }}</el-tag>
                                    | {{ article.author.desc.name }}
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
                                              @mouseenter.native="articleTagMouseEntry"
                                              @mouseout.native="articleTagMouseOut"
                                              @click.stop=""
                                              effect="plain">{{ tag.name }}
                                      </el-tag>
                                    </el-col>
                                  </el-row>
                                </el-col>

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
                    <el-pagination style="position: absolute;bottom: 0;display: inline;"
                                   background
                                   :total="articlePage.total"
                                   :current-page.sync="articlePage.page"
                                   layout="total, prev, pager, next">
                    </el-pagination>
                  </el-main>
                  <el-aside>
                    <HotArticleList></HotArticleList>
                    <Sponsor></Sponsor>
                    <SiteManager></SiteManager>
                  </el-aside>
                </el-container>
              </el-container>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <!--回到顶部-->
    <el-backtop :bottom="100"></el-backtop>
  </div>

</template>

<script>
import HotArticleList from "../components/HotArticleList";
import Sponsor from "../components/Sponsor";
import SiteManager from "../components/SiteManager";

export default {
  components: {
    HotArticleList,
    Sponsor,
    SiteManager
  },
  name: "Article",
  methods: {
    newArticle(articleId) {
      if (articleId) {
        this.$router.push('article/edit/' + articleId)
      } else {
        this.$router.push('article/edit/')
      }
    },
    clickArticle(article) {
      this.$router.push('article/detail/' + article.id)
    },
    selectArticleType(type) {
      let btnGroup = this.$refs.articleTypeBtnGroup;
      for (let i = 0; i < btnGroup.childNodes.length; i++) {
        if (i === type) {
          btnGroup.childNodes[i].style.backgroundColor = '#ecf5ff'
        } else {
          btnGroup.childNodes[i].style.removeProperty('background-color');
        }
      }
      this.selectedArticleType = type
      this.searchArticle()
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
    searchArticle() {
      this.listLoading = true
      this.$axios.post("/article/search",
          {
            ...this.articlePage,
            title: this.userInput,
            type: this.selectedArticleType
          })
          .then(resp => {
            this.articleList = resp.data.data.content;
            this.articlePage.page = resp.data.data.page
            this.articlePage.size = resp.data.data.size
            this.articlePage.total = resp.data.data.total
          }).catch(_ => {
      }).finally(() => {
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      })
    },
  },
  data() {
    return {
      listLoading: false,
      userInput: null,
      selectedArticleType: null,
      articlePage: {
        page: 1,
        size: 9,
        total: 100,
      },
      typeList: [],
      articleList: [],
      topList: [
        {
          "id": 1,
          "name": "顶部卡片1",
          "content": "测试文本"
        },
        {
          "id": 2,
          "name": "顶部卡片2",
          "content": "Hello World"
        },
        {
          "id": 2,
          "name": "顶部卡片2",
          "content": "Hello World"
        },
        {
          "id": 2,
          "name": "顶部卡片2",
          "content": "Hello World"
        },
      ],
      hotList: [
        {id: 1, title: "发布会招呼"},
        {id: 1, title: "关于我的世界来着"},
        {id: 1, title: "python的代码任何写"},
        {id: 1, title: "哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈"},
        {id: 1, title: "java的代码任何写"},
        {id: 1, title: "java的代码任何写"},
        {id: 1, title: "java的代码任何写"},
        {id: 1, title: "java的代码任何写"},
        {id: 1, title: "java的代码任何写"},
      ]
    }
  },
  watch: {
    'articlePage.page': {
      handler: function () {
        this.searchArticle()
      }
    },
  },
  created() {
    this.searchArticle()

    this.$axios.post("/article/get_all_type").then(resp => {
      this.typeList = resp.data.data
      this.typeList.unshift({key: 0, desc: "综合"})
    }).catch(_ => {
    })
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  /*background-color: #B3C0D1;*/
  color: #333;
  text-align: center;
  padding: 0px 5px;
}

.el-aside.type-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 35%;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  padding: 8px;
}

body > .el-container {
  margin-bottom: 40px;
}

.body {
  position: relative;
}

.top-card {
  padding: 5px 3px;
  text-align: left;
}

.article-icon {
  position: relative;
  top: 6px;
}

.article-last-row {
  width: 100%;
}

.article-tag-div {
  float: right;
}

.article-title {
  font-weight: 600;
  margin-top: 10px;
  font-size: 15px;
  color: #252933;
}


/*顶部卡片内边距*/
.box-card > :first-child,
.box-card > :nth-child(2) {
  padding: 5px;
}

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
  cursor: pointer;
  background: #eff0f1;
}

.article-hit-dev {
  background-color: #ffffff;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: left;
}

.el-select {
  width: 130px;
}

</style>