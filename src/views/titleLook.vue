<!--  -->
<template>
  <div style="width: 85vw">
    <el-table :data="titleDTOS" stripe border @row-click="rowClick" max-height="700">
      <el-table-column fixed prop="titleName" label="题目名字" width="180"></el-table-column>
      <el-table-column prop="content" label="内容" width="180"></el-table-column>
      <el-table-column prop="teacherName" label="教师名字" width="180"></el-table-column>
      <el-table-column prop="facultyId" label="学科" width="180" :formatter="facultyName"></el-table-column>
      <el-table-column prop="status" label="状态" width="180" :formatter="statusName"></el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="dialogFormVisible1 = true"
            type="text"
            size="small"
            v-if="scope.row.status==1"
          >取消</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="确定要取消选择该毕业设计吗" :visible.sync="dialogFormVisible1">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="clickEnter">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { cancelTitle, getStudentTitle } from "network/title";
export default {
  data() {
    return {
      titleDTOS: [],
      dialogFormVisible1: false,

      selectTitleId: null
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
      this.dialogFormVisible1 = false;
      cancelTitle(this.$store.state.user.userId, this.selectTitleId).then(
        res => {
          console.log(res);
          if (res == "SUCCESS") {
            this.getStudentTitle();
          }
        }
      );
    },
    rowClick(data) {
      console.log(data);
      this.selectTitleId = data.titleId;
    },
    statusName(row) {
      console.log(row);
      return row.status == 0
        ? "未被选"
        : row.status == 1
        ? "等待教师确认"
        : "学生选题成功";
    },
    facultyName(row) {
      for (const value of this.$store.state.faculty) {
        if (value.facultyId == row.facultyId) {
          return value.facultyName;
        }
      }
    },
    getStudentTitle() {
      getStudentTitle(this.$store.state.user.userId, this.page).then(res => {
        console.log(res);
        if (res.ret == "SUCCESS") {
          if (res.title == null) {
            Object.assign(this.$data, this.$options.data());
          } else {
            this.titleDTOS = res.title;
          }
        }
      });
    }
  },
  mounted() {
    this.getStudentTitle();
  }
};
</script>
<style lang='scss' scoped>
</style>