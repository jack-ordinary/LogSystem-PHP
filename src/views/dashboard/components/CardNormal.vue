<template>
  <div class="card-normal">
    <el-row :gutter="20">
      <el-col v-for="nav in title" :key="nav.key" :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button style="float: left; padding: 10px" type="primary">{{
              nav.title
            }}</el-button>
            <el-button
              style="float: left; padding: 10px"
              type="warning"
              @click="RefleshCache"
            >更新缓存</el-button>
          </div>
          <div class="text item">
            <el-button type="success">日</el-button>
            <div class="item_order_sum">{{ nav.TodayAmount }} 单</div>
          </div>
          <!-- <div class="text item">
            <el-button type="primary">周</el-button>
            <div class="item_order_sum">{{ nav.WeekAmount }} 单</div>
          </div>
          <div class="text item">
            <el-button type="danger">月</el-button>
            <div class="item_order_sum">{{ nav.MonthAmount }} 单</div>
          </div> -->

          <div
            style="
              width: 100%;
              height: 1px;
              border: none;
              float: left;
              background: #dcdfe6;
              margin-bottom: 10px;
            "
          />

          <div class="order_data">
            <el-button size="mini" type="primary">派单数量</el-button>
            {{ nav.GetSendOrderAmount }} 单
          </div>
          <div class="order_data">
            <el-button size="mini" type="primary">推送成功</el-button>
            {{ nav.GetPushOrderAmount }} 单
          </div>
          <div class="order_data">
            <el-button size="mini" type="success">付款完成</el-button>
            {{ nav.GetFinishOrderAmount }} 单
          </div>
          <!-- <div class="order_data">
            <el-button size="mini" type="info">待付款</el-button>
            {{ nav.MonthAmount }} 单
          </div> -->
          <div class="order_data">
            <el-button size="mini" type="warning">无人接单</el-button>
            {{ nav.GetNoDriverTakeOrderAmount }} 单
          </div>
          <div class="order_data">
            <el-button size="mini" type="warning">司机取消</el-button>
            {{
              nav.GetDriverCancelOrderAmount
                ? nav.GetDriverCancelOrderAmount
                : 0
            }}
            单
          </div>
          <div class="order_data">
            <el-button size="mini" type="danger">乘客取消</el-button>
            {{ nav.GetPassengerCancelOrderAmount }} 单
          </div>
          <div class="order_data">
            <el-button size="mini" type="danger">竞争失败</el-button>
            {{ nav.GetPKFailCancelOrderAmount }} 单
          </div>
          <div style="width: 100%">
            日同比 {{ nav.DayRate }} <i class="el-icon-caret-top" /> 周同比{{
              nav.WeekRate
            }}
            <i class="el-icon-caret-bottom" />
          </div>
          <el-divider />
          <el-row>
            <el-col :span="12"> 总订单量 </el-col>
            <el-col :span="12" style="text-align: right">
              {{ nav.HistoryAmount / 10000 }}万
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetAllOrderAmount } from '@/api/order'
export default {
  components: {},
  props: {
    title: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
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
    testClick() {
      GetAllOrderAmount()
    },
    RefleshCache() {}
  }
}
</script>

<style  lang='scss' scoped>
.card-normal {
  .el-col {
    margin-bottom: 18px;
    .box-card {
      width: 95%;
    }
    .text {
      width: 100%;
      height: 100%;
      float: left;
    }
    .item {
      margin-bottom: 18px;
      .el-button {
        float: left;
        padding: 10px 10px 10px 10px;
        margin-right: 10px;
      }
      .item_order_sum {
        font-size: 30px;
      }
    }
    .clearfix:before,
    .clearfix:after {
      display: table;
      content: "";
    }
    .clearfix:after {
      clear: both;
    }
    .order_data {
      .el-button {
        margin-bottom: 10px;
        font-size: 14px;
      }
      font-size: 20px;
      font-weight: 500;
    }
  }
}
</style>
