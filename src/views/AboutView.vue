<template>
  <div class="common-layout">
    <el-container>
      <el-header>管理界面</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
          >
            <el-menu-item index="1">

              <span>已注册用户列表显示</span>
            </el-menu-item>
            <el-menu-item index="2">

              <span>用户信息修改维护</span>
            </el-menu-item>
            <el-menu-item index="3">

              <span>用户信息删除</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <el-tabs type="border-card">
            <el-tab-pane label="User">
              <el-table :data="tableDatas" stripe style="width: 100%">
                <el-table-column prop="id" label="ID" min-width="180"/>
                <el-table-column prop="name" label="Name" min-width="180"/>
                <el-table-column prop="password" label="Password" min-width="180"/>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="Edit">
              <el-table :data="tableDatas" stripe style="width: 100%">
                <el-table-column prop="id" label="ID" min-width="180"/>
                <el-table-column prop="name" label="Name" min-width="180"/>
                <el-table-column prop="password" label="Password" min-width="180"/>
                <el-table-column fixed="'right'" label="Operations" min-width="180">
                  <template #default="scope">
                    <el-button text @click="dialogFormVisible = true">
                      open to edit
                    </el-button>

                    <el-dialog v-model="dialogFormVisible" title="Edit" width="33%">
                      <el-form :model="form" class="demo-Form" ref="form">
                        <el-row justify="center" type="flex">
                          <el-form-item label="name" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"/>
                          </el-form-item>
                        </el-row>
                        <el-row justify="center" type="flex">
                          <el-form-item label="password" :label-width="formLabelWidth">
                            <el-input v-model="form.password" autocomplete="off"/>
                          </el-form-item>
                        </el-row>
                      </el-form>
                      <span class="dialog-footer">
                        <el-row justify="center" type="flex">
                          <el-button @click="dialogFormVisible = false">Cancel</el-button>
                          <el-button type="primary" @click="dialogFormVisible = false" @mouseup="submitForm('form',scope.$index)">
                            Confirm
                          </el-button>
                            </el-row>
                            </span>
                    </el-dialog>

                  </template>

                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="delete">
              <el-table :data="tableDatas" style="width: 100%">
                <el-table-column prop="id" label="ID" min-width="180"/>
                <el-table-column prop="name" label="Name" min-width="180"/>
                <el-table-column fixed="'right'" label="Operations" min-width="180">
                  <template #default="scope">
                    <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="deleteRow(scope.$index)"
                    >
                      Remove
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import {reactive, ref} from 'vue'
import router from "@/router";
import {ElMessage} from "element-plus";
export default {
  setup() {
    const dialogFormVisible = ref(false)
    return {
      dialogFormVisible,
    }

  },
  name: "AboutView",
  data() {
    return {
      tableDatas: [],
      form: {
        name: '',
        password: '',
        id: '',
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    submitForm(formName,index) {
      const that = this;
      that.form.id = that.tableDatas[index].id;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(that.form)
          this.axios.post('http://localhost:1145/service/user/update', that.form).then(function (response) {
            let data = response.data;
            console.log(data)
            if (data===true) {
              open2();
              router.go(0);
            } else {
              console.log('error submit!!');
              open4();
              return false;
            }
          })
        }
      });
    },
    deleteRow(index) {
      this.axios.delete('http://localhost:1145/service/user/delete?id=' + this.tableDatas[index].id).then(function (response) {
        let data = response.data;
        console.log(data)
      }).catch(function (error) {
        console.log(error);
      });
      this.tableDatas.splice(index, 1)
    },

  },
  created() {
    const that = this;
    this.axios.get('http://localhost:1145/service/user/get').then(function (response) {
      that.tableDatas = response.data;
    }, function (error) {
      console.log(error);
    })
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