<template>
  <div class="app-container">

    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchContent" placeholder="请输入姓名或特长查询"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData">查询</el-button>
          <el-button type="success" @click="dialogTableVisible = true">添加</el-button>
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
        prop="hasCard"
        label="是否有资格证"
        width="120">
        <template slot-scope="scope">
          {{ scope.row.hasCard | filterCard }}
        </template>
      </el-table-column>
      <el-table-column
        prop="comment"
        label="特长备注"
        width="400">
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
          <el-button type="primary" @click="getTeacher(scope.row.id)" v-loading.fullscreen.lock="fullscreenLoading">
            查看
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


    <el-dialog title="添加教练" :visible.sync="dialogTableVisible" width="30%">
      <el-form>
        <el-form-item label="教练姓名" label-width="120px">
          <el-input class="add-user-input" v-model="addTeacherParam.name" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="教练性别" label-width="120px">
          <el-select v-model="addTeacherParam.sex" size="small" placeholder="请选择">
            <el-option
              key="1"
              label="男"
              :value="1">
            </el-option>
            <el-option
              key="0"
              label="女"
              :value="0">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="教练年龄" label-width="120px">
          <el-input class="add-user-input" v-model="addTeacherParam.age" auto-complete="off" size="small"></el-input>
        </el-form-item>

        <el-form-item label="是否具有资格证" label-width="120px">
          <el-select v-model="addTeacherParam.hasCard" size="small" placeholder="请选择">
            <el-option
              key="1"
              label="是"
              :value="1">
            </el-option>
            <el-option
              key="0"
              label="否"
              :value="0">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上传教练照片" label-width="120px">
          <el-upload
            class="avatar-uploader"
            action="/gmy/custom/upload"
            :on-success="handleAvatarSuccess"
            :limit=1
            :file-list="fileList"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="特长备注" label-width="120px">
          <el-input type="textarea" v-model="addTeacherParam.comment" rows="3"></el-input>

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
import {getUrl} from "@/api/image";
import {addTeacher, deleteTeacherById, getAll, getTeacherById} from "@/api/teacher";

export default {
  name: "Index",
  data() {
    return {
      tableData: [],
      searchContent: '',
      loading: false,
      dialogTableVisible: false,
      addTeacherParam: {
        id: null,
        name: '',
        sex: 1,
        age: null,
        hasCard: 1,
        imgUrl: '',
        comment: '',
      },
      fileList: [],
      imageUrl: '',
      currentPage: 1,
      fullscreenLoading: false,
      confirmLoading: false
    }
  },
  filters: {
    filterSex(value) {
      return value === 1 ? '男' : '女'
    },
    filterCard(value) {
      return value === 1 ? '有资格' : '无资格'
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      const data = {
        teacherName: this.searchContent,
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
    handleAvatarSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.addTeacherParam.imgUrl = res.data
        this.imageUrl = getUrl(res.data)
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

    cancelDialog() {
      this.addTeacherParam.id = null
      this.dialogTableVisible = false
      this.addTeacherParam.name = ''
      this.addTeacherParam.age = null
      this.addTeacherParam.comment = ''
      this.addTeacherParam.imgUrl = ''
      this.addTeacherParam.hasCard = null
      this.imageUrl = null
    },
    addUser() {
      this.confirmLoading = true
      addTeacher(this.addTeacherParam).then(res => {
        this.confirmLoading = false
        if (res.code === 200) {
          this.$message({
            message: '教练添加/编辑成功',
            type: 'success'
          })

        }
      })
      this.dialogTableVisible = false
    },
    getTeacher(id) {
      this.fullscreenLoading = true
      getTeacherById(id).then(res => {
        if (res.code === 200) {
          this.addTeacherParam = res.data
          this.imageUrl = getUrl(this.addTeacherParam.imgUrl)
          this.dialogTableVisible = true
        }
      })

      this.fullscreenLoading = false
    },
    deleteTeacher(id) {
      deleteTeacherById(id).then(res => {
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
