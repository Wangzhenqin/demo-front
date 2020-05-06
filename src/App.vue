<template>
  <div id="app">
    <el-container style="height: auto; border: 1px solid #eee">
      <el-header style="text-align: right; font-size: 12px">
        <span style="float :left; font-size:20px">毕业设计管理选题系统</span>
        <el-dropdown v-if="$store.state.isEnter">
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <div @click="exit">
              <el-dropdown-item>退出</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{$store.state.user.name}}</span>
      </el-header>
      <el-container style="height: 740px; border: 1px solid #eee">
        <tab-bar></tab-bar>
        <router-view ></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TabBar from "./components/tabbar/tab";
export default {
  name: "App",
  components: {
    TabBar
  },
  data() {
    return {
      success: null,
    };
  },
  methods: {
    exit() {
      Object.assign(this.$data, this.$options.data());
      this.$store.commit('exit');
      this.$router.replace("/enter");
    }
  },
  created() {
    this.$store.commit('exit');
    this.$router.replace("/enter");
  }
};
</script>

<style>
@import "assets/css/base.css";
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>
