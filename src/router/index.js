import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter)

export default new vueRouter({
    routes: [
        {
            path: "/",
            component: () => import("../components/Background")
        },
        {
            path: "/script_list",
            component: () => import("../components/ScriptList")
        },
        {
            path: "/script_custom",
            component: () => import("../components/ScriptCustom")
        },
        {
            path: "/about_author",
            component: () => import("../components/AboutAuthor")
        },
        {
            path: "/script_custom_detail",
            component: () => import("../components/ScriptCustomDetail")
        },
        {
            path: "/script_detail",
            component: () => import("../components/ScriptDetail")
        },
        {
            path: "/script_save",
            component: () => import("../components/ScriptSave")
        },
        {
            path: "/feedback",
            component: () => import("../components/Feedback")
        },
    ]
})