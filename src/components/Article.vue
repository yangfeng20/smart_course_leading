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
            <p style="background-color: #ecf5ff">
              <el-button icon="el-icon-discover" type="text" @click="selectArticleType(1)">综合</el-button>
            </p>
            <p>
              <el-button icon="el-icon-chat-round" type="text" @click="selectArticleType(2)">闲聊</el-button>
            </p>
            <p>
              <el-button icon="el-icon-cpu" type="text" @click="selectArticleType(3)">脚本</el-button>
            </p>
            <p>
              <el-button icon="el-icon-collection" type="text" @click="selectArticleType(4)">教程</el-button>
            </p>
            <p>
              <el-button icon="el-icon-folder-checked" type="text" @click="selectArticleType(5)">任务</el-button>
            </p>
            <p>
              <el-button icon="el-icon-date" type="text" @click="selectArticleType(6)">系统公告</el-button>
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
                      <el-input placeholder="请输入内容" v-model="userInput" class="input-with-select" clearable>
                        <el-select v-model="articleType" slot="prepend" placeholder="请选择">
                          <i class="el-icon-discover">
                            <el-option label="综合" value="1"></el-option>
                          </i>
                          <el-option label="闲聊" value="2"></el-option>
                          <el-option label="脚本" value="3"></el-option>
                          <el-option label="教程" value="4"></el-option>
                          <el-option label="任务" value="5"></el-option>
                          <el-option label="系统公告" value="6"></el-option>
                        </el-select>
                        <el-button type="primary" slot="append" icon="el-icon-search"></el-button>
                      </el-input>
                    </div>
                    <div style="margin-top: 5px;margin-left: 5px">
                      <el-button @click="newArticle(null)" type="primary" icon="el-icon-edit">写文章</el-button>
                    </div>
                  </div>
                </el-header>
                <el-container>
                  <el-main style="padding-top: 0;min-height: 610px;text-align: center;">
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
                                    <el-tag effect="dark">{{ article.type }}</el-tag>
                                    | {{ article.author }}
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
                                      <el-tag ref="articleTag"
                                              @mouseenter.native="articleTagMouseEntry"
                                              @mouseout.native="articleTagMouseOut"
                                              @click.stop=""
                                              effect="plain">{{ tag }}
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
        if (i + 1 === type) {
          btnGroup.childNodes[i].style.backgroundColor = '#ecf5ff'
        } else {
          btnGroup.childNodes[i].style.removeProperty('background-color');
        }
      }

    },

    articleTagMouseEntry(event) {
      event.target.style.backgroundColor = '#ecf5ff';
    },
    articleTagMouseOut(event) {
      event.target.style.removeProperty('background-color');
    }
  },
  data() {
    return {
      userInput: "",
      articleType: 1,
      selectedArticleType: 1,
      articleList: [
        {
          id: 1,
          title: "测试文章标题",
          content: "测试文章内容-ABDCDDIOWFJEIOJO",
          author: "作者",
          readingQuantity: 120,
          starQuantity: 4,
          type: "任务",
          coverImgUrl: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          tagList: ["大数据", "python", "java", "java", "javaaaaaaa", "javavvvv"]
        },
        {
          id: 2,
          title: "关于管理办法",
          content: "这是我的管理aaaaaaaaaa-ABDCDDIOWFJEIOJO",
          author: "小松鼠哈哈哈哈",
          readingQuantity: 34534899,
          starQuantity: 394,
          type: "系统公告",
          coverImgUrl: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          tagList: ["大数据", "python", "java", "java", "javaaaaaaa", "javavvvv"]
        },
        {
          id: 2,
          title: "关于管理办法",
          content: "这是我的管理aaaaaaaaaa-ABDCDDIOWFJEIOJO",
          author: "小松鼠哈哈哈哈",
          readingQuantity: 34534899,
          starQuantity: 394,
          type: "系统公告",
          coverImgUrl: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
          tagList: ["大数据", "python", "java", "java", "javaaaaaaa", "javavvvv"]
        },
      ],
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
  created() {
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

</style>