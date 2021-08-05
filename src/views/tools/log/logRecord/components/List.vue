<template>
  <div
    v-loading="listLoading"
    class="app-container"
    element-loading-text="拼命加载中"
  >
    <el-row>
      <Sticky :z-index="10" :class-name="'sub-navbar ' + status">
        <!-- 渠道商搜索-->
        <SelectOption
          class="ChannelType"
          :options="ChannelCateList"
          :editcid="ChannelCateList[0].CateCode"
          :placeholder-value="placeholderValueChannel"
          @getCateName="getCateNameChannel"
        />

        <!-- 城市 -->
        <!-- <SelectOption
          style="float: left; margin-left: 10px"
          :options="CityCateList"
          :editcid="CityCateList[0].CateCode"
          :placeholder-value="placeholderValueCity"
          @getCateName="getCateNameCity"
        /> -->

        <!-- api -->
        <!-- <SelectOption
          class="apiSearch"
          :options="ApiCateList"
          :placeholder-value="placeholderValueApi"
          @getCateName="getCateNameApi"
        /> -->

        <!-- api -->
        <div class="apiSearch">
          <el-select
            v-model="listQuery.ApiType"
            :placeholder="placeholderValue"
            clearable
            filterable
            @change="getCateNameApi"
          >
            <el-option
              v-for="item in ApiCateList"
              :key="item.CateCode"
              :label="item.CateCodeName"
              :value="item.CateCode"
            />
          </el-select>
        </div>

        <!-- SearchContent -->
        <div class="inputSearch">
          <el-input
            v-model="listQuery.startPointName"
            placeholder="请输入要搜索的起始地址"
            clearable
          />
        </div>

        <div class="timeConsumingSearch">
          <el-input
            v-model="listQuery.DataTimeConsuming"
            placeholder="数据请求时间(ms)"
            clearable
          />
        </div>

        <div class="OrderNumberSearch">
          <el-input
            v-model="listQuery.OrderSn"
            placeholder="订单号搜索"
            clearable
          />
        </div>

        <!-- 日期 -->
        <div class="DateNumberSearch">
          <DatePicker
            style="width: 20%; float: left; margin-left: 10px"
            @getDate="getDate"
          />
        </div>

        <!-- data -->
        <!-- <SelectOption
          style="float: left; margin-left: 10px"
          :options="CityCateList"
          :placeholder-value="placeholderValueData"
          @getCateName="getCateName"
        /> -->
        <!-- res -->
        <!-- <SelectOption
          :options="CityCateList"
          :placeholder-value="placeholderValueRes"
          @getCateName="getCateName"
        /> -->

        <el-button
          class="buttonStyle"
          type="success"
          @click="getSearchContent"
        >搜一下</el-button>

        <!-- 数据条数 -->
        <div class="AllNumStyle">数据量：{{ totalReal }}</div>

        <div style="float: right; margin-top: 10px">
          <el-switch
            v-model="listQuery.test"
            style="display: block"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="测试"
            inactive-text="正式"
            @change="test()"
          />
        </div>
      </Sticky>
    </el-row>

    <el-table
      class="tablebox"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column type="index" width="" />
      <el-table-column align="center" label="API名称" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.api }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="订单号" width="">
        <template slot-scope="scope">
          <span>{{ scope.row.order_number }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="400" label="GetData数据">
        <template slot-scope="{ row }">
          <span>{{ row.data }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" width="370" label="ReturnData数据">
        <!-- :show-overflow-tooltip="true" -->
        <template slot-scope="{ row }" style="height: 100px">
          <textarea
            id=""
            class="textarea_return_data"
            name=""
            cols="30"
            rows="10"
            readonly="readonly"
          >
          {{ row.res }}
          </textarea>
          <!-- <span>{{ row.res }}</span> -->
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        width=""
        label="DataTimeConsuming耗时(ms)"
      >
        <template slot-scope="{ row }">
          <span> {{ parseFloat(row.data_time_consuming).toFixed(2) }}</span>
        </template>
      </el-table-column>

      <el-table-column width="" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ (scope.row.ctime * 1000) | formatDate }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column align="center" label="Actions" width>
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="goImagePage(scope.row.id, scope.row.cid)"
          >Edit</el-button>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-delete"
            style="margin-left: 5px"
            @click="deleteAction(scope.row.id)"
          >Del</el-button>
        </template>
      </el-table-column> -->
    </el-table>

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
import Sticky from '@/components/Sticky' // 粘性header组件
import {
  showImageCategory,
  showImageBanner,
  delImageBanner
} from '@/api/images'
import Pagination from '@/components/Pagination'
import DatePicker from '@/components/DatePicker'
import { SelectOption } from './Dropdown'
import {
  ShowMongoLog,
  GetChannelCityCategory,
  ShowApiTypeList
} from '@/api/log'

export default {
  name: 'ArticleList',
  components: { Pagination, SelectOption, Sticky, DatePicker },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    formatDate(timestamp) {
      // 将时间戳转换成正常时间格式
      var date = new Date(timestamp) // 时间戳为10位需/1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-'
      var M =
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m =
        (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) +
        ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    }
  },
  data() {
    return {
      status: 'normal',
      list: [{}],
      total: 0,
      totalReal: '',
      listLoading: false,
      centerDialogVisible: false,
      listQuery: {
        page: 1,
        limit: 10,
        cid: 0,
        LogType: 0,
        CityCode: '',
        ApiType: '',
        startPointName: '',
        date: '',
        test: false
      },
      // 渠道分类列表
      ChannelCateList: [
        { CateCode: 0, CateCodeName: '美团' },
        // { CateCode: 1, CateCodeName: '同城' },
        { CateCode: 2, CateCodeName: '够谱' },
        // { CateCode: 3, CateCodeName: '自由行' },
        { CateCode: 4, CateCodeName: '首汽' },
        { CateCode: 5, CateCodeName: '哈罗' }
      ],
      // 城市列表
      CityCateList: [
        { CateCode: 30, CateCodeName: '深圳' },
        { CateCode: 40, CateCodeName: '青岛' },
        { CateCode: 50, CateCodeName: '杭州' }
      ],
      // API埋点
      ApiCateList: [
        // { CateCode: 30, CateCodeName: 'API' },
        // { CateCode: 40, CateCodeName: 'GetData' },
        // { CateCode: 50, CateCodeName: 'ReturnData' }
      ],
      placeholderValueChannel: '请选择渠道商',
      placeholderValueCity: '请选择城市',
      placeholderValueApi: '请选择搜索API的类型',
      // placeholderValueData: '请输入Data数据',
      // placeholderValueRes: '请输入返回的数据',
      imgBaseUrl: ''
    }
  },

  mounted() {
    // 获取日志列表
    this.getLogDataList(this.listQuery)

    // 获取渠道商分类，以及城市列表
    // this.getChannelCityCategory()

    // 获取Api条件的搜索列表
    this.getApiTypeList(0)
  },

  methods: {
    getList() {
      this.getLogDataList(this.listQuery)
    },

    getDate(msg) {
      this.listQuery.date = msg
    },

    // 获取日志列表
    getLogDataList(data) {
      this.listLoading = true
      ShowMongoLog(data).then((response) => {
        if (response.code === 20000) {
          this.list = response.data
          this.total = response.count
          this.totalReal = this.numberFormat(response.count)
        } else {
          this.$message({
            type: 'warning',
            message: response.message
          })
        }
        this.listLoading = false
      })
    },

    // 获取渠道商分类，以及城市列表
    // getChannelCityCategory() {
    //   GetChannelCityCategory().then((response) => {
    //     if (response.code === 20000) {
    //       console.log('TODO....')
    //     } else {
    //       this.$message({
    //         type: 'warning',
    //         message: response.message
    //       })
    //     }
    //   })
    // },

    // 获取Api条件的搜索列表
    getApiTypeList(type) {
      ShowApiTypeList({
        LogType: type
      }).then((response) => {
        if (response.code === 20000) {
          this.ApiCateList = response.data
          this.listQuery.ApiType = this.ApiCateList[0].CateCode
        } else {
          this.$message({
            type: 'warning',
            message: response.message
          })
        }
      })
    },

    // 获取搜索结果
    getSearchContent() {
      this.getLogDataList(this.listQuery)
    },

    getCateNameChannel(type) {
      this.listQuery.LogType = type
      this.getApiTypeList(type)
    },

    getCateNameCity(msg) {
      this.listQuery.CityCode = msg
    },

    getCateNameApi(msg) {
      this.listQuery.ApiType = msg
    },

    numberFormat(arg) {
      if (arg.toString().length > 4) {
        const total = arg / 10000
        const realVal = parseFloat(total).toFixed(5)
        return realVal + '万'
      } else if (arg.toString().length >= 9) {
        const total = arg / 1000000000
        const realVal = parseFloat(total).toFixed(5)
        return realVal + '亿'
      } else if (arg.toString().length >= 13) {
        const total = arg / 10000000000000
        const realVal = parseFloat(total).toFixed(5)
        return realVal + '万亿'
      } else {
        return arg
      }
    }

    // deleteAction(aid) {
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       this.listLoading = true
    //       delImageBanner(aid).then((response) => {
    //         // TODO  删除成功后移除当前DOM元素
    //         if (response.code === 20001) {
    //           this.listLoading = false
    //           this.$message({
    //             type: 'success',
    //             message: response.message
    //           })
    //         } else {
    //           this.listLoading = false
    //           this.$message({
    //             type: 'warning',
    //             message: response.message
    //           })
    //         }
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // },

    // 到文章编辑页面
    // goImagePage(aid, cid) {
    //   this.$router.push({ name: 'EditImage', query: { aid: aid, cid: cid }})
    // }
  }
}
</script>

