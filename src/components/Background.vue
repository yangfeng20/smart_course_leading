<template>
  <div class="bg_container">
    <div>
      <vue-particles
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

    <Home></Home>
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
.bg_container {
  background-image: linear-gradient(-180deg, #1a1454 0%, #0e81a5 100%);
  background-repeat: no-repeat;
  background-size: cover;
  height: 800px;
}

</style>
