<template>
  <div class="bg_container">
    <div>
      <vue-particles
          class="particles"
          color="#409EFF"
          :particleOpacity="0.5"
          :particlesNumber="50"
          shapeType="circle"
          :particleSize="4"
          linesColor="#409EFF"
          :linesWidth="1"
          :lineLinked="true"
          :lineOpacity="0.8"
          :linesDistance="150"
          :moveSpeed="1"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"

      />
    </div>
    <!-- 使用 <slot> 定义插槽 -->
    <!--<slot></slot>-->
    <Home style=" z-index: 1;"></Home>
  </div>
</template>

<script>
import Home from "../Home";

export default {
  components: {Home},
  comments: [
    Home
  ],
  name: "Background",
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

.particles {
  position: fixed;
  width: 100%;
  height: 100%;
  /* todo 为0是，可以显示粒子效果，但是在详情页面粒子效果在最上层，导致按钮无法点击，文本无法选择；为-1时，不显示，相当于没有效果，考虑是否拉掉*/
  z-index: 0;
}

.bg_container {
  background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  background-repeat: no-repeat;
  background-size: cover;
  height: auto;
}

</style>