<style>
.el-table--enable-row-hover .el-table__body tr:hover .textarea_return_data {
  background-color: #f5f7fa !important;
  overflow: auto !important;
}
.el-switch__label.is-active {
  color: #ffffff;
}
</style>

<style lang="scss" scoped>
.app-container {
  position: relative;
  // .form-header {
  //   background: #d0d0d0;
  //   width: 105%;
  //   height: 100%;
  //   text-align: left;
  //   margin: -20px 0px 10px -20px;
  //   padding: 10px 20px 10px 10px;
  // }

  .tablebox {
    .textarea_return_data {
      font-size: 14px;
      color: #606266;
      width: 100%;
      height: 150px;
      border: none;
      outline: none;
      resize: none;
      background: #fff;
      overflow: hidden;
    }
  }
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }

  .ChannelType {
    min-width: 10%;
    float: left;
    margin-left: 10px;
  }

  .apiSearch {
    min-width: 20%;
    float: left;
    margin-left: 10px;
  }

  .inputSearch {
    min-width: 18%;
    float: left;
    margin-left: 10px;
  }

  .apiSearch {
    min-width: 15%;
    float: left;
    margin-left: 10px;
  }

  .timeConsumingSearch {
    width: 15%;
    float: left;
    margin-left: 10px;
  }

  .AllNumStyle {
    // width: 10%;
    // height: 50px;
    // background: red;
    float: left;
    margin-left: 10px;
    font-size: 16px;
    color: rgb(245, 231, 216);
    font-weight: 600;
  }

  .OrderNumberSearch {
    width: 18%;
    display: block;
    float: left;
    margin-left: 10px;
  }
  .DateNumberSearch {
    display: block;
    float: left;
  }
  .buttonStyle {
    // width: 7%;
    float: left;
    margin-left: 10px;
    margin-top: 7px;
  }
  // 开关字体颜色
}
</style>
