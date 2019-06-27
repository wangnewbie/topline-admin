<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref="form" :model="articleForm" label-width="80px">
        <el-form-item label="文章状态">
          <el-radio-group v-model="articleForm.status">
            <el-radio label="">全部</el-radio>
            <el-radio v-for="(item, index) in statTypes" :key="item.label" :label="index">{{ item.label }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model="articleForm.channel_id" placeholder="请选择频道">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in classifyArticle" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <div class="block">
            <el-date-picker
              v-model="timeDifference"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              @change="filtrateDate">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filtrateArticle" :loading="loading">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{ totalCount }}条符合条件的内容</span>
      </div>
      <el-table
        :data="articles"
        style="width: 100%"
        v-loading="loading">
        <el-table-column
          label="封面"
          width="180">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images" width="120" height="70">
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
          :current-page="page"
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
      articles: [], // 文章数据
      statTypes: [ // 文章状态
        { type: 'info', label: '草稿' },
        { type: 'success', label: '待审核' },
        { type: '', label: '审核通过' },
        { type: 'warning', label: '审核失败' },
        { type: 'danger', label: '已删除' }
      ],
      page: 1, // 当前页码
      pageSize: 10, // 每页数量
      totalCount: 0, // 文章总数
      loading: false, // 列表加载中状态
      articleLoading: false, // 列表加载中分页的禁用状态
      articleForm: {
        status: '', // 文章状态
        channel_id: '', // 频道id
        begin_pubdate: '', // 开始时间
        end_pubdate: '' // 结束时间
      },
      timeDifference: '', // 开始时间到结束时间的数组
      classifyArticle: [] // 获取文章频道
    }
  },
  created () {
    this.loadArticles()
    this.loadClassifyArticle()
  },
  methods: {
    async loadArticles () {
      try {
        this.loading = true
        this.articleLoading = true
        const filtrateData = {}
        for (let key in this.articleForm) {
          if (this.articleForm[key] !== null && this.articleForm[key] !== undefined && this.articleForm[key] !== '') {
            filtrateData[key] = this.articleForm[key]
          }
        }
        const res = await this.$http({
          method: 'GET',
          url: '/articles',
          params: {
            page: this.page,
            per_page: 10,
            ...filtrateData
          }
        })
        this.articles = res.results
        this.totalCount = res.total_count
        this.loading = false
        this.articleLoading = false
      } catch (error) {
        this.$message.error('获取文件列表失败')
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.loadArticles()
    },
    filtrateArticle () {
      this.page = 1
      this.loadArticles()
    },
    async loadClassifyArticle () {
      const res = await this.$http.get('/channels')
      this.classifyArticle = res.channels
    },
    filtrateDate (value) {
      this.articleForm.begin_pubdate = value[0]
      this.articleForm.end_pubdate = value[1]
    }
  }
}
</script>

<style lang="less" scoped>
.el-card {
  margin-bottom: 10px;
}
</style>
