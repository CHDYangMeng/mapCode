<template>
  <div>
    <div class="main">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="content">
            <div class="introduce">
              <div class="title">
                待研究地区路网介绍
              </div>
              <div class="details">
                <a>路网内容介绍</a>
              </div>
            </div>
            <div class="item">
              <div class="select">
                <span style="font-size: 16px">请选择道路：</span>
                <el-select v-model="value_options1" @change="handlerSelect1" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in options1"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="select">
                <span style="font-size: 16px">请选择路段：</span>
                <el-select v-model="value_options2" @change="handlerSelect2" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in options2"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div>
                <div style="font-size: 16px; margin: 20px 10px">
                  路段的基础信息：
                </div>
                <!-- 数据表 -->
                <el-table 
                :data="tableData" 
                class="table" border>
                  <el-table-column 
                  v-for="(col,index) in cols" 
                  :key="index"
                  :property="col.prop" 
                  :label="col.label"
                  align="center"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="bm-title">
            待研究的高速路网图
          </div>
          <div class="bm-view">
            <iframe class="bm-view" :src="url" frameborder="0"></iframe>
          </div>
          <!-- <baidu-map 
          class="bm-view" 
          :center="center"
          :zoom="zoom"
          @ready="handler"></baidu-map> -->
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

      url: 'src/Components/htmlComponent/NetWork.html',
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
    // 级联数据控件
    getRoadName() {
      this.$http.post('roadName').then( result => {
        console.log(result);
        if (result.body.status == 200) {
          var roadNameList = result.body.roadNameList;
          var options = [];
          for (let i = 0; i < roadNameList.length; i++) {
            options.push({
              value: roadNameList[i].road,
              label: roadNameList[i].road
            });
          }
        } else {
          console.log("获取数据失败");
        }
        this.options1 = options;
      })
    },

    // 级联点击控件
    handlerSelect1(row) {
      console.log(row);
      this.$http.post('detectorName', {roadName: this.value_options1}).then( result => {
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
        this.options2 = options;
      })
    },
    handlerSelect2(row) {
      this.$http.post('roadPointData', {point: row}).then( result => {
        console.log(result);
        if (result.body.status == 200) {
          var pointData = result.body.pointData;
          var tableData = pointData;
          var cols = [];
          for (var key in tableData[0]) {
            var title = '';
            if (key == 'point') {
              title = '检测器';
            } else if (key == 'road') {
              title = '道路';
            } else if (key == 'length') {
              title = '长度';
            } else if (key == 'roadWidth') {
              title = '路宽';
            } else if (key == 'shoulderWidth') {
              title = '路肩宽';
            } else if (key == 'designSpeed') {
              title = '设计速度';
            } else if (key == 'laneNum') {
              title = '车道数';
            }
            cols.push({
              prop: key,
              label: title,
            });
          }
        } else {
          console.log("获取数据失败");
        }
        this.tableData = tableData;
        this.cols = cols;
      })
    }
  },
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
      a {
        // font-family: 楷体;
        font-size: 18px;
      }
    } 
  }
  .item {
    margin: 4px;
    padding: 4px;
    .select {
      margin: 5px;
      padding: 5px;
    }
  }
}
</style>