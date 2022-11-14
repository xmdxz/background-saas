<template>
  <div class="app-container">
<!--    <el-image-->
<!--      style="width: 200px; height: 200px;margin: 20px"-->
<!--      v-for="(item,index) in srcList"-->
<!--      :src="item"-->
<!--      :key="index"-->
<!--      :preview-src-list="srcList">-->
<!--    </el-image>-->
    <el-upload
      action="http://localhost:10086/upload"
      list-type="picture-card"
      :file-list="srcList"
      :on-success="uploadSuccess"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {listImage, addImage, deleteIndex} from "@/api/user";

export default {
  data() {
    return {
      dataList: [],
      srcList: [],
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  watch: {
    dataList(newL, old) {
      let arr = []
      newL.forEach(e => {
        let obj = {}
        obj.url =this.image(e.image)
        obj.id = e.id
        arr.push(obj)
      })
      this.srcList = arr
    }
  },
  async mounted() {
    await this.fetchData()
    console.log(this.dataList)
  },
  methods: {
    image(value) {
      if (!value) return ''
      if (Array.isArray(value)) {
        return "http://localhost:10086/" + value[0]
      } else {
        value = value.toString()
        return "http://localhost:10086/" + value
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    fetchData() {
      listImage().then(res => {
        this.dataList = res
      })
    },
    handleRemove(file, fileList) {
      deleteIndex(file.id).then(e => {
        if (e){
          this.$message({
            type:"success",
            message:"删除成功"
          })
          this.fetchData()
        }
      })
    },
    uploadSuccess(response, file, fileList){
      addImage(response.data).then(e => {
        if (e){
          this.$message({
            type:'success',
            message:"上传成功"
          })
          this.fetchData()
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
