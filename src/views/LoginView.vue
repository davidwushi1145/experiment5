<template>
  <h1>Login</h1>
  <img alt="Vue logo" src="../assets/logo.png">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-loginForm">
    <el-row type="flex" justify="center">
      <el-form-item label="账号" prop="name">
        <el-col :span="24">
          <el-input v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
    </el-row>
    <el-row type="flex" justify="center">
      <el-form-item label="密码" prop="password">
        <el-col :span="24">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-col>
      </el-form-item>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm') ">登陆</el-button>
        <el-button type="danger" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-row>
  </el-form>
</template>

<script>

import {ElMessage} from "element-plus";
import router from '@/router/index.js'

export default {

  name: "LoginView",
  data() {
    return {
      ruleForm: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(that.ruleForm)
          this.axios.post('http://localhost:1145/service/user/login', that.ruleForm).then(function (response) {
            let data = response.data;
            console.log(data)
            if (data.id!=null) {
              open2();
              router.push({path: '/about'});
            } else {
              console.log('error submit!!');
              open4();
              return false;
            }
          })
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
const open2 = () => {
  ElMessage({
    message: '登陆成功',
    type: 'success',
  })
}
const open4 = () => {
  ElMessage.error('登陆失败')
}
</script>

<style scoped>
.demo-loginForm {
  justify-content: center;
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 85px 15px 35px;
  background: #fff center;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

</style>