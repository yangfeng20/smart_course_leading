import axios from "axios";
import ElementUI from 'element-ui'
import router from "vue-router";


/**
 * 创建自定义的axios对象，实现请求拦截器和响应拦截器
 *
 */
const request = axios.create({
    // 超时时间
    timeout: 5000,
    // 格式为json数据；字符编码utf-8
    headers: {
        'Cont-Type': 'application/json; charset=utf-8',
    }
})


/**
 * 全局的url 【指定了全局url之后, mock的模拟请求前面也需要这个前缀】
 * @type {string}
 */
request.defaults.baseURL = 'http://localhost:8090/'

/**
 * 请求拦截器
 */
request.interceptors.request.use(req => {
        let token = localStorage.getItem('token');
        // 请求时携带token
        if (token) {
            req.headers['Authorization'] = token;
        }
        return req;
    }
)

/**
 * 响应拦截器
 */
request.interceptors.response.use(resp => {
        // http的响应状态码会进入这里
        let result = resp.data;
        if (result.code === 200) {
            return resp;
        }

        // 代码执行下来，说明code不为200，或者result有问题【使用弹窗提示,可能为空白】
        ElementUI.Message.error(result.message ? result.message : '系统异常');
        // 使请求不进入正常的响应处理函数
        return Promise.reject(result.message)
    },

    /**
     * 当
     * http的状态码不为200时
     * @param error
     */
    error => {

        // 获取后端返回的错误信息
        if (error.response.data) {
            error.message = error.response.data.message;
        }

        if (error.response.status === 401) {
            // 无权限，路由致登录页
            router.push('/login');
        }

        if (error.response.status === 404) {
            error.message = "资源未找到";
        }

        // 弹窗提示，3秒
        ElementUI.Message.error(error.message, {duration: 3000})

        // 使请求不进入正常的响应处理函数
        return Promise.reject(error)
    })

/**
 * 暴露自定义的axios
 */
export default request;
