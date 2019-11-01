<template>
  <div>
    <div class="select">
      <span style="font-size: 16px">请选择道路：</span>
      <el-select v-model="value_options" @change="handlerSelect" placeholder="请选择">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>

      <div class="point-table">
        <!-- 数据表 -->
        <el-table
        :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        border
        style="width: 100%">
          <el-table-column
            fixed
            prop="road"
            sortable
            label="道路编号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="point"
            sortable
            label="检测器"
            align="center">
          </el-table-column>
          <el-table-column
            label="时间"
            sortable 
            prop="time"
            align="center">
            <template slot-scope="scope">
              <span>{{scope.row.time | dateFormat}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="flow"
            sortable
            label="交通流量"
            align="center">
          </el-table-column>
          <el-table-column
            prop="speed"
            sortable
            label="速度"
            align="center">
          </el-table-column>
          <el-table-column
            prop="occupancy"
            sortable
            label="占有率"
            align="center">
          </el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 选择器
      value_options: '',
      options: [],
      // 数据表
      tableData: [],
      // 分页插件
      currentPage: 1,
      pagesize: 10,
    }
  },
  created() {
    this.getPointData()
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
    getPointData() {
      this.$http.post('getPointData').then( result => {
        console.log(result);
        if (result.body.status == 200) {
          var pointData = result.body.pointData;
          var tableData = [];
          for (var i = 0; i < pointData.length; i++) {
            var element = pointData[i];
            tableData.push({
              road: element.road,
              point: element.point,
              time: element.time,
              flow: element.flow,
              speed: element.speed,
              occupancy: element.occupancy
            }) 
          }
        } else {
          console.log("获取数据失败");
        }
        this.tableData = tableData;
      })
    },
    // 选择器
    handlerSelect() {

    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  margin: 10px 0px 0px 30px;
  padding: 10px 0px 0px 30px;
}
.table {
  white-space: nowrap;
}
.point-table {
  margin: 5px;
  padding: 10px;
}
.select {
  margin: 10px;
  padding: 10px;
}
</style>