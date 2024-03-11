<template>
  <div>
    <div v-if="componentLoaded">
      <DynamicComponent />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      componentLoaded: false
    };
  },
  async created() {
    try {
      // const response = await fetch('your_api_endpoint');
      // // const componentData = await response.json();
      //
      // const resp = await this.$axios.post("/data/test", {})
      // let componentData = resp.data.data

      let componentData = {
        template: "    <div>\n" +
            "      <div class=\"home-show\" v-if=\"!showLinkView\" style=\"background-color:rgba(255,255,255,0.5);\">\n" +
            "        <el-carousel :interval=\"2000\" type=\"card\" height=\"200px\">\n" +
            "          <el-carousel-item><img :src=\"require('./assets/image/home/1.jpg')\" alt=\"\" width=\"100%\"></el-carousel-item>\n" +
            "          <el-carousel-item><img :src=\"require('./assets/image/home/2.jpg')\" alt=\"\" width=\"100%\"></el-carousel-item>\n" +
            "          <el-carousel-item><img :src=\"require('./assets/image/home/3.png')\" alt=\"\" width=\"104%\"></el-carousel-item>\n" +
            "          <el-carousel-item>\n" +
            "            <el-button>测试</el-button>\n" +
            "          </el-carousel-item>\n" +
            "          <el-carousel-item>\n" +
            "            <div>哈哈哈</div>\n" +
            "          </el-carousel-item>\n" +
            "        </el-carousel>\n" +
            "      </div>",
        data
      }

      this.createDynamicComponent(componentData);
    } catch (error) {
      console.error('Failed to load dynamic component:', error);
    }
  },
  methods: {
    createDynamicComponent(componentData) {
      const { template, data, styles } = componentData;

      const DynamicComponent = Vue.component('DynamicComponent', {
        template: template,
        data() {
          return new Function(data)();
        }
      });

      const styleElement = document.createElement('style');
      styleElement.textContent = styles;
      document.head.appendChild(styleElement);

      Vue.component('DynamicComponent', DynamicComponent);
      this.componentLoaded = true;
    }
  }
};
</script>
