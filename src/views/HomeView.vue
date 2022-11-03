<template>
  <!-- Form -->
  <el-button text @click="dialogFormVisible = true">
    open a Form nested Dialog
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="Edit" width="33%" >
    <el-form :model="form" class="demo-Form" ref="form">
      <el-row justify="center" type="flex">
        <el-form-item label="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        </el-row>
        <el-row justify="center" type="flex">
        <el-form-item label="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" />
        </el-form-item>
      </el-row>
    </el-form>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false" @mouseup="submitForm('form')">
          Confirm
        </el-button>
      </span>
  </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue'
import {ElMessage} from "element-plus";
export default {
  setup() {
    const dialogFormVisible = ref(false)
    return {
      dialogFormVisible,
    }
  },
  data() {
    return {
      form: {
        name: '',
        password: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    submitForm(formName) {
      const that = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(that.form)
          this.axios.post('http://localhost:1145/service/user/update', that.form).then(function (response) {
            let data = response.data;
            console.log(data)
            if (data.id!=null) {
              open2();
            } else {
              console.log('error submit!!');
              open4();
              return false;
            }
          })
        }
      });
    },
    },
  }
const open2 = () => {
  ElMessage({
    message: '修改成功',
    type: 'success',
  })
}
const open4 = () => {
  ElMessage.error('修改失败')
}
// const dialogFormVisible = ref(false)
// const formLabelWidth = '140px'
//
// const form = reactive({
//   name: '',
//   region: '',
//   password: '',
// })
</script>
<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
.demo-Form {
  justify-content: center;
}
</style>