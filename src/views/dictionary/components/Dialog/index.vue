<template>
  <div class="Dialog">
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
        <el-form-item label="字典类别" :label-width="formLabelWidth">
          <SelectOption
            :options="channelList"
            :editcid="cid"
            @getCateName="getCateName"
          />
        </el-form-item>

        <el-form-item label="字典编码" :label-width="formLabelWidth">
          <el-input
            v-model="form.CategoryCode"
            autocomplete="off"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="字典地址" :label-width="formLabelWidth">
          <el-input
            v-model="form.CategoryAddress"
            autocomplete="off"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item label="类别描述" :label-width="formLabelWidth">
          <el-input
            v-model="form.CategoryDescribe"
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
import SelectOption from '@/components/List/Select'
import { InsertCategory } from '@/api/dictionary'
import Vue from 'vue'
import { GetDictionaryData } from '@/api/dictionary'

export default {
  components: { SelectOption },
  props: {
    dictionaryType: {
      type: Object,
      default() {
        return []
      }
    },
    callBackMethod: {
      type: Function,
      default: null
    },
    lastCategoryCode: {
      type: Object,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        CategoryName: 'api',
        CategoryCode: '',
        name: '',
        pid: -1,
        level: 0
      },
      formLabelWidth: '80px',
      modal: true,
      channelList: [
        {
          cid: 0,
          name: 'api'
        },
        {
          cid: 1,
          name: 'data'
        },
        {
          cid: 2,
          name: 'res'
        }
      ],
      cid: 0
    }
  },
  computed: {},
  watch: {
    dialogFormVisible: {
      handler() {
        this.GetDictionaryData()
      }
    }
  },
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
    // getCateName(obj) {
    //   if (obj[0].data.pid >= 0) {
    //     this.form.pid = obj[0].data.value
    //   }
    //   this.form.level = obj[0].data.level
    // },

    // 提交添加分类
    submit() {
      this.$set(this.form, 'ChannelType', this.dictionaryType)
      InsertCategory(this.form).then((Response) => {
        this.loading = true
        if (Response.code === 20000) {
          this.$message({
            type: 'success',
            message: Response.message
          })
        }
        if (Response.code === 40000) {
          this.loading = false
          return this.$message({
            type: 'warning',
            message: Response.message
          })
        }

        if (this.callBackMethod) {
          this.callBackMethod()
        }

        this.dialogFormVisible = false
        this.loading = false
      })
    },

    // 接收selectOption传过来的name
    getCateName(msg) {
      this.form.CategoryName = this.channelList[msg].name
    },

    // 获取字典数据
    GetDictionaryData() {
      this.form.CategoryCode = Vue.ls.get('lastCategoryCode')
      GetDictionaryData(this.postData).then((response) => {
        if (response.code === 20000) {
          this.lastCategoryCode = parseInt(this.tableData[0].category_code) + 1

          if (this.lastCategoryCode > Vue.ls.get('lastCategoryCode')) {
            Vue.ls.remove('lastCategoryCode')
            Vue.ls.set('lastCategoryCode', this.lastCategoryCode, 60 * 60 * 10)
          }

          // this.$message({
          //   type: 'success',
          //   message: response.message
          // })
        } else {
          this.$message({
            type: 'warning',
            message: response.message
          })
        }
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
