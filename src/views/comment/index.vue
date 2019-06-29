<template>
  <div class="comment-warp">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论</span>
      </div>
      <el-table
        :data="commentList"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          width="600">
        </el-table-column>
        <el-table-column
          label="评论状态"
          width="120"
          align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.comment_status ? '正常' : '关闭' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数"
          width="120"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="handleChangeStatus(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        :current-page="page"
        @current-change="handleCurrentChange">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AppComment',
  data () {
    return {
      commentList: [],
      page: 1, // 当前页数
      pageSize: 10, // 每页数量
      totalCount: 0 // 文章总数
    }
  },
  created () {
    this.loadComment()
  },
  methods: {
    async loadComment () {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/articles',
          params: {
            response_type: 'comment',
            page: this.page,
            per_page: this.pageSize
          }
        })
        this.commentList = data.results
        this.totalCount = data.total_count
      } catch (error) {
        this.$message.error('加载文章列表失败')
      }
    },
    async handleChangeStatus (item) {
      try {
        console.log(item.comment_status)
        await this.$http({
          method: 'PUT',
          url: '/comments/status',
          params: {
            article_id: item.id.toString()
          },
          data: {
            allow_comment: item.comment_status
          }
        })
        this.$message('修改评论状态成功')
      } catch (error) {
        this.$message.error('修改评论状态失败')
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.loadComment()
    }
  }
}
</script>

<style lang="less" scoped>
.is-center {
  text-align: center;
}
</style>
