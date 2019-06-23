<template>
  <div class="addHeader">
    <el-row>
      <el-col :span="5" :offset="1">
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col :span="4" :offset="14">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="http://toutiao.meiduo.site/Fkj6tQi3xJwVXi1u2swCElotfdCi" class="user-avatar">
            下拉菜单
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AddHeader',
  data () {
    return {}
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
