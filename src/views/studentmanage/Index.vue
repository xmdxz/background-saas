<template>
  <div class="app-container">

    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchContent" placeholder="请输入姓名或手机号查询"></el-input>
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
        prop="name"
        label="姓名"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
        width="50">
        <template slot-scope="scope">
          {{ scope.row.sex|filterSex }}
        </template>
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="50">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="hight"
        label="身高(cm)"
        width="100">
      </el-table-column>
      <el-table-column
        prop="weight"
        label="体重(kg)"
        width="100">
      </el-table-column>
      <el-table-column
        prop="vipTime"
        label="vip到期时间"
        width="200">
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
          <el-button type="primary" @click="getVipUser(scope.row.id)" v-loading.fullscreen.lock="fullscreenLoading">
            开通vip
          </el-button>
          <el-button type="danger" @click="deleteTeacher(scope.row.id)">删除</el-button>
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


    <el-dialog title="vip时间设置" :visible.sync="dialogTableVisible" width="30%">
      <el-form>
        <el-form-item label="请设置vip到期时间">

          <el-date-picker
            v-model="updateParam.vipTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog()">取 消</el-button>
        <el-button type="primary" @click="updataVipTime" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {deleteStudentById, getAll, getVipUserById, updateStudentById} from "@/api/student";

export default {
  name: "Index",
  data() {
    return {
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
        nameOrMobile: this.searchContent,
        current: this.currentPage,
        size: 10
      }
      getAll(data).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
      this.loading = false
    },

    cancelDialog() {
      this.updateParam.id = null
      this.updateParam.vipTime = null
    },
    updataVipTime() {
      this.confirmLoading = true
      updateStudentById(this.updateParam).then(res => {
        if (res.code === 200) {
          this.$message({
            message: 'vip时间设置成功',
            type: 'success'
          })

        }
      })
      this.confirmLoading = false

      this.dialogTableVisible = false
    },
    getVipUser(id) {
      this.fullscreenLoading = true
      getVipUserById(id).then(res => {
        if (res.code === 200) {
          this.updateParam.id = res.data.id
          this.updateParam.vipTime = res.data.vipTime
          this.dialogTableVisible = true
        }
      })

      this.fullscreenLoading = false
    },
    deleteTeacher(id) {
      deleteStudentById(id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
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
