<template>
  <div class="addAside">
    <div class="logo">
      <img src="./logo_admin.png" width="120">
    </div>
    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#353b4e"
      text-color="#adafb5"
      active-text-color="#409eff"
      router>
      <el-menu-item index="/">
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="/article">
        <template slot="title">
          <span>内容管理</span>
        </template>
        <el-menu-item index="/publish">发布文章</el-menu-item>
        <el-menu-item index="/publish/:articleId">内容列表</el-menu-item>
        <el-menu-item index="/comment">评论列表</el-menu-item>
        <el-menu-item index="/image">素材管理</el-menu-item>
      </el-submenu>
      <el-submenu index="/fans">
        <template slot="title">
          <span>粉丝管理</span>
        </template>
        <el-menu-item index="/fans">图文数据</el-menu-item>
        <el-menu-item index="/fans/overview">粉丝概况</el-menu-item>
        <el-menu-item index="/fans/portrayal">粉丝画像</el-menu-item>
        <el-menu-item index="/fans/list">粉丝列表</el-menu-item>
      </el-submenu>
      <el-menu-item index="/account">
        <span slot="title">账户信息</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'AddHeader',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {},
    handleClose (key, keyPath) {}
  }
}
</script>

<style lang="less">
.logo {
  background-color: #2e2f32;
  padding: 15px;
}
.el-menu-vertical-demo {
  border: 0 !important;
  .el-menu-item {
    padding-left: 40px !important;
    text-align: left !important;
  }
  .el-submenu {
    .el-submenu__title {
      padding-left: 40px !important;
      text-align: left !important;
    }
    .el-menu-item {
      background-color: #323745 !important;
    }
    .el-menu-item:hover {
      background-color: #3296fa!important;
      color: #fff!important;
    }
  }
}

</style>
