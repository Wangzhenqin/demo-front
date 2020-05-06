<!--  -->
<template>
  <div>
    <el-form label-width="40vw">
      <el-form-item label="账号:">
        <el-input v-model="userId"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="pass">
        <el-input type="password" v-model="code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="clickEnter()">登入</el-button>
        <el-button @click="reset()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { enter, getDirectory, getFaculty } from "network/enter";
export default {
  data() {
    return {
      userId: null,
      code: null
    };
  },

  methods: {
    clickEnter() {
      enter(this.userId, this.code).then(res => {
        console.log(res);
        if (res.ret == "SUCCESS") {
          this.$store.commit("enter", res.userDTO);
          this.$router.replace("/home");
          this.getDirectory();
        } else {
          this.userId = null;
          this.code = null;
        }
      });
    },
    reset() {
      this.userId = null;
      this.code = null;
    },
    getDirectory() {
      if (this.$store.state.isEnter) {
        getDirectory(this.$store.state.user.userType).then(res => {
          this.$store.commit("getDirectory", res.directory);
          this.getFaculty();
          console.log(res);
        });
      } else {
        this.$router.replace("/enter");
      }
    },
    getFaculty() {
      getFaculty().then(res => {
        this.$store.commit("getFaculty", res.facultyDTOS);
        console.log(res);
      });
    }
  }
};
</script>
<style scoped>
</style>