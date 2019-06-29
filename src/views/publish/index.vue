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
          <!-- <el-input type="textarea" v-model="publishForm.content"></el-input> -->
          <quill-editor v-model="publishForm.content"
            ref="myQuillEditor"
            :options="editorOption"></quill-editor>
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
          <el-button :loading="isLoading" type="primary" @click="handlePublish(false)">发布</el-button>
          <el-button @click="handlePublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import ArticleChannel from '@/components/article-channel'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'Addpublish',
  components: {
    ArticleChannel,
    quillEditor
  },
  data () {
    return {
      publishForm: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: ''
      },
      isLoading: false,
      editorOption: {} // 富文本编辑器配置选项
    }
  },
  created () {
    if (this.$route.name === 'publish-edit') {
      this.loadPublish()
    }
  },
  methods: {
    async handlePublish (draft) {
      this.isLoading = true
      try {
        if (this.$route.name === 'publish-edit') {
          await this.$http({
            method: 'PUT',
            url: `/articles/${this.$route.params.id}`,
            params: {
              draft
            },
            data: this.publishForm
          })
          this.$message(`${draft ? '修改并存入草稿' : '修改文章'}成功`)
          this.$router.push({ name: 'article' })
        } else {
          await this.$http({
            method: 'POST',
            url: '/articles',
            params: {
              draft
            },
            data: this.publishForm
          })
          this.$message(`${draft ? '存入草稿' : '发布文章'}成功`)
          this.$router.push({ name: 'article' })
        }
      } catch (error) {
        if (this.$route.name === 'publish-edit') {
          this.$message.error(`${draft ? '修改并存入草稿' : '修改文章'}失败`)
        } else {
          this.$message.error(`${draft ? '存入草稿' : '发布文章'}失败`)
        }
      }
      this.isLoading = false
    },
    async loadPublish () {
      try {
        const data = await this.$http.get(`/articles/${this.$route.params.id}`)
        this.publishForm = data
      } catch (error) {
        this.$message.error('获取文章失败')
      }
      // console.log(this.$route.params.id)
    }
  }
}
</script>

<style lang="less">
.el-input {
  width: 400px;
}
.ql-container {
  height: 400px;
}
.el-input--suffix {
  width: 200px;
}
</style>
