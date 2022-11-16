<template>
  <div class="app-container">

    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchContent" placeholder="请输入发布人或内容查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>

        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%">
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
        prop="userInfo.username"
        label="发布人"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="images"
        label="图片"
        width="200">
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 100px"
            :src="scope.row.images | images"
            :fit="'fill'"
            :preview-src-list="scope.row.images | images"></el-image>
          <!--          {{ scope.row.images | images }}-->
        </template>
      </el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        width="250">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
        fixed="right">
        <template slot-scope="scope">
<!--          <el-button type="primary" @click="getVipUser(scope.row.id)" v-loading.fullscreen.lock="fullscreenLoading">-->
<!--            开通vip-->
<!--          </el-button>-->
          <el-button type="danger" @click="deleteDynamic(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: center;margin-top: 20px">

      <el-pagination
        background
        layout="prev, next"
        :total="total"
        :page-size="10"
        :current-page="currentPage"
        @current-change="fetchData"
        @next-click="currentPage++"
        @prev-click="currentPage--">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {deleteDynamic, getAll, getVipUserById, updateStudentById} from "@/api/dynamic";

export default {
  name: "Index",
  data() {
    return {
      total:0,
      tableData: [],
      searchContent: '',
      loading: false,
      dialogTableVisible: false,
      imageUrl: '',
      currentPage: 1,
      fullscreenLoading: false,
      confirmLoading: false,
      updateParam: {
        id: '',
        vipTime: null
      }
    }
  },
  filters: {
    filterSex(value) {
      return value === 1 ? '男' : '女'
    },
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      const data = {
        keywords: this.searchContent,
        current: this.currentPage,
        size: 10
      }
      getAll(data).then(res => {
          this.tableData = res.records
          this.total = res.total
      })
      this.loading = false
    },

    cancelDialog() {
      this.updateParam.id = null
      this.updateParam.vipTime = null
    },
    deleteDynamic(id) {
      deleteDynamic(id).then(res => {
        if (res) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
        this.fetchData()
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
