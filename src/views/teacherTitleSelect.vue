<!--  -->
<template>
  <div style="width: 85vw">
    <el-table :data="titleDTOS" stripe border @row-click="rowClick" max-height="700">
      <el-table-column fixed prop="titleName" label="题目名字" width="180"></el-table-column>
      <el-table-column prop="content" label="内容" width="180"></el-table-column>
      <el-table-column prop="studentId" label="学生Id" width="180"></el-table-column>
      <el-table-column prop="studentName" label="学生名字" width="180"></el-table-column>
      <el-table-column prop="facultyId" label="学科" width="180" :formatter="facultyName"></el-table-column>
      <el-table-column prop="status" label="选题状态" width="180" :formatter="statusName"></el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            @click="dialogFormVisible1 = true"
            type="text"
            size="small"
            v-if="scope.row.status==1"
          >确认学生</el-button>
          <el-button
            @click="dialogFormVisible2 = true"
            type="text"
            size="small"
            v-if="scope.row.status==1"
          >取消选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="确定要选择该学生吗" :visible.sync="dialogFormVisible1">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="selectStudnet">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="确定要取消该学生的选择吗" :visible.sync="dialogFormVisible2">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="cancelStudent">确 定</el-button>
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
import {
  confirmStudentTitle,
  cancelStudentTitle,
  getTeacherTitle
} from "network/title";
export default {
  data() {
    return {
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 1
      },
      titleDTOS: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
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
    selectStudnet() {
      const h = this.$createElement;
      this.dialogFormVisible1 = false;
      confirmStudentTitle(this.selectTitleId).then(res => {
        console.log(res);
        if (res == "SUCCESS") {
          this.getTeacherTitle();
        } else if (res == "TITLE_STATUS_ERROR") {
          this.$notify({
            title: "确认学生失败",
            message: h(
              "i",
              { style: "color: teal" },
              "你无法选择该学生进行该题目"
            )
          });
        }
      });
    },
    cancelStudent() {
      this.dialogFormVisible2 = false;
      cancelStudentTitle(this.selectTitleId).then(res => {
        console.log(res);
        if (res == "SUCCESS") {
          this.getTeacherTitle();
        }
      });
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getTeacherTitle();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getTeacherTitle();
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
    getTeacherTitle() {
      getTeacherTitle(this.$store.state.user.userId, this.page).then(res => {
        console.log(res);
        if (res.ret == "SUCCESS") {
          if (res.title == null) {
            Object.assign(this.$data, this.$options.data());
          } else {
            this.titleDTOS = res.title;
            this.total = res.total;
          }
        }
      });
    }
  },
  mounted() {
    this.getTeacherTitle();
  }
};
</script>
<style lang='scss' scoped>
</style>