import axios from "../axios";

// 定义全局可以使用的函数
const exportFunc =  {

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

    async isPermissionAction() {
        new Promise((resolve, reject) => {
            let token = this.getCookie("token");
            if (!token) {
                return reject(false);
            }

            // todo 权限校验，加密解密，最好不需要重新调用外部接口
            axios.post("/auth/query_permission", {
                token,
                pageUrl: location.pathname
            }).then(resp => {
                resp.data.data
                this.isPermission = resp.data.data
                resolve(resp.data.data)
            })
        })
    },

    async imgAddVue(pos, $file, vue) {
        console.debug("上传文件大小", $file.size / 1024, 'KB', $file)

        // 压缩图片
        let compressFile = await exportFunc.compressImg($file)
        console.debug("压缩文件大小", compressFile.size / 1024, 'KB', compressFile)
        exportFunc.uploadFile(compressFile).then(url => {
            console.debug("上线文件返回url", url)
            vue.$refs.md.$img2Url(pos, url);
        })
    },

    async uploadFile($file) {
        return new Promise((resolve, reject) => {
            // 第一步.将图片上传到服务器.
            let formData = new FormData();
            formData.append('file', $file);
            axios({
                url: '/file/upload',
                method: 'post',
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'},
            }).then((data) => {
                return resolve(data.data.data)
            }).catch(e => {
                reject(e)
            })
        })
    },

    /**
     * @压缩公共方法
     * @params file
     * @return 压缩后的文件，支持两种，file和 blob
     */
    async compressImg(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            // readAsDataURL 方法会读取指定的 Blob 或 File 对象。读取操作完成的时候，readyState 会变成已完成DONE，并触发 loadend (en-US) 事件，
            // 同时 result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容。
            reader.readAsDataURL(file);
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result;
                img.onload = () => {
                    // 图片的宽高
                    const w = img.width;
                    const h = img.height;
                    const canvas = document.createElement("canvas");
                    // canvas对图片进行裁剪，这里设置为图片的原始尺寸
                    canvas.width = w;
                    canvas.height = h;
                    const ctx = canvas.getContext("2d");
                    // canvas中，png转jpg会变黑底，所以先给canvas铺一张白底
                    ctx.fillStyle = "#fff";
                    // fillRect()方法绘制一个填充了内容的矩形，这个矩形的开始点（左上点）在
                    // (x, y) ，它的宽度和高度分别由width 和 height 确定，填充样式由当前的fillStyle 决定。
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    // 绘制图像
                    ctx.drawImage(img, 0, 0, w, h);

                    // canvas转图片达到图片压缩效果
                    // 返回一个包含图片展示的 data URI base64 在指定图片格式为 image/jpeg 或 image/webp的情况下，
                    // 可以从 0 到 1 的区间内选择图片的质量。如果超出取值范围，将会使用默认值 0.92。其他参数会被忽略。
                    const base64Data = canvas.toDataURL("image/jpeg", 0.8);
                    const compressedFile = exportFunc.dataURLtoFile(base64Data, file.name);
                    resolve(compressedFile);
                };
                img.onerror = reject;
            };
            reader.onerror = reject;
        })

    },


    /**
     * canvas生成的格式为base64，需要进行转化, base64->file
     * @param base64Data
     * @param fileName
     * @returns {File}
     */
    dataURLtoFile(base64Data, fileName) {
        let arr = base64Data.split(','),
            mime = arr[0].match(/:(.*?);/)[1],

            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, {type: mime})
    },

    /**
     * canvas生成的格式为base64，需要进行转化, base64->blob
     * @param base64Data
     * @returns {Blob}
     */
    dataURLtoBlob(base64Data) {
        const arr = base64Data.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    },
}

export default exportFunc