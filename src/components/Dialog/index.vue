<template>
  <div class="Dialog">
    <!-- <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button> -->
    <el-button
      style="margin-left: 10px"
      type="warning"
      class="form-AddCate"
      @click="dialogFormVisible = true"
    >添加字典属性</el-button>

    <el-dialog
      title="定制属性"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :modal="modal"
      style="width: 77%; margin: 0 auto"
    >
      <el-form v-loading="loading" :model="form">
        <!-- <el-form-item label="上级分类" :label-width="formLabelWidth">
          <articleTree
            :options="optionsCategoryAdd"
            style="width:100%;"
            @getCateName="getCateName"
          />
        </el-form-item> -->

        <el-form-item label="字典类别" :label-width="formLabelWidth">
          <el-input
            v-model="form.category"
            autocomplete="off"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="字典编码" :label-width="formLabelWidth">
          <el-input
            v-model="form.code"
            autocomplete="off"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="类别描述" :label-width="formLabelWidth">
          <el-input
            v-model="form.dictionary"
            autocomplete="off"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import ArticleTree from '@/components/tree/ArticleTree'
import { addCates } from '@/api/article'

export default {
  components: {},
  props: {
    optionsCategoryAdd: {
      type: Object,
      default() {
        return []
      }
    },
    getArticleMethod: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        name: '',
        pid: -1,
        level: 0
      },
      formLabelWidth: '80px',
      modal: true
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    //   获取分类的id
    getCateName(obj) {
      if (obj[0].data.pid >= 0) {
        this.form.pid = obj[0].data.value
      }
      this.form.level = obj[0].data.level
    },

    // 提交添加分类
    submit() {
      this.loading = true
      addCates(this.form).then((Response) => {
        if (Response.code === 20000) {
          this.$message({
            type: 'warning',
            message: Response.message
          })
        } else {
          this.$message({
            type: 'success',
            message: Response.message
          })
        }

        if (this.getArticleMethod) {
          this.getArticleMethod()
        }

        this.dialogFormVisible = false
        this.loading = false
      })
    }
  }
}
</script>
<style  lang='scss' scoped>
.Dialog {
  float: right;
}
</style>
