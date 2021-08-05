<template>
  <el-select v-model="cid" placeholder="请选择分类" @change="getCategoryOptions">
    <el-option v-for="item in options" :key="item.cid" :label="item.name" :value="item.cid" />
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
    }
  },
  data() {
    return {
      cid: this.editcid
    }
  },
  methods: {
    getCategoryOptions() {
      this.$emit('getCateName', this.cid)
    }
  }

}
</script>
