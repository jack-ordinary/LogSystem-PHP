<template>
  <div class="app-container">
    <el-form ref="form" v-loading="loading" :model="form" label-width="120px">
      <el-form-item label="联系电话">
        <el-input v-model="form.phone" />
      </el-form-item>

      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>

      <el-form-item label="QQ号">
        <el-input v-model="form.QQ_Account" />
      </el-form-item>

      <el-form-item label="外宣二维码">
        <Upload :key="imgKey" v-model="image_uri" @getfileUrl="getfileUrl" />
      </el-form-item>

      <el-form-item label="公司地址">
        <el-input v-model="form.address" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
    </el-form></el-form></div>
</template>

<script>
import Upload from '@/components/Upload/SingleImage'
import { showCompanyInfo, storeCompanyInfo } from '@/api/companyInfo'

export default {
  components: {
    Upload
  },
  data() {
    return {
      loading: false,
      form: {
        id: 0,
        phone: '',
        email: '',
        QQ_Account: '',
        qr_code: '',
        address: ''
      },
      image_uri: ''
    }
  },

  created() {
    this.showData()
  },

  methods: {
    onSubmit() {
      // TODO  表单规则验证
      this.loading = true
      storeCompanyInfo(this.form).then(Response => {
        if (Response.code === 20001) {
          this.$message({
            type: 'success',
            message: Response.message
          })
        }
        this.loading = false
      })
    },
    onCancel() {
      this.$message({
        message: '取消!',
        type: 'warning'
      })
    },

    showData() {
      this.loading = true
      showCompanyInfo().then(Response => {
        if (Response.code === 20000) {
          this.form.id = Response.data.id
          this.form.phone = Response.data.phone
          this.form.email = Response.data.email
          this.form.QQ_Account = Response.data.QQ_Account
          this.form.qr_code = Response.data.qr_code
          this.form.address = Response.data.address
          this.image_uri = this.$apiUrl + Response.data.qr_code
        }
        this.loading = false
      })
    },

    // 接收图片上传子组件传过来的参数
    getfileUrl(fileurl) {
      this.form.qr_code = fileurl
      this.image_uri = this.$apiUrl + fileurl
      // if (this.isEdit) {
      //   // this.postForm.image_uri = this.$apiUrl + fileurl
      //   this.imgKey = true
      // }
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

