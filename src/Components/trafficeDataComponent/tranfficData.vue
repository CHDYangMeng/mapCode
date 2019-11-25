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
      <el-button type="primary" @click="plot" icon="el-icon-s-marketing">趋势图</el-button>

      <!-- 隐藏层 图 -->
      <el-dialog title="图形" @open="open" style="width: 1800px; algin-text: center" :visible.sync="dialogChartVisible">
        <div id="porperty">
          <div class="demo1">
            <el-tag>交通流指标</el-tag>
            <el-select v-model="dialog_value_option_index" @change="dialog_changeSelect_index(dialog_value_option_index)" filterable placeholder="请选择属性">
              <el-option
                v-for="item in dialog_options_index"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-tag>选择日期</el-tag>
            <el-date-picker
              v-model="date_value"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
          <div class="demo2">
            <el-button class="demo_btn" type="primary" @click="getDayData">天</el-button>
            <el-button class="demo_btn" type="primary" @click="getWeekData">周</el-button>
            <el-button class="demo_btn" type="primary" @click="getMonthData">月</el-button>
          </div> 
        </div>
        <div id="chart" style="height: 500px;" ref="barchart"></div>
      </el-dialog>

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

import echarts from 'echarts'

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

      // 引入隐藏层
      dialogChartVisible: false,

      // 图组件
      series_name: '', //图例
      xAxis_data: '', // x轴数据
      series_data: '',// y轴数据

      // 交通流指标
      dialog_options_index: [{
        label: '交通流量',
        value: 'flow'
      },{
        label: '速度',
        value: 'speed'
      },{
        label: '占有率',
        value: 'occupancy'
      }],
      dialog_value_option_index: '',
      // 日期选择
      date_value: '',
    }
  },
  created() {
    this.getPointData(),
    this.getPointName()
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
    // 获取检测器名称
    getPointName() {
      this.$http.post('getdetectorName').then( result => {
        console.log(result);
        if (result.body.status == 200) {
          var pointList = result.body.pointList;
          var options = [];
          for (let i = 0; i < pointList.length; i++) {
            options.push({
              value: pointList[i].point,
              label: pointList[i].point
            });
          }
        } else {
          console.log("获取数据失败");
        }
        this.options = options;
      })
    },
    // 选择器
    handlerSelect(row) {
      console.log(row);
      this.$http.post('getPointDataRow', {point: this.value_options}).then( result => {
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
      //弹出层函数
    dialog_changeSelect_index(dialog_value_option_index) {
      this.dialog_value_option_index = dialog_value_option_index;
      console.log(dialog_value_option_index);
    },
    // 获取数据
    // 获取天的数据
    getDayData() {
      var time = this.dateToString(this.date_value);
      this.$http.post('getDayData', {point:this.value_options, time:time}).then( result => {
        console.log(result);
        if (result.body.status == 200) {
          var pointData = result.body.pointData;
          var xAxis_data = [];
          var series_data = [];
          var series_name = '';
          for (let i = 0; i < pointData.length; i++) {
            xAxis_data.push(pointData[i].time);
            if (this.dialog_value_option_index == 'flow') {
              series_data.push(pointData[i].flow);
              series_name = '交通流量';
            } else if (this.dialog_value_option_index == 'speed') {
              series_data.push(pointData[i].speed);
              series_name = '速度';
            } else if (this.dialog_value_option_index == 'occupancy') {
              series_data.push(pointData[i].occupancy);
              series_name = '占有率';
            }
          }
          this.xAxis_data = xAxis_data;
          this.series_data = series_data;
          this.series_name = series_name;
        } else {
          console.log("获取数据失败");
        }
        setTimeout(() => {
          this.$nextTick(() => this.chart());
        },0);
      })
    },
    // 获取周的数据
    getWeekData() {
      var time = this.dateToString(this.date_value);
      this.$http.post('getWeekData', {point:this.value_options,time:time}).then( result => {
        console.log(result);
        if (result.body.status == 200) {
          var pointData = result.body.pointData;
          var xAxis_data = [];
          var series_data = [];
          var series_name = '';
          for (let i = 0; i < pointData.length; i++) {
            xAxis_data.push(pointData[i].time);
            if (this.dialog_value_option_index == 'flow') {
              series_data.push(pointData[i].flow);
              var series_name = '交通流量';
            } else if (this.dialog_value_option_index == 'speed') {
              series_data.push(pointData[i].speed);
              var series_name = '速度';
            } else if (this.dialog_value_option_index == 'occupancy') {
              series_data.push(pointData[i].occupancy);
              var series_name = '占有率';
            }
          }
        } else {
          console.log("获取数据失败");
        }
        this.xAxis_data = xAxis_data;
        this.series_data = series_data;
        this.series_name = series_name;
        setTimeout(() => {
        this.$nextTick(() => this.chart());
      },0);
      })
    },
    // 获取月的数据
    getMonthData() {
      var time = this.dateToString(this.date_value);
      this.$http.post('getMonthData', {point:this.value_options,time:time}).then( result => {
        console.log(result);
        if (result.body.status == 200) {
          var pointData = result.body.pointData;
          var xAxis_data = [];
          var series_data = [];
          for (let i = 0; i < pointData.length; i++) {
            xAxis_data.push(pointData[i].time);
            if (this.dialog_value_option_index == 'flow') {
              series_data.push(pointData[i].flow);
              var series_name = '交通流量';
            } else if (this.dialog_value_option_index == 'speed') {
              series_data.push(pointData[i].speed);
              var series_name = '速度';
            } else if (this.dialog_value_option_index == 'occupancy') {
              series_data.push(pointData[i].occupancy);
              var series_name = '占有率';
            }
          }
        } else {
          console.log("获取数据失败");
        }
        this.xAxis_data = xAxis_data;
        this.series_data = series_data;
        this.series_name = series_name;
        setTimeout(() => {
        this.$nextTick(() => this.chart());
      },0);
      })
    },

    // 时间转换
    dateToString(date){ 
      var year = date.getFullYear(); 
      var month =(date.getMonth() + 1).toString(); 
      var day = (date.getDate()).toString();  
      var hour = (date.getHours()).toString();
      var minutes = (date.getMinutes()).toString();
      var seconds = (date.getSeconds()).toString();
      if (month.length == 1) { 
          month = "0" + month; 
      } 
      if (day.length == 1) { 
          day = "0" + day; 
      }
      if (hour.length == 1) {
        hour = "0" + hour;
      }
      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }
      if (hour.length == 1) {
        seconds = "0" + seconds;
      }
      var dateTime = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
      return dateTime; 
    },

    // 绘图
    open() {
      setTimeout(() => {
        this.$nextTick(() => this.chart());
      },0); 
    },
    plot() {
      this.dialogChartVisible = true; 
    },
    chart() {
      var chart = echarts.init(document.getElementById('chart'));
      var option = {
          title:{
            text: "交通流参数特性曲线图",
            x:'center',
            y:'top',
            textAlign:'center'
          },
          tooltip:{},
          legend:{
            left:'right'
          },
          xAxis: {
            type: 'category',
            data: this.xAxis_data,
          },
          yAxis:{
            type: 'value',
          },
          series: [{
            name: this.series_name,
            type: 'line',
            data: this.series_data,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  smooth: true,
                  position: 'top',
                  textStyle: {
                    color: 'black',
                    fontSize: 16
                  }
                }
              }
            }
          }]
      };
      //使用制定的配置项和数据显示图表
      chart.setOption(option);
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
.demo1 {
  margin: 5px;
  padding: 5px;
}
.demo2 {
  margin: 5px;
  padding: 5px;
  .demo_btn {
    margin: 10px, 100px;
    padding: 10px, 20px;
  }
}
</style>