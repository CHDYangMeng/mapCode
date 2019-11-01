<template>
  <div>
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
                  <p>路网内容介绍</p>
                </div>
              </div>
              <div class="item">
                
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