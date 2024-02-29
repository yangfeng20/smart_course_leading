<template>
  <div class="block-list">

    <div class="search-bar" style="margin-top: 10px; display: flex;margin-left: 10px;">
      <el-input style="width: 40%"
                ref="searchInput"
                placeholder="搜索脚本"
                v-model="searchInput"
                clearable
                @keydown.enter.native="searchScript">
      </el-input>
      <el-select v-model="status" placeholder="脚本状态" v-show="isPermission" :clearable="true">
        <el-option
            v-for="status in statusList"
            :label="status.desc"
            :value="status.key">
        </el-option>

      </el-select>
      <div style="z-index: 3">
        <el-button type="primary" icon="el-icon-search" :loading="listLoading" @click="searchScript"
                   style="margin-left: 10px">搜索
        </el-button>
        <el-button type="primary" icon="el-icon-edit" @click="saveScript($event)" v-show="isPermission">新增脚本</el-button>
      </div>
    </div>

    <div class="data-page">
      <div class="data-list-div">
        <el-row :gutter="1">
          <el-col v-for="(script, index) in scriptList" :key="index" :span="8">
            <transition :name="getTransitionName(index)">
              <div v-show="listShowRender" class="data-info">
                <el-button v-show="isPermission" icon="el-icon-edit" size="small" round type="primary" plain
                           @click="saveScript($event, script.id)">编辑
                </el-button>
                <span v-show="!isPermission" style="margin-right: 20%"></span>
                <span style="margin-right: 60%"></span>
                <el-tag :type="getStatus(script.scriptStatus?.key)" effect="dark">{{ script.scriptStatus?.desc }}
                </el-tag>

                <div class="script-info-inner"><i class="el-icon-menu"></i>脚本名称：
                  <span><el-tag>
                  <el-link type="primary" @click="inDetail($event, script.id)" :underline="false">{{
                      script.scriptName
                    }}
                  </el-link>
                </el-tag></span>
                </div>
                <!--<div class="script-info-inner"><i class="el-icon-date"></i>脚本简介：{{ script.scriptDesc }}</div>-->
                <div class="script-info-inner"><i class="el-icon-date"></i>脚本简介：
                  <el-input
                      :value="script.scriptDesc"
                      :autosize="{ minRows: 2, maxRows: 3}"
                      style="width: 90%"
                      :disabled="true"
                  >
                  </el-input>
                </div>
                <div class="script-info-inner"><i class="el-icon-s-data"></i>下载量：<i class="el-icon-star-on"
                                                                                    :style="{color: getColor(script.downloadCount)}"></i>{{
                    script.downloadCount
                  }}
                </div>
              </div>
            </transition>
          </el-col>
        </el-row>
        <!--空白占位；用于展示分页组件-->
        <el-row>
          <div style="height: 40px"></div>
        </el-row>
      </div>
      <div class="pagination-wrapper">
        <el-pagination v-show="listShowRender"
                       :current-page.sync="scriptPage.page"
                       :page-size.sync="scriptPage.size"
                       :page-sizes="[9,18,27,36,45]"
                       :total="scriptPage.total"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>

        <el-empty v-show="isShowEmptyList && listShowRender" description="没有满足条件的脚本"></el-empty>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      statusList: [
        {
          key: 2,
          desc: "已上架"
        },
        {
          key: 1,
          desc: "未上架"
        },
      ],
      listShowRender: true,
      listLoading: false,
      searchInput: "",
      status: 2,
      scriptList: [],
      scriptPage: {
        page: 1,
        size: 9,
        total: 0,
      },
      isPermission: false,
    }
  },
  methods: {
    getTransitionName(index) {
      let toTopArr = [0, 1, 2, 5]
      let centerArr = [4]
      let toBottomArr = [3, 6, 7, 8]
      if (toTopArr.includes(index)) {
        return "el-zoom-in-bottom";
      } else if (toBottomArr.includes(index)) {
        return "el-zoom-in-top";
      } else if (centerArr.includes(index)) {
        return "el-zoom-in-center";
      }
      return "el-zoom-in-center";
    },
    getStatus(status) {
      if (status === 2) {
        return 'success';
      } else if (status === 1) {
        return 'info'
      }
    },
    getColor(downloadCount) {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    saveScript(e, id) {
      this.$router.push({path: "/script_save", query: {id}})
    },
    inDetail(e, id) {
      this.$router.push({path: "/script_detail", query: {id}})
    },
    searchScript() {
      this.listLoading = true
      this.listShowRender = false
      this.$axios.post("/script_info/search",
          {
            scriptStatus: this.status,
            scriptName: this.searchInput.trim(),
            ...this.scriptPage
          }
      ).then(resp => {
        let result = resp.data.data;
        this.scriptList = result.content;
        if (result.total) {
          this.scriptPage.total = result.total;
          this.scriptPage.page = result.page;
          this.scriptPage.size = result.size;
        }
      }).catch(error => {
      }).finally(() => {
        setTimeout(() => {
          this.listLoading = false
          this.listShowRender = true
        }, 200)
      })
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
  },

  created() {
    this.searchScript()
    this.$func.isPermissionAction().then(data => {
      this.isPermission = data
    });
  },

  watch: {
    'scriptPage.page': {
      handler: function () {
        // 发送请求获取当前页的数据
        this.searchScript();
      }
    },
    'scriptPage.size': {
      handler: function () {
        // 发送请求获取当前页的数据
        this.searchScript();
      }
    }
  },
  computed: {
    isShowEmptyList() {
      return !this.scriptList.length;
    },
  }
}
</script>

<style scoped>

.data-info {
  height: 150px;
  margin: 10px;
  padding-top: 10px;
  padding-left: 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.data-page {
  position: static;
}

.el-pagination {
  position: absolute;
  bottom: 0;
  right: 0;
}
</style>
