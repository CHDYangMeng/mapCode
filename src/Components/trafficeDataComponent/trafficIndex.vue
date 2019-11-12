<template>
  <div>
    <div class="main">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="content">
            <div class="introduce">
              <div class="title">
                交通运行状态评价指标介绍
              </div>
              <div class="details">
                <p>具体指标介绍</p>
              </div>
            </div>
            <div>
              <el-tabs tab-position="left" style="height: 200px;">
                <el-tab-pane label="交通流量">
                  <p>交通流量是指单位时间内通过道路某一点或者断面的车辆数，是判别交通状态的主要指标，其表达式为：</p> 
                  <div><img src="*"></div>
                  <p></p>
                </el-tab-pane>
                <el-tab-pane label="平均行程时间">
                  <p>平均行程时间是指通过某一段道路的所有车辆行程时间的平均值，其表达式为：</p>
                  <div><img src="*"></div>
                  <p></p>
                </el-tab-pane>
                <el-tab-pane label="平均行程速度">
                  <p>平均行程速度是指道路长度与通过该路段所有车辆的平均行程时间的比值，平均行程速度值的大小是出行者对交通拥挤状态的最直观的感受之一，直接反映了路段的交通状况，其表达式为：</p>
                  <div><img src="*"></div>
                  <p></p>
                </el-tab-pane>
                <el-tab-pane label="占有率">
                  <p>占有率是指某一瞬间内，单位道路长度上的车辆数，其表达式为：</p>
                  <div><img src="*"></div>
                  <p></p>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="bm-title">
            交通运行状态评价指标
          </div>
          
          <!-- 数据表 -->
          <el-table
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          border
          style="width: 100%">
            <el-table-column
              fixed
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
              prop="avgtime"
              sortable
              label="平均形成时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="avgspeed"
              sortable
              label="平均行程速度"
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
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格
      tableData: [],
      // 分页插件
      currentPage: 1,
      pagesize: 10,
    }
  },

  created() {
    this.getIndexData(); 
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
    getIndexData() {
      this.$http.post('getIndexData').then( result => {
        console.log(result);
        if (result.body.status == 200) {
          var indexData = result.body.indexData;
          var tableData = [];
          for (var i = 0; i < indexData.length; i++) {
            var element = indexData[i];
            tableData.push({
              point: element.point,
              time: element.time,
              flow: element.flow,
              avgtime: element.avgtime,
              avgspeed: element.avgspeed,
              occupancy: element.occupancy
            }) 
          }
        } else {
          console.log("获取数据失败");
        }
        this.tableData = tableData;
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.main {
  margin: 10px;
  padding: 10px;
  border-style: solid;
  border-width: medium;
  border-color:honeydew;

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
}
.bm-title {
  text-align: center;
  font-family: 楷体;
  font-size: 30px;
  font-weight: bold;
}
.bm-view {
  width: 100%;
  height: 560px;
  border-style: solid;
  border-width: medium;
  border-color:burlywood; //地图框的颜色
}

.content {
  border-style: solid;
  border-width: medium;
  border-color: burlywood; // 文本框的颜色
  .introduce {
    padding: 2px;
    .title {
      margin: 2px;
      padding: 2px;
      text-align: center;
      font-family: 楷体;
      font-size: 30px;
      font-weight: bold;
    }
    .details {
      margin: 4px;
      padding: 4px;
      p {
        // font-family: 楷体;
        font-size: 18px;
      }
    } 
  }
  
}
</style>