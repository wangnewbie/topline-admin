<template>
  <div class="image-warp">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <el-radio-group v-model="active" size="small">
        <el-radio-button label="全部" @click.native="loadImage(false)"></el-radio-button>
        <el-radio-button label="收藏" @click.native="loadImage(true)"></el-radio-button>
      </el-radio-group>
      <!-- <el-button type="primary">上传图片</el-button> -->
      <upload-image @loadImage="uploadImage"></upload-image>
      <el-row :gutter="20">
        <el-col :span="4" v-for="item in material" :key="item.id">
          <el-card :body-style="{ padding: '0px' }">
            <div class="image-img">
              <img :src="item.url" class="image">
            </div>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button
                  size="small"
                  plain
                  :icon="item.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
                  circle
                  @click="headelCollect(item)"></el-button>
                <el-button
                  size="small"
                  plain
                  icon="el-icon-delete-solid"
                  circle
                  @click="headelDelete(item)"></el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import UploadImage from '@/components/upload-image'
export default {
  name: 'AppImage',
  components: {
    UploadImage
  },
  data () {
    return {
      material: {},
      active: '全部'
    }
  },
  created () {
    this.loadImage()
  },
  methods: {
    async loadImage (collect = false) {
      try {
        const data = await this.$http({
          method: 'GET',
          url: '/user/images',
          params: {
            collect
          }
        })
        this.material = data.results
      } catch (error) {
        this.$message.error('获取素材失败')
      }
    },
    async headelCollect (item) {
      try {
        await this.$http.put(`/user/images/${item.id}`, {
          collect: !item.is_collected
        })
        this.$message(`${item.is_collected ? '取消' : ''}收藏素材成功`)
        this.loadImage()
      } catch (error) {
        this.$message.error(`${item.is_collected ? '取消' : ''}收藏素材失败`)
      }
    },
    async headelDelete (item) {
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await this.$http.delete(`/user/images/${item.id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.loadImage()
      } catch (error) {
        if (error === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message.error('删除素材失败')
        }
      }
    },
    uploadImage (data) {
      this.loadImage()
    }
  }
}
</script>

<style lang="less" scoped>
.el-radio-group {
  margin-bottom: 30px;
}
.upload-image-warp {
  float: right;
}

.image-img {
  height: 200px;
  position: relative;
}

.bottom {
  line-height: 12px;
  text-align: center;
}

.image {
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
