<template>
  <div class="app-container">
    <el-row>
      <Sticky :z-index="10" :class-name="'sub-navbar '+status">
        <SelectOption :options="cateList" @getCateName="getCateName" />
      </Sticky>
    </el-row>

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

      <el-table-column min-width="300px" align="center" label="Title">
        <template slot-scope="{row}">
          <!-- <router-link :to="'/article/edit/'+row.id" class="link-type"> -->
          <span>{{ row.article_title }}</span>
          <!-- </router-link> -->
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.created_at | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Actions" width="">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="goArticlePage(scope.row.id,scope.row.cid)">Edit</el-button>
          <el-button type="primary" size="small" icon="el-icon-delete" style="margin-left:5px;" @click="deleteAction(scope.row.id)">Del</el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- <el-table-column width="120px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column> -->

    <!-- <el-table-column width="100px" label="Importance">
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            icon-class="star"
            class="meta-item__icon"
          />
        </template>
      </el-table-column> -->

    <!-- <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">{{ row.status }}</el-tag>
        </template>
      </el-table-column> -->

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import Sticky from '@/components/Sticky' // 粘性header组件
import { showCates, fetchList, deleteArticle } from '@/api/article'
import Pagination from '@/components/Pagination'
import { SelectOption } from './Dropdown'
export default {
  name: 'ArticleList',
  components: { Pagination, SelectOption, Sticky },
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
        limit: 10,
        cid: 0
      },
      cateList: [{}]

    }
  },

  created() {
    // 显示分类列表
    showCates().then((response) => {
      if (response.code === 20000) {
        this.getList()
        this.cateList = response.data
      } else {
        this.$message({
          type: 'warning',
          message: response.message
        })
      }
    })
  },

  methods: {
    getCateName(msg) {
      this.listQuery.cid = msg
      this.getList()
    },

    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },

    deleteAction(aid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        deleteArticle(aid).then(response => {
          // TODO  删除成功后移除当前DOM元素
          if (response.code === 20001) {
            this.listLoading = false
            this.$message({
              type: 'success',
              message: response.message
            })
          } else {
            this.listLoading = false
            this.$message({
              type: 'warning',
              message: response.message
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 到文章编辑页面
    goArticlePage(aid, cid) {
      this.$router.push({ name: 'EditArticle', query: { aid: aid, cid: cid }})
    }
  }
}
</script>

<style lang="scss" scoped>

.app-container{
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
