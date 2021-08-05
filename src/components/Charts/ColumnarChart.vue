<template>
  <div class="columnar-chart">
    <div id="main" />
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.test()
  },
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {
    test() {
      const myChart = this.$echarts.init(document.getElementById('main'))
      myChart.setOption({
        title: {
          text: '订单量趋势'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 450, 80, 70, 110, 130],
            type: 'bar',
            showBackground: false,
            itemStyle: {
              normal: {
                color: function(params) {
                  // 注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                  var colorList = [
                    '#c23531',
                    '#2f4554',
                    '#61a0a8',
                    '#d48265',
                    '#91c7ae',
                    '#749f83',
                    '#ca8622'
                  ]
                  return colorList[params.dataIndex]
                }
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style  lang='scss' scoped>
.columnar-chart {
  background: #fff;
  #main {
    width: auto;
    height: 400px;
    margin-top: 15px;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
