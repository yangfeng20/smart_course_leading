export class ExpiredStorage {
    constructor() {
        this.storageName = 'expiredStorage';
    }

    /**
     *  设置缓存
     *  @param {string} name 缓存名称
     *  @param {any} value 缓存的值
     *  @param {any} expires 缓存过期时间(秒) [没有默认10秒]
     **/
    set(name, value, expires) {
        const storages = JSON.parse(localStorage.getItem(this.storageName)) || {};
        storages[name] = {
            value,
            expires: expires === undefined ? +new Date() + 10 * 1000 : expires * 1000 + +new Date(),
        };
        localStorage.setItem(this.storageName, JSON.stringify(storages));
    }

    // 获取缓存
    get(name) {
        const storages = JSON.parse(localStorage.getItem(this.storageName));
        if (!storages || !storages[name]) {
            return null;
        }

        if (+new Date() > storages[name].expires) {
            this.remove(name);
            return null;
        }
        return storages[name].value;
    }

    // 移除缓存
    remove(name) {
        const storages = JSON.parse(localStorage.getItem(this.storageName));
        if (storages && storages[name]) {
            delete storages[name];
            if (Object.keys(storages).length === 0) {
                this.clear();
            } else {
                localStorage.setItem(this.storageName, JSON.stringify(storages));
            }
        }
    }

    // 清空缓存
    clear() {
        localStorage.removeItem(this.storageName);
    }
}
