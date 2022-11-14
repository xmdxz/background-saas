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
        prop="username"
        label="姓名"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="账号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="300">
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
<!--          <el-button type="primary" @click="resetPassword(scope.row.id)">重置密码</el-button>-->
          <el-button type="danger" @click="deleteUser(scope.row.id)">删除用户</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align: center;margin-top: 20px">

      <el-pagination
        background
        layout="prev, next"
        :total="total"
        :current-page="currentPage"
        @current-change="fetchData"
        @next-click="currentPage++"
        @prev-click="currentPage--">
      </el-pagination>
    </div>


    <el-dialog title="添加用户" :visible.sync="dialogTableVisible" width="30%">
      <el-form>
        <el-form-item label="用户昵称" label-width="80px">
          <el-input class="add-user-input" v-model="addUsername" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户手机号" label-width="80px">
          <el-input class="add-user-input" v-model="addPhone" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" label-width="80px">
          <el-input class="add-user-input" v-model="addUserPassword" auto-complete="off" size="small"></el-input>
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

import {addUser, deleteUser, getPageUser} from "@/api/user";

export default {
  name: 'Index',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total:0,
      searchContent: "",
      loading: false,
      dialogTableVisible: false,
      addUsername: '',
      addPhone: '',
      addUserPassword:"",
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
        size: 5,
        keywords: this.searchContent
      }
      getPageUser(data).then(res => {
        this.tableData = res.records
        this.total = res.total
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
          this.$message({
            message: '删除成功',
            type: 'success'
          })
      })
      this.fetchData()
    },
    addUser() {
      this.confirmLoading = true
      const data = {
        username: this.addUsername,
        phone: this.addPhone,
        password:this.addUserPassword
      }
      addUser(data).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.fetchData()
      })
      this.confirmLoading = false
      this.dialogTableVisible = false;
      this.addPhone = ''
      this.addUsername = ''
      this.addUserPassword = ''
    },
    cancelDialog() {
      this.dialogTableVisible = false;
      this.addPhone = '';
      this.addUsername = '';
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
