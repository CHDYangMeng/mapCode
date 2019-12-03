<template>
  <div>
    <div>
      <div class="main">
        <el-row :gutter="10">
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
           <el-col :span="8">
            <div class="content">
              <div class="introduce">
                <!-- <div class="title">
                  待研究地区路网介绍
                </div> -->
                <div class="details">
                  <el-row :gutter="12">
                    <el-col :span="24">
                      <el-card shadow="always">
                        <div class="map_title">
                          地图图例
                        </div>
                        <div>
                          <el-row :gutter="20">
                            <el-col :span="6">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;畅通</span>
                            </el-col>
                            <el-col :span="18"><div class="grid-content bg-purple1"></div></el-col>
                          </el-row>
                        </div>
                        <div>
                          <el-row :gutter="20">
                            <el-col :span="6">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;基本畅通</span>
                            </el-col>
                            <el-col :span="18"><div class="grid-content bg-purple2"></div></el-col>
                          </el-row>
                        </div>  
                        <div>
                          <el-row :gutter="20">
                            <el-col :span="6">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;轻度拥堵</span>
                            </el-col>
                            <el-col :span="18"><div class="grid-content bg-purple3"></div></el-col>
                          </el-row>
                        </div>
                        <div>
                          <el-row :gutter="20">
                            <el-col :span="6">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;重度拥堵</span>
                            </el-col>
                            <el-col :span="18"><div class="grid-content bg-purple4"></div></el-col>
                          </el-row>
                        </div>
                        <div>
                          <el-row :gutter="20">
                            <el-col :span="6">
                              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;严重拥堵</span>
                            </el-col>
                            <el-col :span="18"><div class="grid-content bg-purple5"></div></el-col>
                          </el-row>
                        </div> 
                      </el-card>
                    </el-col>
                  </el-row>
                  <el-row :gutter="12">
                    <el-col :span="24">
                      <el-card shadow="always">
                        <div class="map_title">
                          路网拥堵里程比例
                          <el-date-picker
                            v-model="date_value"
                            type="date"
                            placeholder="选择日期">
                          </el-date-picker>
                          <el-button type="primary" @click="getStatusData">选择</el-button>
                        </div>
                        <div>
                          <el-row :gutter="24">
                            <el-col :span="4">
                              <span>畅通</span>
                            </el-col>
                            <el-col :span="8">
                              <el-progress type="circle" :percentage="changtong"></el-progress>
                            </el-col>
                            <el-col :span="4">
                              <span>基本畅通</span>
                            </el-col>
                            <el-col :span="8">
                              <el-progress type="circle" :percentage="jibenchangtong"></el-progress>
                            </el-col>
                          </el-row>
                        </div>
                        <div>
                          <el-row :gutter="24">
                            <el-col :span="4">
                              <span>轻度拥堵</span>
                            </el-col>
                            <el-col :span="8">
                              <el-progress type="circle" :percentage="qingduyongdu"></el-progress>
                            </el-col>
                            <el-col :span="4">
                              <span>中度拥堵</span>
                            </el-col>
                            <el-col :span="8">
                              <el-progress type="circle" :percentage="zhongduyongdu"></el-progress>
                            </el-col>
                          </el-row>
                        </div>
                        <div>
                          <el-row :gutter="24">
                            <el-col :span="4">
                              <span>严重拥堵</span>
                            </el-col>
                            <el-col :span="8">
                              <el-progress type="circle" :percentage="yanzhongyongdu"></el-progress>
                            </el-col>
                          </el-row>
                        </div>
                      </el-card>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="item">
                
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
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

      date_value: '',

      changtong: 0,
      jibenchangtong: 0,
      qingduyongdu: 0,
      zhongduyongdu: 0,
      yanzhongyongdu: 0,

      url: 'src/Components/htmlComponent/20180101070000Status.html',
    }
  },

  created() {

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
    dateToString2(date){
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
      var dateTime = year + month + day + hour + minutes + seconds;
      return dateTime;
    },
    // 获取数据
    getStatusData() {
      var time = this.dateToString(this.date_value);
      console.log(time);
      this.$http.post('getStatusData', {time:time}).then( result => {
        console.log(result);
        if (result.body.status == 200) {
          this.changtong = parseInt(result.body.changtong);
          this.jibenchangtong = parseInt(result.body.jibenchangtong);
          this.qingduyongdu = parseInt(result.body.qingduyongdu);
          this.zhongduyongdu = parseInt(result.body.zhongduyongdu);
          this.yanzhongyongdu = parseInt(result.body.yanzhongyongdu);
        } else {

        }
        var timeString = dateToString2(this.date_value);
        var urlPath = "src/Components/htmlComponent/" + timeString + "Status.html";
        this.url = urlPath;
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
    height: 812px;
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
        span {
          // font-family: 楷体;
          font-size: 18px;
        }
        .map_title {
          margin: 10px;
          padding: 10px;
          font-weight: bold;
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
  
  // 图例制作
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple1 {
    background: green;
  }
  .bg-purple2 {
    background: greenyellow;
  }
  .bg-purple3 {
    background: yellow;
  }
  .bg-purple4 {
    background: orange;
  }
  .bg-purple5 {
    background: red;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>