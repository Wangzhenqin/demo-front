<template>
  <div v-if="$store.state.isEnter">
    <el-aside width="15vw" style="height: 100%;background-color: rgb(238, 241, 246)">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item v-for="(item,index) in $store.state.directory" index="index" :key="index">
          <div @click="itemClick(item)">
            <span>{{item.name}}</span>
          </div>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>
<script>
import { judgeComeInModule } from "network/user";
export default {
  props: {
    
  },
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    itemClick(item) {
      const h = this.$createElement;
      judgeComeInModule(this.$store.state.user.userId,item.management).then(
        res => {
          console.log('res:'+res);
          if (res == "SUCCESS") {
            this.$router.replace(item.path);
          }else{
            this.$notify({
          title: '跳转失败',
          message: h('i', { style: 'color: teal'}, item.name+'还未开启')
        });
          }
        }
      );
    }
  }
};
</script>

<style>
</style>