<template>
  <div class="app-container">
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchContent" placeholder="请输入账号或姓名查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
          <el-button type="success" @click="activeAddDialog">添加</el-button>
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="序号"
        width="180"
        v-if="false">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名字"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="300">
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="resetPassword(scope.row.id)">重置密码</el-button>
          <el-button type="danger" @click="deleteUser(scope.row.id)">删除用户</el-button>
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


    <el-dialog title="添加超级管理员" :visible.sync="dialogTableVisible" width="30%">
      <el-form>
        <el-form-item label="超管姓名" label-width="80px">
          <el-input class="add-user-input" v-model="addName" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="超管账号" label-width="80px">
          <el-input class="add-user-input" v-model="addUserName" auto-complete="off" size="small"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog()">取 消</el-button>
        <el-button type="primary" @click="addUser" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import {addUser, deleteUser, getAllSuperUser} from "@/api/user";

export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      searchContent: "",
      loading: false,
      dialogTableVisible: false,
      addName: '',
      addUserName: '',
      confirmLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      const data = {
        current: this.currentPage,
        size: 10,
        name: this.searchContent
      }
      getAllSuperUser(data).then(res => {
        this.tableData = res.data
        if (this.tableData.length === 0) {
          this.$message({
            message: '当前没有数据了哦',
            type: 'warning'
          })
        }
        this.loading = false
      })
    },
    deleteUser(id) {
      deleteUser(id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          })
        }
      })
    },
    addUser() {
      this.confirmLoading = true
      const data = {
        name: this.addName,
        username: this.addUserName
      }
      addUser(data).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      })
      this.confirmLoading = false
      this.dialogTableVisible = false;
      this.addUserName = ''
      this.addName = ''
    },
    resetPassword(id) {
      resetPassword(id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '重置密码成功',
            type: 'success'
          })
        }
      })
    },
    cancelDialog() {
      this.dialogTableVisible = false;
      this.addUserName = '';
      this.addName = '';
    },
    activeAddDialog() {
      this.dialogTableVisible = true;
    }
  }
}
</script>

<style scoped>
.add-user-input {
  width: 100%;
}
</style>
