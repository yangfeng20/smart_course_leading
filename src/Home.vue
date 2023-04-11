<template>
  <div style="background-color:rgba(255,255,255,0.3);">
    <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

      <el-menu-item index="1">
        <i class="el-icon-s-goods"></i>
        <router-link to="/script_list">脚本列表</router-link>
      </el-menu-item>

      <el-menu-item index="2">
        <i class="el-icon-s-marketing"></i>
        <router-link to="script_custom">脚本定制</router-link>
      </el-menu-item>

      <el-menu-item index="3">
        <i class="el-icon-user"></i>
        <router-link to="about_author">关于作者</router-link>
      </el-menu-item>
    </el-menu>


    <el-carousel :interval="2000" type="card" height="300px" v-show="isShow">
      <el-carousel-item v-for="item in carouselItems" :key="carouselItems.id">
        <img :src="item.src" alt="">
      </el-carousel-item>
    </el-carousel>

    <router-view></router-view>

  </div>
</template>


<script>
export default {
  watch: {
    $route() {
      if (this.$route.path === '/') {
        this.isShow = true
      }
    },
  },
  data() {
    return {
      // 是否显示走马灯
      isShow: false,
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