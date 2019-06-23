<template>
  <div class="layout-warp">
    <el-container>
      <el-aside width="200px">
        <AddAside></AddAside>
      </el-aside>
      <el-container>
        <el-header height="50px">
          <AddHeader></AddHeader>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AddAside from './components/AddAside'
import AddHeader from './components/AddHeader'

export default {
  name: 'layout',
  components: {
    AddAside,
    AddHeader
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.layout-warp {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background-color: #323745;
    }
    .el-header {
      padding: 0;
      line-height: 50px;
    }
    .el-main {
      padding: 10px;
      background-color: #f2f3f5;
    }
  }
}
</style>
