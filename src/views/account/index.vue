<template>
  <div class="account-warp">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户信息</span>
      </div>
      <el-form ref="form" :model="userForm" label-width="80px">
        <el-row :gutter="100">
          <el-col :span="12">
            <el-form-item label="媒体名称">
              <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体简介">
              <el-input v-model="userForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="头条号ID">
              <el-input v-model="userForm.id" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="绑定手机">
              <el-input v-model="userForm.mobile" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="headelUserInfo">保存更新</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <p>头像设置</p>
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
              :show-file-list="false"
              :http-request="headelUpload">
              <img v-if="userForm.photo" :src="userForm.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AppAccount',
  data () {
    return {
      userForm: {}
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      try {
        const res = await this.$http.get('/user/profile')
        this.userForm = res
        this.userForm.id = this.userForm.id.toString()
      } catch (error) {
        this.$message.error('加载账户信息失败')
      }
    },
    async headelUserInfo () {
      try {
        await this.$http.patch('/user/profile', {
          name: this.userForm.name,
          intro: this.userForm.intro,
          email: this.userForm.email
        })
        this.$store.commit('changeUser', this.userForm)
        this.$message('编辑账户信息成功')
      } catch (error) {
        this.$message.error('编辑账户信息失败')
      }
    },
    async headelUpload (uploadConfig) {
      try {
        const formData = new FormData()
        formData.append('photo', uploadConfig.file)
        const data = await this.$http.patch('/user/photo', formData)
        this.userForm.photo = data.photo
        this.$store.commit('changeUser', this.userForm)
        this.$message('图片上传成功')
      } catch (error) {
        this.$message.error('图片上传失败')
      }
    }
  }
}
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
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
  width: 178px;
  height: 178px;
  display: block;
}
</style>
