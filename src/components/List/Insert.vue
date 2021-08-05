<template>
  <div class="list">
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column
        align="center"
        prop="category"
        :label="propOne"
        width="180"
      />
      <el-table-column
        align="center"
        prop="category_code"
        :label="propTwo"
        width="180"
      />
      <el-table-column
        align="center"
        prop="category_address"
        :label="propThree"
      />
      <el-table-column align="center" prop="category_name" :label="propFour" />
    </el-table>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    tableData: {
      type: Array,
      required: true
    },
    listprop: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      propOne: '',
      propTwo: '',
      propThree: '',
      propFour: '',
      propFive: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    this.propOne = this.listprop.one
    this.propTwo = this.listprop.two
    this.propThree = this.listprop.three
    this.propFour = this.listprop.four
    this.propFive = this.listprop.five
  },
  mounted() {},
  beforeCreate() {},
  beforeMount() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  activated() {},
  methods: {}
}
</script>

<style  lang='scss' scoped>
</style>
