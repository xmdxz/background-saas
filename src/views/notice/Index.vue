<template>
  <div class="app-container">

    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchContent" placeholder="请输入通知标题查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
          <el-button type="success" @click="dialogTableVisible = true">发布通知</el-button>
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
        prop="title"
        label="通知标题"
        width="400"
      >
      </el-table-column>
      <el-table-column
        prop="author"
        label="发布人"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="通知发布时间"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="getNotice(scope.row)" v-loading.fullscreen.lock="fullscreenLoading">
            查看通知
          </el-button>
          <el-button type="danger" @click="deleteCourse(scope.row.id)">删除通知</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="text-align: center;margin-top: 20px">

      <el-pagination
        background
        layout="prev, next"
        :total="1000"
        :current-page="currentPage"
        @current-change="fetchData"
        @next-click="currentPage++"
        @prev-click="currentPage--">
      </el-pagination>
    </div>


    <el-dialog title="发布通知" :visible.sync="dialogTableVisible" width="30%">
      <el-form>
        <el-form-item label="标题" label-width="120px">
          <el-input class="add-user-input" v-model="addNoticeParam.title" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="发布人" label-width="120px">
          <el-input class="add-user-input" v-model="addNoticeParam.author" autocomplete="off" size="small"></el-input>
        </el-form-item>

        <el-form-item label="通知详情" label-width="120px">
          <el-input type="textarea" v-model="addNoticeParam.content" rows="3"></el-input>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog()">取 消</el-button>
        <el-button type="primary" @click="addNotice" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addNotice, findNotice} from "@/api/notice";

export default {
  name: "Index",
  data() {
    return {
      tableData: [],
      searchContent: '',
      loading: false,
      dialogTableVisible: false,
      addNoticeParam: {
        id: null,
        title: '',
        author: '',
        content: '',
      },
      currentPage: 1,
      fullscreenLoading: false,
      confirmLoading: false,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      const data = {
        title: this.searchContent,
        current: this.currentPage,
        size: 10
      }
      findNotice(data).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
      this.loading = false
    },

    cancelDialog() {
    },
    addNotice() {
      this.confirmLoading = true
      addNotice(this.addNoticeParam).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '通知发布成功',
            type: 'success'
          })

        }
      })
      this.confirmLoading = false
      this.dialogTableVisible = false
    },
    getNotice(row) {
      this.$alert(row.content, '通知详情', {
        confirmButtonText: '确定'
      })
    },
    deleteNotice(id) {
      deleteNotice(id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
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
