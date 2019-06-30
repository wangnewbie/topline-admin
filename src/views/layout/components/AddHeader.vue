<template>
  <div class="addHeader">
    <el-row>
      <el-col :span="5" :offset="1">
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="4" :offset="14">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img :src="$store.state.user.photo" class="user-avatar">
            {{ this.$store.state.user.name }}<i class="iconfont iconsanjiao"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item divided @click.native="handleExitUser">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getUser, removeUser } from '@/utils/auth'

export default {
  name: 'AddHeader',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // this.userInfo = JSON.parse(window.localStorage.getItem('user_info'))
    this.userInfo = getUser()
  },
  methods: {
    handleExitUser () {
      this.$confirm('确定退出登录?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // window.localStorage.removeItem('user_info')
        removeUser()
        this.$router.push({ name: 'login' })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.addHeader {
  .el-dropdown {
    cursor: pointer;
    .user-avatar {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
}
</style>
