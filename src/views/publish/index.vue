<template>
  <div class="publish-warp">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>发布文章</span>
      </div>
      <el-form ref="form" :model="publishForm" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="publishForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="publishForm.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="publishForm.cover">
            <el-radio label="单张"></el-radio>
            <el-radio label="三张"></el-radio>
            <el-radio label="无图"></el-radio>
            <el-radio label="自动"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <!-- <input :value="publishForm.channel_id" @input="publishForm.channel_id = $event.target.value"> -->
          <article-channel v-model="publishForm.channel_id"></article-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
export default {
  name: 'Addpublish',
  components: {
    ArticleChannel
  },
  data () {
    return {
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: '',
          images: ''
        },
        channel_id: ''
      }
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
</style>
