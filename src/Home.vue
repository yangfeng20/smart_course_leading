<template>
  <div style="background-color:rgba(255,255,255,0.5);">
    <div>
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          @select="selectMenu"
          active-text-color="#ffd04b">

        <el-menu-item index="script_list">
          <i class="el-icon-s-goods"></i>
          脚本列表
        </el-menu-item>

        <el-menu-item index="script_custom">
          <i class="el-icon-s-marketing"></i>
          脚本定制
        </el-menu-item>

        <el-menu-item index="about_author">
          <i class="el-icon-user"></i>
          关于作者
        </el-menu-item>
      </el-menu>
    </div>

    <div>
      <div class="home-show" v-if="!showLinkView" style="background-color:rgba(255,255,255,0.5);">
        <el-carousel :interval="2000" type="card" height="300px">
          <el-carousel-item v-for="item in carouselItems" :key="carouselItems.id">
            <img :src="item.src" alt="">
          </el-carousel-item>
        </el-carousel>
        <h2>可靠的脚本网站</h2>
      </div>

      <router-view v-if="showLinkView"></router-view>
    </div>


  </div>
</template>


<script>
export default {
  methods: {
    selectMenu(e) {
      if (this.$route.path === '/') {
        this.showLinkView = false
      } else {
        this.showLinkView = true
      }
      this.$router.push({path: "/" + e})
    }
  },
  watch: {
    $route() {
      if (this.$route.path === '/') {
        this.showLinkView = false
      } else {
        this.showLinkView = true
      }
    },
  },
  data() {
    return {
      // 显示管理的路由视图
      showLinkView: true,
      carouselItems: [
        {
          id: 2,
          src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
        },
        {
          id: 3,
          src: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
        },
        {
          id: 4,
          src: 'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'
        },
        {
          id: 5,
          src: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg'
        },
        {
          id: 6,
          src: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg'
        },
      ]
    }
  }

}
</script>

<style>

.home-show{
  /*height: 100px;*/
  background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  /*background-image: url("../images/bg_login.png");*/
  background-repeat: no-repeat;
  background-size: cover;
  /*height: 100%;*/
}

/* 菜单平铺*/
.el-menu-demo {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>