<template>
  <el-select
    v-model="cid"
    :placeholder="placeholderValue"
    clearable
    filterable
    @change="getCategoryOptions"
  >
    <el-option
      v-for="item in options"
      :key="item.cid"
      :label="item.CateCodeName"
      :value="item.CateCode"
    />
  </el-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      default() {
        return []
      }
    },
    editcid: {
      type: String,
      default: ''
    },
    placeholderValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      cid: this.editcid
    }
  },
  methods: {
    getCategoryOptions() {
      // alert(this.cid)
      if (this.cid === 2) {
        this.editcid = {}
        // alert(this.cid)
      }
      this.$emit('getCateName', this.cid)
    }
  }
}
</script>
