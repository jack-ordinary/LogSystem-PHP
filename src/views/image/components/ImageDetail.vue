<template>
  <div class="createPost-container">
    <el-form
      ref="postForm"
      v-loading="loading"
      :model="postForm"
      :rules="rules"
      class="form-container"
    >
      <sticky :z-index="10" :class-name="'sub-navbar '+postForm.status">
        <el-button
          v-show="isHidden"
          style="margin-left: 10px;"
          type="primary"
          class="form-AddCate"
          @click="AddCate"
        >添加分类</el-button>

        <SelectOption :options="cateList" :editcid="cid" @getCateName="getCateName" />
        <el-button style="margin-left: 10px;" type="success" @click="submitForm">{{ actionName }}</el-button>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <Warning />
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.image_title" :maxlength="100" name="name" required>Title</MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="70px" label="Summary:" hidden>
          <el-input
            v-model="postForm.content_short"
            :rows="1"
            type="textarea"
            class="article-textarea"
            autosize
            placeholder="Please enter the content"
          />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item>

        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
          <Upload :key="imgKey" v-model="postForm.image_uri" @getfileUrl="getfileUrl" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
// import Tinymce from '@/components/Tinymce'
import Upload from '@/components/Upload/SingleImage'
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky' // 粘性header组件
import { validURL } from '@/utils/validate'
import {
  addImageCategory,
  showImageCategory,
  addBannerImage,
  editImageBanner,
  detailImage
} from '@/api/images'
// import { searchUser } from '@/api/remote-search'
import Warning from './Warning'
import {
  // CommentDropdown,
  // PlatformDropdown,
  // SourceUrlDropdown,
  SelectOption
} from './Dropdown'

const defaultForm = {
  status: 'draft',
  image_title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  image_uri: '', // 文章图片
  display_time: undefined, // 前台展示时间
  id: undefined,
  platforms: ['a-platform'],
  comment_disabled: false,
  importance: 0
}

export default {
  name: 'ImageDetail',
  components: {
    // Tinymce,
    MDinput,
    Upload,
    Sticky,
    Warning,
    // CommentDropdown,
    // PlatformDropdown,
    // SourceUrlDropdown,
    SelectOption
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.name + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.name + '为必传项'))
      } else {
        callback()
      }
    }
    const validateSourceUri = (rule, value, callback) => {
      if (value) {
        if (validURL(value)) {
          callback()
        } else {
          this.$message({
            message: '外链url填写不正确',
            type: 'error'
          })
          callback(new Error('外链url填写不正确'))
        }
      } else {
        callback()
      }
    }

    return {
      postForm: Object.assign({}, defaultForm),
      actionName: '发布',
      isHidden: true,
      loading: false,
      imgKey: false,
      userListOptions: [],
      rules: {
        image_title: [{ validator: validateRequire, name: '标题' }],
        // content: [{ validator: validateRequire, name: '主体内容' }],
        image_uri: [{ validator: validateRequire, name: '图片' }],
        source_uri: [{ validator: validateSourceUri, trigger: 'blur' }]
      },
      tempRoute: {},
      cateList: [{}],
      cid: '',
      fileurl: '',
      aid: 0,
      image_uri: ''
    }
  },
  computed: {
    contentShortLength() {
      return this.postForm.content_short.length
    },
    lang() {
      return this.$store.getters.language
    },
    displayTime: {
      // set and get is useful when the data
      // returned by the back end api is different from the front end
      // back end return => "2013-06-25 06:59:25"
      // front end need timestamp => 1372114765000
      get() {
        return +new Date(this.postForm.display_time)
      },
      set(val) {
        this.postForm.display_time = new Date(val)
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.actionName = '编辑'
      this.isHidden = false
      this.aid = this.$route.query && this.$route.query.aid
      this.cid = this.$route.query.cid
      this.fetchData(this.aid)
    } else {
      this.showImageCates()
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route)
  },

  methods: {
    fetchData(aid) {
      this.loading = true
      detailImage(aid)
        .then((response) => {
          if (response.code === 20000) {
            this.showImageCates() // 查询分类列表
            this.postForm.image_title = response.data.title
            this.postForm.image_uri = this.$apiUrl + response.data.img_url
            this.image_uri = response.data.img_url
            // set tagsview title
            // this.setTagsViewTitle()

            // set page title
            this.setPageTitle()
          } else {
            this.loading = false
            return this.$message({
              message: response.message,
              type: 'error'
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
      this.loading = false
    },

    // setTagsViewTitle() {
    //   const title = this.lang === 'zh' ? '编辑文章' : 'Edit Article'
    //   const route = Object.assign({}, this.tempRoute, {
    //     title: `${title}-${this.postForm.id}`
    //   })
    //   this.$store.dispatch('tagsView/updateVisitedView', route)
    // },

    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title} - ${this.postForm.id}`
    },

    // 添加/编辑 图片
    submitForm() {
      this.$set(this.postForm, 'img', this.fileurl) // 将图片参数添加到当前postForm对象中
      if (this.cid === 0 || this.cid === '') {
        return this.$message({
          message: '请选择图片分类',
          type: 'error'
        })
      }
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.loading = true
            editImageBanner(
              this.aid,
              this.cid,
              this.postForm.image_title,
              this.image_uri
            ).then((response) => {
              if (response.code === 20000) {
                this.$notify({
                  title: '成功',
                  message: response.message,
                  type: 'success',
                  duration: response.code
                })
                this.postForm.status = 'published'
              }
              this.loading = false
            })
          } else {
            this.loading = true
            addBannerImage(
              this.cid,
              this.postForm.image_title,
              this.postForm.img
            ).then((response) => {
              if (response.code === 20001) {
                this.$notify({
                  title: '成功',
                  message: '新增图片成功',
                  type: 'success',
                  duration: 2000
                })
                this.postForm.status = 'published'
              }
              this.loading = false
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },

    // getRemoteUserList(query) {
    //   searchUser(query).then((response) => {
    //     if (!response.data.items) return
    //     this.userListOptions = response.data.items.map((v) => v.name)
    //   })
    // },

    // 添加分类
    // TODO 添加完成之后，刷新分类列表
    AddCate() {
      this.$prompt('请输入分类名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
        inputErrorMessage: '格式不正确'
      })
        .then(({ value }) => {
          this.loading = true
          addImageCategory(value).then((response) => {
            if (response.code === 20000) {
              this.$message({
                type: 'warning',
                message: response.message
              })
            } else {
              this.$message({
                type: 'success',
                message: response.message
              })
            }
            this.loading = false
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },

    // 显示分类列表
    showImageCates() {
      showImageCategory().then((response) => {
        if (response.code === 20000) {
          this.cateList = response.data
        } else {
          this.$message({
            type: 'warning',
            message: response.message
          })
        }
      })
    },

    // 接收selectOption传过来的name
    getCateName(msg) {
      this.cid = msg
    },

    // 接收图片上传子组件传过来的参数
    getfileUrl(fileurl) {
      this.fileurl = fileurl
      if (this.isEdit) {
        this.postForm.image_uri = this.$apiUrl + fileurl
        this.image_uri = fileurl
        this.imgKey = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;
  // .form-header {
  //   background: #d0d0d0;
  //   width: 100%;
  //   height: 100%;
  //   text-align: center;
  //   margin-top: 2px;
  //   padding: 10px 20px 10px 10px;
  // }
  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }
  .form-AddCate {
    margin-right: 10px;
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
