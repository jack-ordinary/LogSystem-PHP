<!--
 * @Description:
 * @version:
 * @Author: JackLong
 * @Date: 2021-02-07 13:33:04
 * @LastEditors: JackLong
 * @LastEditTime: 2021-08-06 10:20:06
-->
<template>
  <div class="date-picker">
    <el-date-picker
      v-model="value2"
      value-format="timestamp"
      type="datetimerange"
      :picker-options="pickerOptions"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
      @change="getDate"
    />
  </div>
</template>
<script>
export default {
  name: 'DatePicker',
  components: {},
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '当天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 0)
              end.setTime(end.getTime() + 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
              // 测试
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: ''
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
    getDate(date) {
      this.$emit('getDate', date)
    }
  }
}
</script>
<style  lang='scss' scoped>
</style>
