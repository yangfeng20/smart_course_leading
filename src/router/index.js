import Vue from 'vue'
import vueRouter from 'vue-router'

Vue.use(vueRouter)

export default new vueRouter({
    mode: 'history',
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
        {
            path: "/login",
            component: () => import("../components/Login")
        },
        {
            path: "/article",
            component: () => import("../components/Article")
        },
        {
            path: "/article/detail/*",
            component: () => import("../components/ArticleDetail")
        },
        {
            path: "/article/edit/*",
            component: () => import("../components/EditArticle")
        },
        {
            path: "/user/*",
            component: () => import("../components/ShowUser")
        },
        {
            path: "/me",
            component: () => import("../components/MeBackground"),
            children: [
                {
                    path: 'user', component: () => import("../components/UserInfo")
                },
                {
                    path: 'account', component: () => import("../components/AccountSet")
                },
                {
                    path: 'me_article', component: () => import("../components/MeArticle")
                },
                {
                    path: 'star_article', component: () => import("../components/StarArticle")
                },
                {
                    path: 'message_center', component: () => import("../components/MessageCenter")
                },
                {
                    path: 'message_center/*', component: () => import("../components/MessageCenter")
                },
                {
                    path: 'audit', component: () => import("../components/AuditCenter")
                },
                {
                    path: 'message_manager', component: () => import("../components/MessageManager")
                },
                {
                    path: 'task_manager', component: () => import("../components/TaskManager")
                },
            ]
        },
        {
            path: "/reset_pwd",
            component: () => import("../components/ResetPwd.vue")
        },
        {
            path: "/test",
            component: () => import("../components/Test")
        },
    ]
})