<template>
  <div class="login-wrap">
    <div class="form-head">
      <img src="./logo_index.png" class="user-avatar">
      <el-form ref="form" :model="userForm" class="form-content" :rules="rules" status-icon>
        <el-form-item prop="mobile">
          <el-input v-model="userForm.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-col :span="14">
            <el-input v-model="userForm.code" placeholder="验证码"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button type="primary" @click="handleSendCode" ref="code" :disabled="!!codeTimer">{{ sendCode }}</el-button>
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
      this.$refs['form'].validateField('mobile', errorMessage => {
        if (errorMessage.trim().length > 0) {
          return
        }
        const { mobile } = this.userForm
        axios.get(`http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`).then((res) => {
          const { data } = res.data
          window.initGeetest({
            gt: data.gt,
            challenge: data.challenge,
            offline: !data.success,
            new_captcha: data.new_captcha,
            product: 'bind' // 隐藏，直接弹出式
          }, (captchaObj) => {
            captchaObj.onReady(() => {
              // 验证码ready之后才能调用verify方法显示验证码
              captchaObj.verify() // 弹出验证码内容框
            }).onSuccess(() => {
              // your code
              const {
                geetest_challenge: challenge,
                geetest_seccode: seccode,
                geetest_validate: validate } = captchaObj.getValidate()
              axios({
                method: 'get',
                url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
                params: {
                  challenge,
                  validate,
                  seccode
                }
              }).then((res) => {
                this.codeCountDown()
              })
            }).onError(function () {
              // your code
            })
          })
        })
      })
    },
    handleLogin () {
      this.$refs['form'].validate(valid => {
        if (valid) {
          axios.post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', {
            mobile: this.userForm.mobile,
            code: this.userForm.code
          }).then((res) => {
            this.$router.push({
              name: 'home'
            })
          }).catch((e) => {
            this.$message.error('登录失败，手机号或验证码错误')
          })
        } else {
          return false
        }
      })
    },
    codeCountDown () {
      let codeSecond = 5
      this.codeTimer = window.setInterval(() => {
        if (codeSecond >= 0) {
          this.sendCode = `${codeSecond}秒后重新发送`
          codeSecond--
        } else {
          this.sendCode = '发送验证码'
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
  }
}
</style>
