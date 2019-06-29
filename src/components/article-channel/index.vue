<template>
  <el-select clearable :value="value" @change="$emit('input', $event)" placeholder="请选择频道">
    <el-option v-for="item in classifyArticle" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ArticleChannel',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      classifyArticle: [] // 获取文章频道
    }
  },
  created () {
    this.loadClassifyArticle()
  },
  methods: {
    async loadClassifyArticle () {
      const res = await this.$http.get('/channels')
      this.classifyArticle = res.channels
    },
    handleChange (e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
