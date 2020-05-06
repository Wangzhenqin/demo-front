<!--  -->
<template>
  <div style="width: 85vw">
    <el-table :data="timeDTOs" stripe border @row-click="rowClick" max-height="700">
      <el-table-column fixed prop="userId" label="操作人Id" width="120"></el-table-column>
      <el-table-column prop="event" label="事件" width="180"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" width="180" :formatter="timestampToTime"></el-table-column>
      <el-table-column prop="endTime" label="结束时间" width="180" :formatter="timestampToTime"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <el-button @click="dialogFormVisible1 = true" type="text" size="small">修改</el-button>
      </el-table-column>
    </el-table>
    <el-dialog title="修改事件时间" :visible.sync="dialogFormVisible1">
      <el-form :model="updateTime">
        <el-form-item label="操作人Id:">
          <el-input :disabled="true" v-model="updateTime.userId"></el-input>
        </el-form-item>
        <el-form-item label="事件:">
          <el-input :disabled="true" v-model="updateTime.event"></el-input>
        </el-form-item>
        <div>
          <span class="demonstration">开始时间:</span>
          <el-date-picker
            v-model="updateTime.startTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          ></el-date-picker>
        </div>
        <div>
          <span class="demonstration">结束时间:</span>
          <el-date-picker
            v-model="updateTime.endTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          ></el-date-picker>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="clickEnter">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
      :page-size="page.pageSize"
      :page-sizes="[10, 1, 20, 50]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getimeList, updateTime } from "network/time";
export default {
  data() {
    return {
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 10
      },

      timeDTOs: [],
      dialogFormVisible1: false,

      updateTime: {
        userId: null,
        event: null,
        startTime: null,
        endTime: null
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
      console.log(this.updateTime);
      this.dialogFormVisible1 = false;
      updateTime(
        this.$store.state.user.userId,
        this.updateTime.event,
        this.updateTime.startTime,
        this.updateTime.endTime
      ).then(res => {
        console.log(res);
        if (res == "SUCCESS") {
          this.getimeList();
        }
      });
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
      console.log(data);
      this.updateTime.userId = this.$store.state.user.userId;
      this.updateTime.event = data.event;
      this.updateTime.startTime = data.startTime;
      this.updateTime.endTime = data.endTime;
    },
    timestampToTime(row, column) {
      let date = null;
      if (column.property == "startTime") {
        date = new Date(row.startTime);
      } else {
        date = new Date(row.endTime);
      }

      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D = date.getDate() + " ";
      let h = date.getHours() + ":";
      let m = date.getMinutes() + ":";
      let s = date.getSeconds();
      return Y + M + D + h + m + s;
    },
    getimeList() {
      console.log(this.page.pageNum);
      getimeList(this.page.pageNum, this.page.pageSize).then(res => {
        console.log(res);
        if (res.ret == "SUCCESS") {
          this.timeDTOs = res.timeDTOS;
          this.total = res.total;
        }
      });
    }
  },
  mounted() {
    this.getimeList();
  }
};
</script>
<style lang='scss' scoped>
</style>