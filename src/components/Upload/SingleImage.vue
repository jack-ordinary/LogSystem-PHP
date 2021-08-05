<template>
  <div class="upload-container">
    <el-upload
      :data="dataObj"
      :multiple="false"
      :show-file-list="true"
      :on-success="handleImageSuccess"
      :on-change="storeFile"
      :auto-upload="true"
      class="image-uploader"
      drag
      :action="uploadUrl"
    >
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>

    <div class="image-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addFile } from '@/api/qiniu'
import apiUri from '@/apiUri.js'

export default {
  name: 'SingleImageUpload',
  props: {
    value: {
      type: String,
      default: ''
    },
    fileurl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      uploadUrl: apiUri + '/api/v1/photoUploadSingle',
      tempUrl: '',
      dataObj: { token: '', key: '' }
    }
  },
  computed: {
    imageUrl() {
      return this.value
    }
  },
  methods: {
    storeFile(file, fileList) {
      // this.files = fileList
      // 文件只能是图片类型
      const isImage = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png' || file.raw.type === 'image/gif')
      // 限制上传文件为2M
      const sizeIsSatisfy = file.size < 2 * 1024 * 1024
      if (!isImage) {
        this.$message.error('上传文件只能是图片格式')
        return false
      }

      if (!sizeIsSatisfy) {
        this.fileSizeIsSatisfy = true
        return this.$message({
          message: '文件不能大于2M哦',
          type: 'error'
        })
      }

      // var reader = new FileReader()
      // reader.readAsDataURL(file.raw)
      // reader.onload = function(e) {
      // console.log(this.result)// 图片的base64数据
      // }
    },

    rmImage() {
      this.emitInput('')
    },

    emitInput(val) {
      this.$emit('input', val)
    },

    handleImageSuccess(response, file, fileList) {
      var imagePath = this.$apiUrl + response.data
      // this.emitInput(file.files.file)
      this.emitInput(imagePath)
      this.$emit('getfileUrl', response.data) // 给子组件方法传值
    }

    // beforeUpload() {
    //   const _self = this
    //   return new Promise((resolve, reject) => {
    //     getToken().then(response => {
    //       const key = response.data.qiniu_key
    //       const token = response.data.qiniu_token
    //       _self._data.dataObj.token = token
    //       _self._data.dataObj.key = key
    //       this.tempUrl = response.data.qiniu_url
    //       resolve(true)
    //     }).catch(err => {
    //       console.log(err)
    //       reject(false)
    //     })
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
    @import "~@/styles/mixin.scss";
    .upload-container {
        width: 100%;
        position: relative;
        @include clearfix;
        .image-uploader {
            width: 60%;
            float: left;
        }
        .image-preview {
            width: 200px;
            height: 200px;
            position: relative;
            border: 1px dashed #d9d9d9;
            float: left;
            margin-left: 50px;
            .image-preview-wrapper {
                position: relative;
                width: 100%;
                height: 100%;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .image-preview-action {
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                cursor: default;
                text-align: center;
                color: #fff;
                opacity: 0;
                font-size: 20px;
                background-color: rgba(0, 0, 0, .5);
                transition: opacity .3s;
                cursor: pointer;
                text-align: center;
                line-height: 200px;
                .el-icon-delete {
                    font-size: 36px;
                }
            }
            &:hover {
                .image-preview-action {
                    opacity: 1;
                }
            }
        }
    }

</style>
