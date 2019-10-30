<template>
  <div>
    <div class="roadInfo-table">
      <!-- 数据表 -->
      <el-table
       :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
       class="table"
       border>
        <el-table-column 
        v-for="(col,index) in cols" 
        :key="index"
        :property="col.prop" 
        :label="col.label"
        align="center"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 50]" 
        :page-size="pagesize"         
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        background> 
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据表
      tableData: [],
      cols: [],
      // 分页插件
      currentPage: 1,
      pagesize: 10,
    } 
  },
  created() {
    this.getroadInfo()
  },
  methods: {
    // 获取页面、页码、每页数量
    handleSizeChange(size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    // 获取数据
    getroadInfo() {
      this.$http.post('roadInfo-select').then( result => {
        console.log(result);
        if (result.body.status == 200) {
          var tableData = result.body.roadInfoList;
          var tableData = tableData;
          var cols = [];
          for (var key in tableData[0]) {
            var title = '';
            if (key == 'point') {
              title = '检测器';
            } else if (key == 'road') {
              title = '路段编号';
            } else if (key == 'length') {
              title = '路段长度';
            } else if (key == 'roadWidth') {
              title = '路段宽度';
            } else if (key == 'shoulderWidth') {
              title = '路肩宽度';
            } else if (key == 'designSpeed') {
              title = '设计速度';
            } else if (key == 'laneNum') {
              title = '车道数';
            }
            cols.push({
              prop: key,
              label: title,
            })
          };
          this.tableData = tableData;
          this.cols = cols;
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.table {
  white-space: nowrap;
}
.roadInfo-table {
  margin: 20px 5px 5px 5px;
  padding: 10px;
}
</style>