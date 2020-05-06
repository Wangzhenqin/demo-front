<!--  -->
<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="用户Id:">
        <el-input v-model="userId"></el-input>
      </el-form-item>
      <el-form-item label="用户名:">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="用户类型:">
        <el-select v-model="userType" placeholder="请选择">
          <el-option
            v-for="item in userTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="clickEnter()">查询</el-button>
        <el-button @click="reset()">重置</el-button>
        <el-upload class="upload-demo" action="/src/assets/file" :on-success="uploadSuccess">
          <el-button size="small" type="primary">导入用户信息</el-button>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-table :data="userDTO" stripe @row-click="rowClick" style="width: 100%" max-height="500">
      <el-table-column fixed prop="userId" label="用户Id" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="userType" label="用户类型" width="180" :formatter="userTypeName"></el-table-column>
      <el-table-column label="操作" width="180">
        <el-button @click="dialogFormVisible1 = true" type="text" size="small">修改</el-button>
        <el-button @click="dialogFormVisible2 = true" type="text" size="small">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible1">
      <el-form :model="updateUser">
        <el-form-item label="用户Id:">
          <el-input :disabled="true" v-model="updateUser.userId"></el-input>
        </el-form-item>
        <el-form-item label="用户名:">
          <el-input v-model="updateUser.name"></el-input>
        </el-form-item>
        <el-form-item label="用户类型:">
          <el-select v-model="updateUser.userType" placeholder="请选择">
            <el-option
              v-for="item in userTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updateUserData">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="是否删除用户" :visible.sync="dialogFormVisible2">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="delectUser">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
      :page-size="page.pageSize"
      :page-sizes="[1, 10, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { selectUser, updateUserData, delectUser } from "network/user";
import { uploadUser } from "network/upload";
export default {
  data() {
    return {
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 1
      },
      userId: null,
      name: null,
      userType: null,
      userDTO: null,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      userTypes: [
        {
          value: "0",
          label: "管理员"
        },
        {
          value: "1",
          label: "学生"
        },
        {
          value: "2",
          label: "教师"
        }
      ],
      updateUser: {
        userId: null,
        name: null,
        userType: null
      }
    };
  },

  // computed:{
  //   pageTotal(){
  //     return this.total/this.page.pageSize
  //   }
  // },

  // mounted: {},

  methods: {
    clickEnter() {
      selectUser(this.userId, this.userType, null, this.name, this.page).then(
        res => {
          console.log(res);
          if (res.ret == "SUCCESS") {
            this.userDTO = res.userDTO;
            this.total = res.total;
          }
        }
      );
    },
    reset() {
      const userList = this.userDTO;
      Object.assign(this.$data, this.$options.data());
      this.userDTO = userList;
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.clickEnter();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.clickEnter();
    },
    rowClick(data) {
      this.updateUser.userId = data.userId;
      this.updateUser.name = data.name;
    },
    updateUserData() {
      this.dialogFormVisible1 = false;
      updateUserData(this.updateUser).then(res => {
        console.log(res);
        if (res.ret == "SUCCESS") {
          this.clickEnter();
        }
      });
    },
    delectUser() {
      this.dialogFormVisible2 = false;
      delectUser(this.updateUser.userId).then(res => {
        console.log(res);
        if (res == "SUCCESS") {
          this.clickEnter();
        }
      });
    },
    uploadSuccess(file) {
      uploadUser(file).then(res => {
        console.log(res);
        if (res == "SUCCESS") {
          this.clickEnter();
        }
      });
    },
    userTypeName(row) {
      return row.userType == 0 ? "管理员" : row.userType == 1 ? "学生" : "教师";
    }
  }
};
</script>
<style lang='scss' scoped>
</style>