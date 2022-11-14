<template>
  <div class="app-container">
    <el-row>
      <el-button type="primary" @click="toCourseList">返回课程列表</el-button>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        v-if="false"
        prop="id"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="userName"
        label="学员姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="报名时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {findCourseVipUser, getCourse} from "@/api/course";

export default {
  name: "Detail",
  data() {
    return {
      tableData: [],
      courseInfo: {
        id: null,
        name: '',
        startTime: '',
        stopTime: '',
        teacherName: '',
        imgUrl: '',
        comment: '',
      }
    }
  },
  created() {
    this.feachData()
  },
  methods: {
    feachData() {
      // 请求课程详细信息
      let id = this.$route.params.id;
      console.log(id)
      getCourse(id).then(res => {
        if (res.code === 200) {
          this.courseInfo = res.data
        }
      })
      // 请求课程报名人
      findCourseVipUser(id).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
    },
    toCourseList() {
      this.$router.push({
        name: 'Course'
      })
    }
  }
}
</script>

<style scoped>

</style>
