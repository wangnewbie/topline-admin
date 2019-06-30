<template>
  <div class="upload-image-warp">
    <el-button type="primary" @click="dialogTableVisible = true">上传图片</el-button>
    <el-dialog title="上传图片" :visible.sync="dialogTableVisible">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <img v-else src="./pic_bg.png" class="avatar">
      <el-upload
        ref="upload"
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :headers="{ Authorization: `Bearer ${$store.state.user.token}` }"
        name="image"
        :file-list="fileList"
        :auto-upload="false"
        :on-success="headelSucceed">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImage',
  data () {
    return {
      fileList: [],
      imageUrl: '',
      dialogTableVisible: false
    }
  },
  methods: {
    submitUpload () {
      this.$refs.upload.submit()
    },
    headelSucceed (response, file, fileList) {
      // this.dialogTableVisible = false
      this.imageUrl = response.data.url
      this.$emit('loadImage', this.imageUrl)
    }
  }
}
</script>

<style lang="less">
.el-dialog__body {
  text-align: center;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 240px;
  height: 200px;
}
</style>
