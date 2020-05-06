<!--  -->
<template>
  <div style="width: 85vw">
    <el-table :data="titleDTOS" stripe border @row-click="rowClick" max-height="700">
      <el-table-column fixed prop="titleId" label="题目Id" width="120"></el-table-column>
      <el-table-column prop="titleName" label="题目名字" width="180"></el-table-column>
      <el-table-column prop="content" label="内容" width="180"></el-table-column>
      <el-table-column prop="teacherName" label="教师名字" width="180"></el-table-column>
      <el-table-column prop="facultyId" label="学科" width="180" :formatter="facultyName"></el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <el-button @click="dialogFormVisible1 = true" type="text" size="small">选择</el-button>
      </el-table-column>
    </el-table>
    <el-dialog title="确定要选择该毕业设计吗" :visible.sync="dialogFormVisible1">
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
import { getTitleList, selectTitle } from "network/title";
export default {
  data() {
    return {
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 10
      },

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
      const h = this.$createElement;
      this.dialogFormVisible1 = false;
      selectTitle(this.$store.state.user.userId, this.selectTitleId).then(
        res => {
          console.log(res);
          if (res == "SUCCESS") {
            this.getTitleList();
          } else {
            this.$notify({
              title: "选题失败",
              message: h("i", { style: "color: teal" }, "你无法选择该题目")
            });
          }
        }
      );
    },
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getTitleList();
    },
    handleCurrentChange(val) {
      this.page.pageNum = val;
      this.getTitleList();
    },
    rowClick(data) {
      console.log(data);
      this.selectTitleId = data.titleId;
    },
    facultyName(row) {
      console.log(row);
      for (const value of this.$store.state.faculty) {
        if (value.facultyId == row.facultyId) {
          return value.facultyName;
        }
      }
    },
    getTitleList() {
      getTitleList(this.$store.state.user.userId, this.page).then(res => {
        console.log(res);
        if (res.ret == "SUCCESS") {
          this.titleDTOS = res.title;
          this.total = res.total;
        }
      });
    }
  },
  mounted() {
    this.getTitleList();
  }
};
</script>
<style lang='scss' scoped>
</style>