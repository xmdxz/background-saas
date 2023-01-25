<template>
  <div class="container">
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="城市名称">
          <el-input v-model="searchContent" placeholder="请输入城市名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fetchData" size="small">搜素城市</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="dialogTableVisible = true" size="small">添加城市</el-button>
        </el-form-item>
      </el-form>
    </el-row>

    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 80%"
      size="small">
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
        prop="cityName"
        label="城市名称"
      >
      </el-table-column>
      <el-table-column
        prop="cityCode"
        label="城市代码"
      >
      </el-table-column>
      <el-table-column
        label="是否热门"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.isHot | resolveHot }}
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">

      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
        fixed="right">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="editCity(scope.row)">
            编辑
          </el-button>
          <el-button size="small" type="danger" @click="deleteCity(scope.row.id)">删除</el-button>
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

    <el-dialog title="新增城市" :visible.sync="dialogTableVisible" width="30%" @close="clearInfo">
      <el-form>
        <el-form-item label="城市名称" label-width="80px">
          <el-input class="add-user-input" v-model="addParam.cityName" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <el-form-item label="城市代码" label-width="80px">
          <el-input class="add-user-input" v-model="addParam.cityCode" autocomplete="off" size="small"></el-input>
        </el-form-item>

        <el-form-item label="拼音" label-width="80px">
          <el-input size="small" v-model="addParam.spell" rows="3"></el-input>

        </el-form-item>
        <el-form-item label="热门城市" label-width="80px">
          <el-switch
            v-model="isHot"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>

        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog()">取 消</el-button>
        <el-button type="primary" @click="addCity" :loading="confirmLoading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {addCity, deleteCity, getCityListByPage} from "@/api/city";

export default {
  name: "Index",
  data() {
    return {
      loading: false,
      searchContent: '',
      tableData: [],
      currentPage: 1,
      dialogTableVisible: false,
      addParam: {
        id: null,
        cityName: '',
        cityCode: '',
        isHot: 0,
        spell: ''
      },
      isHot: false,
      confirmLoading: false
    }
  },
  filters: {
    resolveHot(value) {
      return value === 1 ? '是' : '否'
    }
  },
  watch: {
    isHot: {
      handler(newVal, oldVal) {
        this.addParam.isHot = newVal ? 1 : 0
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    addCity() {
      this.confirmLoading = true
      addCity(this.addParam).then(res => {
        this.$message.success('发布成功')
        this.confirmLoading = false
        this.dialogTableVisible = false
      })
    },
    fetchData() {
      this.loading = true
      const data = {
        cityName: this.searchContent,
        current: this.currentPage,
        size: 10
      }
      getCityListByPage(data).then(res => {
        this.tableData = res.records
        this.loading = false
      })
    },
    cancelDialog() {
      this.dialogTableVisible = false
    },
    editCity(row) {
      console.log(row)
      this.dialogTableVisible = true
      this.addParam.id = row.id
      this.addParam.cityCode = row.cityCode
      this.addParam.cityName = row.cityName
      this.addParam.isHot = row.isHot
      if (this.addParam.isHot === 1) {
        this.isHot = true
      } else this.isHot = false
      this.addParam.spell = row.spell
    },
    clearInfo() {
      this.addParam = {
        id: null,
        cityName: '',
        cityCode: '',
        isHot: 0,
        spell: ''
      }
    },
    deleteCity(id) {
      deleteCity(id).then(res => {
        this.$message.success('删除成功')
      })
    }
  }
}
</script>

<style scoped>

.container {
  padding: 20px;
}
</style>
