<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到0条符合条件的内容</span>
      </div>
      <el-table
        :data="articles"
        style="width: 100%"
        v-loading="loading">
        <el-table-column
          label="封面"
          width="180">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="300">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="时间"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="statTypes[scope.row.status].type">{{ statTypes[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template>
            <el-button size="mini" type="primary" plain>编辑</el-button>
            <el-button size="mini" type="danger" plain>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="totalCount"
          :disabled="articleLoading">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AppArticle',
  data () {
    return {
      articles: [],
      statTypes: [
        { type: 'info', label: '草稿' },
        { type: 'success', label: '待审核' },
        { type: '', label: '审核通过' },
        { type: 'warning', label: '审核失败' },
        { type: 'danger', label: '已删除' }
      ],
      page: 1,
      pageSize: 10,
      totalCount: 0,
      loading: false,
      articleLoading: false
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    async loadArticles () {
      this.loading = true
      this.articleLoading = true
      const res = await this.$http({
        method: 'GET',
        url: '/articles',
        params: {
          page: this.page,
          per_page: 10
        }
      })
      this.articles = res.results
      this.totalCount = res.total_count
      this.loading = false
      this.articleLoading = false
    },
    handleCurrentChange (val) {
      this.page = val
      this.loadArticles()
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 10px;
}
.block {
  margin-top: 20px;
}
</style>
