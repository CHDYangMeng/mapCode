<template>
  <div class="login-container">
    <h1 class="title">高速路网交通运行分析系统</h1>
    <div class="login">
      <p class="login-title"><img src="../../images/人物.png" style="width=30px; height:30px"> 用 户 登 录</p>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名:" prop="account" class="label_input">
          <el-input type="text" v-model="ruleForm2.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password" class="label_input">
          <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
          <div class="demo_a">
            <a href="/#/setPassword" style="font-size: 8px;">忘记密码？</a>
            <a href="/#/register" style="font-size: 8px;">点击注册</a>
          </div>
        </el-form-item>
        
        <el-form-item class="btn_login">
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  </div> 
</template>

<script>
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      }
      setTimeout(() => {
        if (value.lenght < 4 || value.lenght > 12) {
          callback(new Error('请输入标准密码'));
        } else {
          callback();
        }
      },1000);
    };
    return {
      ruleForm2: {
        account: '',
        password: ''
      },
      rules2: {
        account: [
          { validator: checkUsername, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('login-check',{account: this.ruleForm2.account, password: this.ruleForm2.password}).then(result => {
            console.log(result)
            if (result.body.status == 200) {
              sessionStorage.setItem('account',result.body.account);
              console.log(result.body.account)
              this.notice("成功","登录成功","success");
              this.$router.push('/success');
            } else if (result.body.status == 201) {
              console.log(result.body.account)
              this.notice("失败","密码错误","error");
            } 
          },result => {
            console.log(result.message);
            this.notice("失败","网络连接错误","error");
            
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    notice(title,message,type) {
      this.$notify({
        title: title,
        message: message,
        type: type,
        duration: 3000,
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-image: url('./../../images/background-images.jpg');
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: cover;
  overflow: auto;
  .title {
    text-align: center;
    color:azure;
    font-size: 80px;
    font-family: 宋体;
    font-weight: bold;
    margin: 100px auto auto auto;
  }

}
.login {
  width: 400px;
  height: 300px;
  padding: 13px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -200px;
  margin-top: -200px;
  background-color: rgba(240, 255, 255, 0.5);
  border-radius: 10px;
  text-align: center;

  .login-title img {
    margin: 5px;
    padding: 0px;
    font-size: 15px;
    font-family: 宋体;
    font-weight: bold;
    vertical-align: middle;
  }
}
.label_input {
  width: 90%;
  font-size: 14px;
  font-family: 宋体;
  font-weight: bold;
  line-height: 28px;
  text-align: center;
  color: white;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.demo_a {
  margin: 0px;
  padding: 0px;
  font-size: 8px;
  font-family: 宋体;
}

.btn_login {
  width: 90%;
  font-size: 14px;
  font-family: 宋体;
  line-height: 28px;
  text-align: center;
  color: white;
  border-radius: 6px;
  border: 0;
}
</style>