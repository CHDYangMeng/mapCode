<template>
  <div>
    <div class="main">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="content">
            <div class="introduce">
              <div class="title">
                交通运行状态评价参数介绍
              </div>
              <div class="details">
                <p>路网内容介绍</p>
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
            待研究的高速路网图
          </div>
          <baidu-map 
          class="bm-view" 
          :center="center"
          :zoom="zoom"
          @ready="handler"></baidu-map>
        </el-col>
      </el-row>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 地图控制
      center: {
        lng: 0,
        lat: 0
      },
      zoom: 3,

      // 级联框控制
      options1: [],
      value_options1: '',
      options2: [],
      value_options2: '',

      // 表格
      tableData: [],
      cols: [],
    }
  },

  created() {
    this.getRoadName();
  },

  methods: {
    // 地图控件
    handler({BMap, map}) {
      console.log(BMap,map);
      // 108.95263,34.276352
      this.center.lng = 108.95263;
      this.center.lat = 34.276352;
      this.zoom = 15
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