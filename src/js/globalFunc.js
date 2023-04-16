import Vue from "vue"
import ElementUI from "element-ui";
import axios from "@/axios";

// 定义全局可以使用的函数
export default {
    backup() {
        window.history.back();
    },
    getCookie(cookieName) {
        const cookies = document.cookie.split("; ")
        for (let i = 0; i < cookies.length; i++) {
            const [name, value] = cookies[i].split("=")
            if (name === cookieName) {
                return decodeURIComponent(value)
            }
        }
        return ""
    },
    isPermissionAction() {
        let token = this.getCookie("token");
        if (!token) {
            ElementUI.Message.error("禁止访问")
            return;
        }

        axios.post("/auth/query_permission", {
            token,
        }).then(resp => {
            this.isPermission = resp.data.data
        }).catch(_ => {
            this.isPermission = false
        })
    },
}

