<template>
  <div class="register">
    <h1>Register</h1>
  </div>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-registerForm">
    <el-row type="flex"  justify="center">
      <el-form-item label="账号" prop="name">
        <el-col :span="24">
          <el-input v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-form-item label="密码" prop="password">
        <el-col :span="24">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
    </el-row>
    <el-row type="flex"  justify="center">
      <el-form-item label="确认密码" prop="checkPass">
        <el-col :span="24">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-col>
      </el-form-item>
    </el-row>
    <el-row type="flex"  justify="center">
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
      <el-button type="danger" @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
    </el-row>
  </el-form>
</template>

<script>
import router from "@/router";
import {ElMessage} from "element-plus";

export default {
  name: "RegisterView",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        checkPass: '',
        name: ''
      },
      rules: {
        password: [
          {required:true,validator: validatePass, trigger: 'blur'},
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        checkPass: [
          {required:true,validator: validatePass2, trigger: 'blur'},
          { min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur' }
        ],
        name: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // console.log(that.ruleForm)
          this.axios.post('http://localhost:1145/service/user/register', that.ruleForm).then(function (response) {
            let data = response.data;
            // console.log(data)
            if (data ===true) {
              open2();
              router.push({path: '/'});
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
    message: '注册成功',
    type: 'success',
  })
}
const open4 = () => {
  ElMessage.error('注册失败')
}
</script>

<style scoped>
.demo-registerForm{
  justify-content: center;
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 85px 15px 35px ;
  background: #fff center;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
