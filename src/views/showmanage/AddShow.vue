<template>
  <div class="container">
    <el-form>
      <el-form-item label="演出名称" label-width="120px">
        <el-input v-model="addParam.name" style="width: 20%" size="small"></el-input>
      </el-form-item>
      <el-form-item label="演出者" label-width="120px">
        <el-input v-model="addParam.author" style="width: 20%" size="small"></el-input>
      </el-form-item>
      <el-form-item label="演出城市" label-width="120px">
        <el-select v-model="addParam.city" size="small" placeholder="请选择演出城市">
          <el-option v-for="item in cityList" :key="item.id" :value="item.cityCode" :label="item.cityName"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="演出类型" label-width="120px">
        <el-select v-model="addParam.type" size="small" placeholder="请选择演出类型">
          <el-option value="YCH" label="演唱会"/>
          <el-option value="HJ" label="话剧"/>
          <el-option value="TKX" label="脱口秀"/>
        </el-select>
      </el-form-item>
      <el-form-item label="演出开始时间" label-width="120px">
        <el-date-picker
          v-model="addParam.startTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
          size="small">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="演出结束时间" label-width="120px">
        <el-date-picker
          v-model="addParam.stopTime"
          type="datetime"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期"
          size="small">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="演出地点" label-width="120px">
        <el-input v-model="addParam.showPlace" style="width: 20%" size="small"></el-input>
      </el-form-item>
      <el-form-item label="封面上传" label-width="120px">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:10086/upload"
          :on-success="handleAvatarSuccess"
          :limit=1
        >
          <img v-if="imageUrl" :src="imageUrl | images" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="演出描述信息" label-width="120px">
        <el-input type="textarea" v-model="addParam.description" style="width: 40%" size="small"></el-input>
      </el-form-item>
      <el-form-item label="售卖价格" label-width="120px">
        <el-input v-model="addParam.price" style="width: 20%" size="small"></el-input>
      </el-form-item>
      <el-form-item label="限购规则" label-width="120px">
        <el-input type="textarea" v-model="addParam.buyRule" style="width: 40%" size="small"></el-input>
      </el-form-item>
      <el-form-item label="入场规则" label-width="120px">
        <el-input type="textarea" v-model="addParam.joinRule" style="width: 40%" size="small"></el-input>
      </el-form-item>
      <el-form-item label="发票说明" label-width="120px">
        <el-input type="textarea" v-model="addParam.invoiceIntro" style="width: 40%" size="small"></el-input>
      </el-form-item>
      <el-form-item label="观影须知" label-width="120px">
        <el-input type="textarea" v-model="addParam.viewRule" style="width: 40%" size="small"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="toShowList">返回列表</el-button>
        <el-button type="success" @click="addShow">发布演出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getCityList} from "@/api/city";
import {addShow, getShowById} from "@/api/show";

export default {
  name: "AddShow",
  data() {
    return {
      addParam: {
        id: null,
        name: '',
        author: '',
        city: '',
        startTime: '',
        stopTime: '',
        showPlace: '',
        description: '',
        price: '',
        buyRule: '',
        joinRule: '',
        invoiceIntro: '',
        viewRule: ''
      },
      imageUrl: '',
      cityList: {}
    }
  },
  mounted() {
    this.getCity()
    const id = this.$route.params.id
    console.log(id)
    getShowById(id).then(res => {
      this.addParam = res
      this.imageUrl = res.imgUrl
    })

  },
  methods: {
    getCity() {
      getCityList().then(res => {
        this.cityList = res
      })
    },
    addShow() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      addShow(this.addParam).then(res => {
        this.$message.success("发布成功")
        this.$router.push({name: 'show'})
        loading.close()
      })
    },
    handleAvatarSuccess(res, file, fileList) {
      if (res.code === 20000) {
        this.addParam.imgUrl = res.data
        this.imageUrl = res.data
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
    toShowList() {
      this.$router.push({
        name: 'show'
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
