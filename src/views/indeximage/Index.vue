<template>
  <div class="app-container">

    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="success" @click="dialogTableVisible = true" size="small">添加轮播图</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 80%"
      size="small">
      <el-table-column
        type="index"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="id"
        label="序号"
        width="50"
        v-if="false">
      </el-table-column>

      <el-table-column
        label="轮播图封面"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.swiperImg | images"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="showName"
        label="演出名称"
      >
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          {{ scope.row.status| filterStatus }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
        fixed="right">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="stopSwiper(scope.row)">
            {{ scope.row.status | filterBtn }}
          </el-button>
          <el-button size="small" type="danger" @click="deleteSwiper(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <el-dialog title="新增轮播图" :visible.sync="dialogTableVisible" width="30%" @close="clearInfo">
      <el-form>
        <el-form-item label="选择演出" label-width="80px">
          <el-select v-model="addParam.showId" placeholder="请选择演出">
            <el-option
              v-for="item in showList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面上传" label-width="80px">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:10086/upload"
            :on-success="handleAvatarSuccess"
            :limit=1
          >
            <img v-if="addParam.swiperImg" :src="addParam.swiperImg | images" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
        <el-form-item label="启用" label-width="80px">
          <el-select v-model="addParam.status" placeholder="是否启用">
            <el-option
              label="启用"
              value="1">
            </el-option>
            <el-option
              label="停用"
              value="0">
            </el-option>
          </el-select>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog()">取 消</el-button>
        <el-button type="primary" @click="addSwiper" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {addSwiper, deleteSwiper, getSwiperList, updateStatus} from "@/api/swiper";
import {getShowList} from "@/api/show";

export default {
  data() {
    return {
      tableData: [],
      loading: false,
      dialogTableVisible: false,
      showList: [],
      start: 1,
      stop: 0,
      addParam: {
        swiperImg: '',
        showId: '',
        status: null
      },
      confirmLoading: false
    };
  },
  watch: {},
  filters: {
    filterStatus(val) {
      return val === 1 ? '启用' : '停用'
    },
    filterBtn(val) {
      return val === 1 ? '停用' : '启用'
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getSwiperList().then(res => {
        this.tableData = res
      })
      const data = {
        current: 1,
        size: 500
      }
      getShowList(data).then(res => {
        this.showList = res.records
        this.loading = false
      })

    },
    addSwiper() {
      this.confirmLoading = true
      addSwiper(this.addParam).then(res => {
        this.$message.success('发布成功')
        this.confirmLoading = false
      })
    },
    handleAvatarSuccess(res, file, fileList) {
      if (res.code === 20000) {
        this.addParam.swiperImg = res.data
        this.$message({
          message: '文件上传成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      }
    },
    deleteSwiper(id) {
      deleteSwiper(id).then(res => {
        this.$message.success('删除成功')
      })
    },
    stopSwiper(row) {
      const data = {
        id: row.id,
        status: row.status === 1 ? 0 : 1
      }
      updateStatus(data).then(res => {
        this.$message.success('更新成功')
      })
    }

  }
}
</script>

<style scoped>
.add-user-input {
  width: 70%;
}

.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 50px;
  height: 50px;
}

.avatar-uploader :hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 50px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
</style>
