<template>
  <div class="login-wrap">
    <div class="form-head">
      <img src="./logo_index.png" class="user-avatar">
      <el-form ref="form" :model="userForm" class="form-content" :rules="rules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="15">
            <el-input v-model="userForm.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-button type="primary" @click="handleSendCode" ref="code" :disabled="!!codeTimer">{{ !!codeTimer ? sendCode = `${codeSecond}秒后重新发送` : sendCode = `发送验证码` }}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item prop="checked">
          <div class="allow">
            <el-checkbox v-model="userForm.checked" class="is-checked"></el-checkbox>我已阅读并同意
            <a href>用户协议</a>和
            <a href>隐私条款</a>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import '@/vendor/gt'
import { setUser } from '@/utils/auth'
import initGeetest from '@/utils/init-geetest'

// 验证复选框是否选中
let checked = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请先阅读用户协议和隐私条款'))
  } else {
    callback()
  }
}
// 验证手机号
let phone = (rule, value, callback) => {
  let regFormat = /^[1][3578][0-9]{9}$/
  if (!value) {
    return callback(new Error('不能为空'))
  }
  if (!(regFormat.test(value))) {
    callback(new Error('请输入正确手机号'))
  } else {
    callback()
  }
}
// 验证是否输入验证码
let code = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('不能为空'))
  } else {
    callback()
  }
}

const initCodeTimeSeconds = 60

export default {
  name: 'AppLogin',
  data () {
    return {
      userForm: {
        mobile: '',
        code: '',
        checked: true
      },
      sendCode: '发送验证码',
      codeTimer: false,
      codeSecond: initCodeTimeSeconds,
      rules: {
        mobile: [
          // { required: true, message: "请输入手机号", trigger: "blur" }
          { validator: phone }
        ],
        code: [
          { validator: code }
        ],
        checked: [
          { validator: checked, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSendCode () {
      this.$refs['form'].validateField('mobile', async errorMessage => {
        if (errorMessage.trim().length > 0) {
          return
        }
        const { mobile } = this.userForm
        const res = await axios.get(`/captchas/${mobile}`)
        const { data } = res.data
        const captchaObj = await initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind' // 隐藏，直接弹出式
        })
        captchaObj.onReady(() => {
          // 验证码ready之后才能调用verify方法显示验证码
          captchaObj.verify() // 弹出验证码内容框
        }).onSuccess(async () => {
          const {
            geetest_challenge: challenge,
            geetest_seccode: seccode,
            geetest_validate: validate } = captchaObj.getValidate()
          await axios({
            method: 'get',
            url: `/sms/codes/${mobile}`,
            params: {
              challenge,
              validate,
              seccode
            }
          })
          this.codeCountDown()
        })
      })
    },
    handleLogin () {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            const res = await axios.post('/authorizations', {
              mobile: this.userForm.mobile,
              code: this.userForm.code
            })
            setUser(res.data.data)
            this.$router.push({
              name: 'home'
            })
          } catch (error) {
            this.$message.error('登录失败，手机号或验证码错误')
          }
        } else {
          return false
        }
      })
    },
    codeCountDown () {
      this.codeTimer = window.setInterval(() => {
        if (this.codeSecond >= 1) {
          // this.sendCode = `${codeSecond}秒后重新发送`
          this.codeSecond--
        } else {
          this.codeSecond = initCodeTimeSeconds
          window.clearInterval(this.codeTimer)
          this.codeTimer = false
        }
      }, 1000)
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
  text-align: center;
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
      color: #999;
      .is-checked {
        margin-right: 10px;
      }
      a {
        color: #3296fa;
      }
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
