<template>
  <div class="app-container">
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchContent" placeholder="请输入优惠券名字查询"></el-input>
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
        label="兑换码"
        width="180"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="amount"
        label="优惠券金额"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="startTimeStr"
        label="有效期开始"
        width="200">
      </el-table-column>
      <el-table-column
        prop="endTimeStr"
        label="有效期结束"
        width="200">
      </el-table-column>
      <el-table-column
        prop="mark"
        label="描述信息"
        width="200">
      </el-table-column>
      <el-table-column
        prop="userInfo.username"
        label="绑定用户"
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
<!--          <el-button type="primary" @click="resetPassword(scope.row.id)">重置密码</el-button>-->
          <el-button type="danger" @click="deleteCoupon(scope.row.id)">删除</el-button>
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


    <el-dialog title="添加优惠券" :visible.sync="dialogTableVisible" width="30%">
      <el-form>
        <el-form-item label="优惠券名称" label-width="80px">
          <el-input class="add-user-input" v-model="addName" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="优惠券金额" label-width="80px">
          <el-input class="add-user-input" v-model="addAmount" auto-complete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="优惠券有效期开始" label-width="80px">
          <el-date-picker
            v-model="addStartTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="add-user-input"
            placeholder="选择优惠券开始时间">
          </el-date-picker>
<!--          <el-input class="add-user-input" v-model="addStartTime" auto-complete="off" size="small"></el-input>-->
        </el-form-item>
        <el-form-item label="优惠券有效期结束" label-width="80px">
          <el-date-picker
            v-model="addEndTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            class="add-user-input"
            placeholder="选择优惠券结束时间">
          </el-date-picker>
<!--          <el-input class="add-user-input" v-model="addEndTime" auto-complete="off" size="small"></el-input>-->
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

import {addCoupon, deleteCoupon, pageCoupon} from "@/api/user";

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
      addName: '',
      addAmount: '',
      addStartTime:"",
      addEndTime:"",
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
        page:{
          current: this.currentPage,
          size: 10
        },
        name: this.searchContent
      }
      pageCoupon(data).then(res => {
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
    deleteCoupon(id) {
      deleteCoupon(id).then(res => {
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
        name: this.addName,
        amount: this.addAmount,
        startTime:this.addStartTime,
        endTime:this.addEndTime
      }
      addCoupon(data).then(res => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.fetchData()
      })
      this.confirmLoading = false
      this.dialogTableVisible = false;
      this.addName = ''
      this.addAmount = ''
      this.addStartTime = ''
      this.addEndTime = ''
    },
    cancelDialog() {
      this.dialogTableVisible = false;
      this.addName = ''
      this.addAmount = ''
      this.addStartTime = ''
      this.addEndTime = ''
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
