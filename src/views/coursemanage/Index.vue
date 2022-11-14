<template>
  <div class="app-container">

    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-input v-model="searchContent" placeholder="请输入课程名或教练名查询"></el-input>
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
        prop="imgUrl"
        label="课程封面"
        width="100"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.imgUrl | filterImgUrl"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="课程名"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="teacherName"
        label="教练"
        width="120">
      </el-table-column>

      <el-table-column
        prop="startTime"
        label="课程开始时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="stopTime"
        label="课程结束时间"
        width="200">
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="课程创建时间"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="getCourse(scope.row.id)" v-loading.fullscreen.lock="fullscreenLoading">
            查看
          </el-button>
          <el-button type="success" @click="toCourseDetail(scope.row.id)">
            明细
          </el-button>
          <el-button type="danger" @click="deleteCourse(scope.row.id)">删除</el-button>
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


    <el-dialog title="添加/编辑课程" :visible.sync="dialogTableVisible" width="30%">
      <el-form>
        <el-form-item label="课程名" label-width="120px">
          <el-input class="add-user-input" v-model="addCourseParam.name" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="选择课程老师" label-width="120px">
          <el-select v-model="addCourseParam.teacherId" size="small">
            <el-option v-for="item in teacherUserList" :key="item.id" :value="item.id" :label="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程开始时间" label-width="120px">
          <el-date-picker
            v-model="addCourseParam.startTime"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            size="small">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="课程结束时间" label-width="120px">
          <el-date-picker
            v-model="addCourseParam.stopTime"
            type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
            size="small">
          </el-date-picker>

        </el-form-item>
        <el-form-item label="上传课程封面" label-width="120px">
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
        <el-form-item label="课程介绍" label-width="120px">
          <el-input type="textarea" v-model="addCourseParam.comment" rows="3"></el-input>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog()">取 消</el-button>
        <el-button type="primary" @click="addCourse" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getUrl} from "@/api/image";
import {addCourse, deleteCourse, findCourse, getCourse} from "@/api/course";
import {getAllTeacher} from "@/api/teacher";

export default {
  name: "Index",
  data() {
    return {
      tableData: [],
      searchContent: '',
      loading: false,
      dialogTableVisible: false,
      addCourseParam: {
        id: null,
        name: '',
        startTime: '',
        stopTime: '',
        teacherId: null,
        imgUrl: '',
        comment: '',
      },
      fileList: [],
      imageUrl: '',
      currentPage: 1,
      fullscreenLoading: false,
      confirmLoading: false,
      teacherUserList: []
    }
  },
  filters: {
    filterImgUrl(imgUrl) {
      return getUrl(imgUrl);
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      const data = {
        courseNameOrTeacher: this.searchContent,
        current: this.currentPage,
        size: 10
      }
      findCourse(data).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
      getAllTeacher().then(res => {
        if (res.code === 200) {
          this.teacherUserList = res.data
        }
      })
      this.loading = false
    },
    handleAvatarSuccess(res, file, fileList) {
      if (res.code === 200) {
        this.addCourseParam.imgUrl = res.data
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
    addCourse() {
      this.confirmLoading = true
      addCourse(this.addCourseParam).then(res => {
        this.confirmLoading = false
        if (res.code === 200) {
          this.$message({
            message: '课程发布成功',
            type: 'success'
          })

        }
      })
      this.dialogTableVisible = false
    },
    getCourse(id) {
      this.fullscreenLoading = true
      getCourse(id).then(res => {
        if (res.code === 200) {
          this.addCourseParam = res.data
          this.imageUrl = getUrl(this.addCourseParam.imgUrl)
          this.dialogTableVisible = true
        }
      })

      this.fullscreenLoading = false
    },
    deleteCourse(id) {
      deleteCourse(id).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
    },
    toCourseDetail(id) {
      // 将id传递给下一个页面
      this.$router.push({
        name: 'CourseDetail',
        params: {
          id: id
        }
      });
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
