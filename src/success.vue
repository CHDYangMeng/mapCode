<template>
  <div>
    <!-- header -->
    <div class="header">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <p class="text-image"><img src="./images/changan.png" style="width=90px; height:90px">&nbsp;&nbsp;高速路网交通运行分析系统</p>
            <el-rate class="text-score"
            v-model="value" 
            disabled 
            show-score 
            text-color="#ff9900"
            score-template="{value}">
            </el-rate>
            <p class="text-version">Chang'an University © 2019.10.28.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Version 1.0.0&nbsp;&nbsp;&nbsp;&nbsp;</p>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- main -->
    <div class="main">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo" 
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item></el-menu-item>
        <el-menu-item></el-menu-item>
        <el-menu-item></el-menu-item>
        <el-menu-item></el-menu-item>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>&nbsp;&nbsp;主页</template>
          <el-menu-item index="1-1"><i class="el-icon-success"></i>&nbsp;&nbsp;欢迎页</el-menu-item>
          <el-menu-item index="1-2"><i class="el-icon-menu"></i>&nbsp;&nbsp;控制主页</el-menu-item>
        </el-submenu>
        <el-menu-item index="2"><i class="el-icon-edit-outline"></i>&nbsp;&nbsp;用户管理</el-menu-item>
        <el-submenu index="3">
          <template slot="title"><i class="el-icon-setting"></i>&nbsp;&nbsp;基础信息管理</template>
          <el-menu-item index="3-1"><i class="el-icon-picture"></i>&nbsp;&nbsp;路网展示</el-menu-item>
          <el-menu-item index="3-2"><i class="el-icon-document"></i>&nbsp;&nbsp;道路信息</el-menu-item>
          <el-menu-item index="3-3">...</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"><i class="el-icon-news"></i>&nbsp;&nbsp;交通流数据</template>
          <el-menu-item index="4-1"><i class="el-icon-edit"></i>&nbsp;&nbsp;交通流基础数据</el-menu-item>
          <el-menu-item index="4-2"><i class="el-icon-tickets"></i>&nbsp;&nbsp;交通流指标参数</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title"><i class="el-icon-refresh"></i>&nbsp;&nbsp;路网运行状态</template>
          <el-menu-item index="5-1"><i class="el-icon-time"></i>&nbsp;&nbsp;交通运行状态</el-menu-item>
          <el-menu-item index="5-2"><i class="el-icon-location-outline"></i>&nbsp;&nbsp;路网相关路段</el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title"><i class="el-icon-bell"></i>&nbsp;&nbsp;交通运行状态预测</template>
          <el-menu-item index="6-1"><i class="el-icon-loading"></i>&nbsp;&nbsp;运行状态预测</el-menu-item>
        </el-submenu>

        <el-menu-item index="7"><a href="http://baidu.com" target="_blank" rel="noopener noreferrer"><i class="el-icon-phone"></i>&nbsp;&nbsp;联系我们</a></el-menu-item>
        <el-submenu index="8" class="userInfo-container">
          <template slot="title">用户：{{account}}</template>
          <el-menu-item index="8-1"><i class="el-icon-view"></i>&nbsp;&nbsp;个人信息</el-menu-item>
          <el-menu-item index="8-2"><i class="el-icon-edit"></i>&nbsp;&nbsp;修改密码</el-menu-item>
          <el-menu-item index="8-3" @click="outer()"><i class="el-icon-delete"></i>&nbsp;&nbsp;退出</el-menu-item>
        </el-submenu>
        <el-menu-item class="userInfo-container"><i class="el-icon-date"></i>&nbsp;&nbsp;日期：{{date | dateFormat}}</el-menu-item>
      </el-menu>
      <!-- 引入模块
      引入主页模块 mianComponent -->
      <welcome v-if="type === '1-1'"></welcome>
      <main-page v-else-if="type === '1-2'"></main-page>
      <!-- 引入用户管理模块 userComponent -->
      <user v-else-if="type === '2'"></user>
      <!-- 引入基础信息模块 roadNetWorkComponent -->
      <roadNetWorkShow v-else-if="type === '3-1'"></roadNetWorkShow>
      <roadNetWorkInfo v-else-if="type === '3-2'"></roadNetWorkInfo>
      <!-- 引入交通数据模块 trafficDataComponent -->
      <trafficData v-else-if="type === '4-1'"></trafficData>
      <trafficIndex v-else-if="type === '4-2'"></trafficIndex>
      <!-- 引入交通运行状态模块 conditionComponent -->
      <condition v-else-if="type === '5-1'"></condition>
      <relevantRoad v-else-if="type === '5-2'"></relevantRoad>
      <!-- 引入交通运行状态预测模块 predictComponent -->
      <predictCondition v-else-if="type === '6-1'"></predictCondition>
      <div v-else></div>

    </div>
    <!-- floor -->
    <div class="floor">

    </div>
  </div>
