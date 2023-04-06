import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter)

export default new vueRouter({
    routes: [
        {
            path: "/",
            component: () => import("@/components/Background")
        },
        {
            path: "/script_list",
            component: () => import("@/components/ScriptList")
        },
        {
            path: "/script_custom",
            component: () => import("@/components/ScriptCustom")
        },
        {
            path: "/about_author",
            component: () => import("@/components/AboutAuthor")
        },
    ]
})