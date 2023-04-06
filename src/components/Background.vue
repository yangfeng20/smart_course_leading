<template>
  <div class="bg_container">
    <Home></Home>
    <vue-particles
        color="#409EFF"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#409EFF"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push">
    </vue-particles>

  </div>
</template>

<script>
import Home from "@/Home";

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
.bg_container {
  background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  /*background-image: url("../images/bg_login.png");*/
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
}

</style>
