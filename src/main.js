import Vue from 'vue'
import Background from "@/components/Background";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'
import router from './router'
import axios from "@/axios";

Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.prototype.$axios = axios;
axios.baseUrl = 'localhost:8080/'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(Background),
}).$mount('#home')
