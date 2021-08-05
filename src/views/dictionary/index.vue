<template>
  <div v-loading="loading" class="dictionary">
    <Sticky :z-index="10" :class-name="'sub-navbar ' + status">
      <SelectOption
        :options="channelList"
        :editcid="cid"
        @getCateName="getCateName"
      />

      <!-- <el-button
        type="success"
        style="margin: 5px 0px 0px 10px; float: right"
      >搜一下</el-button> -->

      <!-- 添加字典属性 -->
      <DialogAddCategory
        style="float: right"
        :dictionary-type="cid"
        :call-back-method="GetDictionaryData"
        :last-category-code="lastCategoryCode"
      />
    </Sticky>

    <!-- show list -->
    <list-insert :table-data="tableData" :listprop="ListProp" />

    <!-- 分页 -->
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import ListInsert from '@/components/List/Insert'
import SelectOption from '@/components/List/Select'
import Sticky from '@/components/Sticky' // 粘性header组件
import DialogAddCategory from './components/Dialog/index'
import Pagination from '@/components/Pagination'

import { GetDictionaryData } from '@/api/dictionary'
import Vue from 'vue'

export default {
  name: 'ShowList',
  components: {
    ListInsert,
    Sticky,
    SelectOption,
    DialogAddCategory,
    Pagination
  },
  data() {
    return {
      status: 'none',
      isHidden: true,
      ListProp: {
        one: '字典类别',
        two: '编码',
        three: '地址',
        four: '描述',
        five: '待定'
      },
      tableData: [
        {
          category: '',
          category_code: 0,
          category_address: '',
          category_name: ''
        }
      ],
      channelList: [
        {
          cid: 0,
          name: '美团'
        },
        {
          cid: 1,
          name: '同城'
        },
        {
          cid: 2,
          name: '够谱'
        },
        {
          cid: 3,
          name: '自由行'
        },
        {
          cid: 4,
          name: '首汽'
        },
        {
          cid: 5,
          name: '哈罗'
        }
      ],
      cid: 0,
      lastCategoryCode: 0,
      postData: {
        ChannelType: 0,
        page: 1,
        limit: 10
      },
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  mounted() {},
  created() {
    // 获取字典数据
    this.GetDictionaryData()
  },
  methods: {
    getList() {
      this.$set(this.postData, 'limit', this.listQuery.limit)
      this.$set(this.postData, 'page', this.listQuery.page)
      this.GetDictionaryData()
    },

    // 获取字典数据
    GetDictionaryData() {
      GetDictionaryData(this.postData).then((response) => {
        if (response.code === 20000) {
          this.tableData = response.data
          this.total = response.count

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
    },

    // 接收selectOption传过来的name
    getCateName(msg) {
      this.cid = msg
      alert(this.cid)
      this.postData.ChannelType = msg
      this.GetDictionaryData()
    }
  }
}
</script>

