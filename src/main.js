import Vue from 'vue'
import Background from "./components/Background";
import Home from "./Home";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueParticles from 'vue-particles'
import router from './router'
import axios from "./axios";
import VueQuillEditor from 'vue-quill-editor'
import globalFunc from './js/globalFunc'

// 富文本 样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { 默认全局 } */)
Vue.prototype.$func = globalFunc

Vue.use(ElementUI)
Vue.use(VueParticles)
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(Background, [h(Home)]),
}).$mount('#home')
