<template>
  <div class="app-container">


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
        prop="content"
        label="反馈内容"
        width="400"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="反馈人"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="反馈人手机号"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="反馈时间"
        width="200">
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
<!--        <el-form-item label="标题" label-width="120px">-->
<!--          <el-input class="add-user-input" v-model="addNoticeParam.title" autocomplete="off" size="small"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="通知类型" label-width="120px">
          <el-select v-model="addNoticeParam.type" placeholder="请选择通知类型">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
import {addNotice, findNotice,deleteNotice} from "@/api/notice";

export default {
  name: "Index",
  data() {
    return {
      options:[{
        value:"GOODS",
        label:"商品页"
      },{
        value:"DYNAMIC",
        label:"动态页"
      }],
      tableData: [],
      searchContent: '',
      loading: false,
      dialogTableVisible: false,
      addNoticeParam: {
        content: '',
        type:''
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
        keywords: this.searchContent,
        current: this.currentPage,
        size: 10
      }
      findNotice(data).then(res => {
          this.tableData = res.records
          this.total = res.total
      })
      this.loading = false
    },

    cancelDialog() {
    },
    addNotice() {
      this.confirmLoading = true
      addNotice(this.addNoticeParam).then(res => {
        if (res) {
          this.$message({
            message: '通知发布成功',
            type: 'success'
          })
          this.fetchData()
        }
      })
      this.confirmLoading = false
      this.dialogTableVisible = false
    },
    deleteNotice(id) {
      deleteNotice(id).then(res => {
        if (res) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.fetchData()
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
