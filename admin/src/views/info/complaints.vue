<template>
  <div class="app-container">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="请输入关键字">
        <el-input v-model="formInline.keyWords" placeholder="关键字" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      style="width: 100%"
      stripe
      border
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="createdTime" label="发布时间" sortable width="180" />
      <el-table-column prop="title" label="标题" width="230" :show-overflow-tooltip="true" />
      <el-table-column prop="nickName" label="发布人" width="180" />
      <el-table-column prop="status" label="状态" width="180" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">撤回</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      size="10"
      style="margin: 20px auto"
      @current-change="currentPage"
    />
  </div>
</template>

<script>
import { getInfo, modifyStatus, delInfo, searchInfo } from '@/api/info'
export default {
  name: '',

  components: {},
  data() {
    return {
      formInline: {
        keyWords: ''
      },
      total: 0,
      tableData: [],
      pageParams: {
        category: 4,
        currentPage: 1,
        showCount: 10
      },
      isSearch: false
    }
  },

  computed: {},

  mounted() {
    this.getInfo()
  },

  methods: {
    async onSubmit() {
      // 为空加载所有数据
      if (this.formInline.keyWords === '') {
        this.getInfo()
        this.isSearch = false
        this.$message({
          type: 'warning',
          message: '请输入关键字',
          duration: 1000
        })
        return
      }

      const searchParams = JSON.parse(JSON.stringify(this.pageParams))
      searchParams.key = this.formInline.keyWords

      //  发送搜索请求
      const { data, total } = await searchInfo(searchParams)

      if (data.length === 0) {
        this.$message('没有找到你想要的信息')
        return
      }
      this.isSearch = true
      data.forEach((item, index) => {
        item.createdTime = item.createdTime.split('T')[0]
        item.status = item.status === 1 ? '已发布' : '已撤回'
      })
      if (data.length === 0) {
        this.$message('没有找到你想要的信息')
        return
      }
      this.tableData = data
      this.total = total
    },

    async getInfo() {
      const { data, total } = await getInfo(this.pageParams)
      this.total = total
      data.forEach(item => {
        item.createdTime = item.createdTime.split('T')[0]
        item.status = item.status === 1 ? '已发布' : '已撤回'
      })
      this.tableData = data
    },
    async handleEdit(index, row) {
      const { code } = await modifyStatus({ _id: row._id })
      if (code === 0) {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        if (this.isSearch) {
          this.onSubmit()
        } else {
          this.getInfo()
        }
      }
    },
    async handleDelete(index, row) {
      const { code } = await delInfo({ _id: row._id })
      if (code === 0) {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        if (this.isSearch) {
          this.onSubmit()
        } else {
          this.getInfo()
        }
      }
    },

    currentPage(val) {
      this.pageParams.currentPage = val
      if (this.isSearch) {
        this.onSubmit()
      } else {
        this.getInfo()
      }
    }
  }
}
</script>
<style lang='' scoped>
</style>