</template>

<script>

// 引入模块
// 引入主页模块 mianComponent
import welcome from './Components/mainComponent/welcome.vue'
import mainPage from './Components/mainComponent/mainpage.vue'
// 引入用户管理模块 userComponent
import user from './Components/userComponent/user.vue'
// 引入基础信息模块 roadNetWorkComponent
import roadNetWorkShow from './Components/roadNetWorkComponent/roadNetworkShow.vue'
import roadNetWorkInfo from './Components/roadNetWorkComponent/roadNetWorkInfo.vue'
// 引入交通数据模块 trafficDataComponent
import trafficData from './Components/trafficeDataComponent/tranfficData.vue'
import trafficIndex from './Components/trafficeDataComponent/trafficIndex.vue'
// 引入交通运行状态模块 conditionComponent
import condition from './Components/conditionComponent/condition.vue'
import relevantRoad from './Components/conditionComponent/relevantRoad.vue'
// 引入交通运行状态预测模块 predictComponent
import predictCondition from './Components/predictComponent/predictCondition.vue'


export default {
  data() {
    return {
      date: new Date(),
      account: sessionStorage.getItem("account"),
      activeIndex: '1',
      type: '1-1',
      value: 2.6,
    }
  },
  created() {
    if (sessionStorage.length == 0) {
      this.notice("登录失效","请重新登录","warning");
      this.$router.push('/login');
    } else if (sessionStorage.getItem("account") == '') {
      this.notice("登录失效","请重新登录","warning");
      this.$router.push('/login');
    }
  },
  mounted() {
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    outer() {
      this.$router.push('/login');
      sessionStorage.setItem('account', '')
    },
    handleSelect(key, keyPath) {
      this.type = key;
    },
    notice(title,message,type) {
      this.$notify({
        title: title,
        message: message,
        type: type,
        duration: 4000,
      });
    },
  },
  components: {
    'welcome': welcome,
    'main-page': mainPage,
    'user': user,
    'roadNetWorkShow': roadNetWorkShow,
    'roadNetWorkInfo': roadNetWorkInfo,
    'trafficData': trafficData,
    'trafficIndex': trafficIndex,
    'condition': condition,
    'relevantRoad': relevantRoad,
    'predictCondition': predictCondition
  }
  
}
</script>

<style lang="scss" scoped>
.header {
  .el-row {
    margin-bottom: 1px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
    
    .text-image img {
      vertical-align: middle;
    }
    .text-image {
      margin: 0;
      padding: 30px 0;
      text-align: center;
      font-family: 微软雅黑;
      font-size: 60px;
      font-weight: bold;
      color: white;
    }
    .text-version {
      margin: 0;
      padding: 0;
      text-align: right;
      font-family: 微软雅黑;
      font-size: 10px;
      font-weight: bold;
      color: white;
    }
    .text-score {
      margin: 20px;
      padding: 0;
      text-align: right;
      font-family: 微软雅黑;
      font-size: 10px;
      font-weight: bold;
      color: white;
    }
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 145px;
  }
  .row-bg {
    padding: 0;
    background-color: #f9fafc;
  }
}
.main {
  .el-row {
    margin-bottom: 1px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 200px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .userInfo-container {
    float: right;
  }
}
.floor {
  
}
</style>
