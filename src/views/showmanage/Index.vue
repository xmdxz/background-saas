<template>
  <div class="app-container">

    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="名称">
          <el-input v-model="searchContent" placeholder="请输入演出名称" size="small"></el-input>
        </el-form-item>
        <el-form-item label="演出者">
          <el-input v-model="searchAuthor" placeholder="请输入演出者" size="small"></el-input>
        </el-form-item>
        <el-form-item label="演出类型">
          <el-select v-model="showTypeSelected" size="small" placeholder="请选择演出类型" clearable>
            <el-option value="YCH" label="演唱会"></el-option>
            <el-option value="HJ" label="话剧"></el-option>
            <el-option value="TKX" label="脱口秀"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="演出城市">
          <el-select v-model="searchCity" size="small" placeholder="请选择演出城市">
            <el-option v-for="item in cityList" :key="item.id" :value="item.cityCode"
                       :label="item.cityName"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="fetchData" size="small">筛选演出</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="toAddShow" size="small">添加演出</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
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
        label="演出封面"
        width="100"
      >
        <template slot-scope="scope">
          <el-image :src="scope.row.imgUrl | images"></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="演出名称"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="author"
        label="主演人"
        width="120">
      </el-table-column>

      <el-table-column
        prop="startTime"
        label="演出开始时间"
        width="200">
      </el-table-column>
      <el-table-column
        prop="stopTime"
        label="演出结束时间"
        width="200">
      </el-table-column>

      <el-table-column
        prop="createTime"
        label="演出创建时间"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
        fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="toEditShow(scope.row.id)">
            编辑
          </el-button>
          <el-button type="danger" @click="deleteShow(scope.row.id)">删除</el-button>
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


  </div>
</template>

<script>
import {deleteShow, getShowList} from "@/api/show";
import {getCityList} from "@/api/city";
import {load} from "runjs/lib/script";

export default {
  name: "Index",
  data() {
    return {
      tableData: [],
      searchContent: '',
      searchAuthor: '',
      searchCity: '',
      loading: false,
      fileList: [],
      imageUrl: '',
      currentPage: 1,
      fullscreenLoading: false,
      confirmLoading: false,
      teacherUserList: [],
      showTypeSelected: '',
      cityList: []
    }
  },
  created() {
    this.fetchData()
    this.getCity()
  },
  methods: {
    load,
    getCity() {
      getCityList().then(res => {
        this.cityList = res
      })
    },
    fetchData() {
      this.loading = true
      const data = {
        showName: this.searchContent,
        type: this.showTypeSelected,
        author: this.searchAuthor,
        current: this.currentPage,
        city: this.searchCity,
        size: 10
      }
      getShowList(data).then(res => {
        this.tableData = res.records
        this.loading = false
      })
    },
    toAddShow() {
      this.$router.push("addShow")
    },
    toEditShow(id) {
      this.$router.push({
        name: "addShow", params: {
          id: id
        }
      })
    },
    deleteShow(id) {
      deleteShow(id).then(res => {
        this.$message.success('删除成功')
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
