<template>
  <div class="body">
    <el-container>
      <el-header style="height: 100%">

        <el-row>
          <el-col :span="24 / topList.length" v-for="topItem in topList" class="top-card">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ topItem.name }}</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
              </div>
              <div>
                {{ topItem.content }}
              </div>
            </el-card>
          </el-col>
        </el-row>

      </el-header>
      <el-container>
        <el-aside width="200px" class="type-aside">
          <div>
            <p>
              <el-button icon="el-icon-discover" type="text">综合</el-button>
            </p>
            <p>
              <el-button icon="el-icon-chat-round" type="text">闲聊</el-button>
            </p>
            <p>
              <el-button icon="el-icon-cpu" type="text">脚本</el-button>
            </p>
            <p>
              <el-button icon="el-icon-collection" type="text">教程</el-button>
            </p>
            <p>
              <el-button icon="el-icon-folder-checked" type="text">任务</el-button>
            </p>
            <p>
              <el-button icon="el-icon-date" type="text">系统公告</el-button>
            </p>
          </div>
        </el-aside>
        <el-container>

          <!--todo 底部到底，内部内容和侧边-->
          <el-main>
            <div class="content-div">
              <el-container>
                <el-header>
                  <div style="margin-top: 15px;">
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
                </el-header>
                <el-container>
                  <el-main>
                    <el-container v-for="article in articleList">
                      <el-main style="padding-top: 0px">
                        <el-descriptions :title="article.title" class="article-item" column="1" :colon="false">
                          <el-descriptions-item>{{ article.content }}</el-descriptions-item>
                          <el-descriptions-item>
                            <el-row :gutter="0" class="article-last-row">
                              <el-col :span="6">
                                <div class="grid-content bg-purple">
                                  <el-tag>{{ article.type }}</el-tag>
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
                                    <el-tag>{{ tag }}</el-tag>
                                  </el-col>
                                </el-row>
                              </el-col>

                            </el-row>

                          </el-descriptions-item>
                        </el-descriptions>
                      </el-main>

                      <el-aside width="200px" style="padding-top: 10px;">
                        <el-image
                            style="width: 100px; height: 100px"
                            :src="article.coverImgUrl"
                            fit="fit"></el-image>
                      </el-aside>

                    </el-container>
                  </el-main>
                  <el-aside width="200px">热文,广告</el-aside>
                </el-container>
              </el-container>
            </div>
          </el-main>

        </el-container>
      </el-container>
    </el-container>
  </div>

</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      userInput: "",
      articleType: 1,
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
  text-align: center;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.body {
  position: relative;
}

.top-card {
  padding: 10px 5px;
}

.article-item {
  background-color: aliceblue;
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

</style>