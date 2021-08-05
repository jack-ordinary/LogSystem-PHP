<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="50px" align="center" label="姓名">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="50px" align="center" label="手机号">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="50px" align="center" label="QQ号">
        <template slot-scope="{row}">
          <span v-if="row.QQ_Account!==null">{{ row.QQ_Account }}</span>
          <span v-else-if="row.QQ_Account==null">无</span>
        </template>
      </el-table-column>

      <el-table-column min-width="50px" align="center" label="邮箱">
        <template slot-scope="{row}">
          <span v-if="row.email!==null">{{ row.email }}</span>
          <span v-else-if="row.email==null">无</span>
        </template>
      </el-table-column>

      <el-table-column min-width="80px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" min-width="50">
        <template slot-scope="{row,$index}">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-delete"
            style="margin-left:5px;"
            @click="deleteAction(row.id,$index)"
          >Del</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <el-table-column width="120px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
    </el-table-column>-->

    <!-- <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </template>
    </el-table-column>-->

    <!-- <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
        </template>
    </el-table-column>-->

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getApplyList"
    />
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { showApplyList, destory } from '@/api/apply'
import Pagination from '@/components/Pagination'

export default {
  name: 'ArticleList',
  components: { Pagination, Sticky },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      status: 'normal',
      list: null,
      total: 0,
      listLoading: true,
      centerDialogVisible: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      cateList: [{}],
      activeClass: -1
    }
  },

  created() {
    // 显示表单列表
    this.getApplyList()
  },

  methods: {
    getApplyList() {
      this.listLoading = true
      showApplyList(this.listQuery).then((response) => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },

    deleteAction(aid, index) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
        //   this.listLoading = true
          destory(aid).then((response) => {
            // TODO  删除成功后移除当前DOM元素
            if (response.code === 20001) {
            //   this.listLoading = false
              //   this.$message({
              //     type: 'success',
              //     message: response.message
              //   })
              this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success',
                duration: 2000
              })
              this.list.splice(index, 1)
            } else {
            //   this.listLoading = false
              this.$message({
                type: 'warning',
                message: response.message
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  position: relative;
  //  .form-header {
  //     background: #d0d0d0;
  //     width: 105%;
  //     height: 100%;
  //     text-align: left;
  //     margin:-20px 0px 10px -20px;
  //     padding: 10px 20px 10px 10px;
  //   }

  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
}
</style>
