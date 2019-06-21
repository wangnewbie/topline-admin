<template>
  <div class="login-wrap">
    <div class="form-head">
      <img src="./logo_index.png" class="user-avatar">
      <el-form ref="form" :model="userForm" class="form-content">
        <el-form-item>
          <el-input v-model="userForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="16">
            <el-input v-model="userForm.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button>发送验证码</el-button>
          </el-col>
        </el-form-item>
        <div class="allow">
          <el-checkbox v-model="checked" class="is-checked"></el-checkbox>我已阅读并同意
          <a href>用户协议</a>和
          <a href>隐私条款</a>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppLogin',
  data () {
    return {
      userForm: {
        mobile: '',
        code: ''
      },
      checked: true
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  background: url(./login_bg.jpg);
  background-size: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-head {
    width: 30%;
    padding: 30px 0;
    background-color: #fff;
    .user-avatar {
      width: 40%;
    }
    .form-content {
      padding: 25px 40px 0;
    }
    .allow {
      text-align: left;
      font-size: 14px;
      margin-bottom: 20px;
      color: #999;
      .is-checked {
        margin-right: 10px;
      }
      a {
        color: #3296fa;
      }
    }
  }
}
</style>
