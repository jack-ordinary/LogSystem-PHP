<template>
  <div v-loading="listLoading" class="dashboard-container">
    <!-- <div class="dashboard-text">{{ name }}</div> -->
    <card-normal :title="titleValueMTs" />
    <columnar-chart />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ColumnarChart from '../../components/Charts/ColumnarChart' // 柱状图
import CardNormal from './components/CardNormal'
import { GetOrderDataReport, GetOrderAmountMonth } from '@/api/order'

export default {
  name: 'Dashboard',
  components: { ColumnarChart, CardNormal },
  data() {
    return {
      postForm: '',
      listLoading: false,
      titleValueMTs: [
        {
          title: '美团订单',
          TodayAmount: 0,
          WeekAmount: 0,
          MonthAmount: 0,
          DayRate: '14%',
          WeekRate: '12%',
          GetSendOrderAmount: 0,
          GetPushOrderAmount: 0,
          GetFinishOrderAmount: 0,
          GetNoDriverTakeOrderAmount: 0,
          GetDriverCancelOrderAmount: 0,
          GetPassengerCancelOrderAmount: 0,
          GetPKFailCancelOrderAmount: 0,
          HistoryAmount: 37600
        },
        {
          title: '够谱订单',
          TodayAmount: 0,
          WeekAmount: 0,
          MonthAmount: 0,
          DayRate: '14%',
          WeekRate: '12%',
          GetSendOrderAmount: 0,
          GetPushOrderAmount: 0,
          GetFinishOrderAmount: 0,
          GetNoDriverTakeOrderAmount: 0,
          GetDriverCancelOrderAmount: 0,
          GetPassengerCancelOrderAmount: 0,
          GetPKFailCancelOrderAmount: 0,
          HistoryAmount: 37600
        },
        {
          title: '首汽订单',
          TodayAmount: 0,
          WeekAmount: 0,
          MonthAmount: 0,
          DayRate: '14%',
          WeekRate: '12%',
          GetSendOrderAmount: 0,
          GetPushOrderAmount: 0,
          GetFinishOrderAmount: 0,
          GetNoDriverTakeOrderAmount: 0,
          GetDriverCancelOrderAmount: 0,
          GetPassengerCancelOrderAmount: 0,
          GetPKFailCancelOrderAmount: 0,
          HistoryAmount: 37600
        },
        {
          title: '曹操订单',
          TodayAmount: 0,
          WeekAmount: 0,
          MonthAmount: 0,
          DayRate: '14%',
          WeekRate: '12%',
          GetSendOrderAmount: 0,
          GetPushOrderAmount: 0,
          GetFinishOrderAmount: 0,
          GetNoDriverTakeOrderAmount: 0,
          GetDriverCancelOrderAmount: 0,
          GetPassengerCancelOrderAmount: 0,
          GetPKFailCancelOrderAmount: 0,
          HistoryAmount: 37600
        }
      ],
      LogType: {
        LogTypeMT: { LogType: 0 },
        LogTypeGP: { LogType: 2 },
        LogTypeSQ: { LogType: 4 }
      },
      index: 0
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {},
  mounted() {
    // 美团数据
    this.getOrderDataAmount(this.LogType.LogTypeMT)

    // 够谱数据
    this.getOrderDataAmount(this.LogType.LogTypeGP)

    // 首汽数据
    this.getOrderDataAmount(this.LogType.LogTypeSQ)

    // 获取--美团--当日订单报告数据
    this.getGetOrderDataReport(this.LogType.LogTypeMT)

    // 获取--够谱--当日订单报告数据
    this.getGetOrderDataReport(this.LogType.LogTypeGP)

    // 获取--首汽--当日订单报告数据
    this.getGetOrderDataReport(this.LogType.LogTypeSQ)
  },
  methods: {
    // 获取--美团/够谱/首汽--当日订单总数
    getOrderDataAmount(LogType) {
      this.listLoading = true
      GetOrderAmountMonth(LogType).then((response) => {
        if (response.code === 20000) {
          this.listLoading = false

          const that = this
          if (LogType.LogType === this.LogType.LogTypeMT.LogType) {
            that.index = 0
          }
          if (LogType.LogType === this.LogType.LogTypeGP.LogType) {
            that.index = 1
          }
          if (LogType.LogType === this.LogType.LogTypeSQ.LogType) {
            that.index = 2
          }
          var index = that.index

          this.titleValueMTs[index].TodayAmount =
            response.data.OrderAmountToday
          this.titleValueMTs[index].WeekAmount = response.data.OrderAmountWeek
          this.titleValueMTs[index].MonthAmount =
            response.data.OrderAmountMonth
        }
        this.listLoading = false
      })
    },

    // 获取--美团--当日订单报告数据
    getGetOrderDataReport(LogType) {
      this.listLoading = true
      GetOrderDataReport(LogType).then((response) => {
        if (response.code === 20000) {
          this.listLoading = false

          const that = this
          if (LogType.LogType === this.LogType.LogTypeMT.LogType) {
            this.index = 0
          }
          if (LogType.LogType === this.LogType.LogTypeGP.LogType) {
            this.index = 1
          }
          if (LogType.LogType === this.LogType.LogTypeSQ.LogType) {
            this.index = 2
          }
          var index = that.index

          this.titleValueMTs[index].GetSendOrderAmount = response.data
            .GetSendOrderAmount
            ? response.data.GetSendOrderAmount
            : 0
          this.titleValueMTs[index].GetPushOrderAmount = response.data
            .GetPushOrderAmount
            ? response.data.GetPushOrderAmount
            : 0
          this.titleValueMTs[index].GetFinishOrderAmount = response.data
            .GetFinishOrderAmount
            ? response.data.GetFinishOrderAmount
            : 0
          this.titleValueMTs[index].GetNoDriverTakeOrderAmount = response.data
            .GetNoDriverTakeOrderAmount
            ? response.data.GetNoDriverTakeOrderAmount
            : 0
          this.titleValueMTs[index].GetDriverCancelOrderAmount = response.data
            .GetDriverCancelOrderAmount
            ? response.data.GetDriverCancelOrderAmount
            : 0
          this.titleValueMTs[index].GetPassengerCancelOrderAmount = response
            .data.GetPassengerCancelOrderAmount
            ? response.data.GetPassengerCancelOrderAmount
            : 0
          this.titleValueMTs[index].GetPKFailCancelOrderAmount = response.data
            .GetPKFailCancelOrderAmount
            ? response.data.GetPKFailCancelOrderAmount
            : 0
        }
        this.listLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  height: 100%;
  background: #f5f7f9;
  padding: 20px;
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
