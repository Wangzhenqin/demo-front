<!--  -->
<template>
  <div style="width: 85vw">
    <el-form :inline="true">
      <el-form-item label="题目Id:">
        <el-input v-model="titleDTO.titleId"></el-input>
      </el-form-item>
      <el-form-item label="教师Id:">
        <el-input v-model="titleDTO.teacherId"></el-input>
      </el-form-item>
      <el-form-item label="学生Id:">
        <el-input v-model="titleDTO.studentId"></el-input>
      </el-form-item>
      <el-form-item label="题目状态:">
        <el-select v-model="titleDTO.status" placeholder="请选择">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <span style="float: left">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="学科:">
        <el-select v-model="titleDTO.facultyId" placeholder="请选择">
          <el-option
            v-for="item in $store.state.faculty"
            :key="item.facultyId"
            :label="item.facultyName"
            :value="item.facultyId"
          >
            <span style="float: left">{{ item.facultyName }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="clickEnter()">查询</el-button>
        <el-button @click="reset()">重置</el-button>
        <el-upload class="upload-demo" action="/src/assets/file" :on-success="uploadSuccess">
          <el-button size="small" type="primary">导入题目信息</el-button>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-table :data="titleDTOs" stripe border @row-click="rowClick" max-height="700">
      <el-table-column fixed prop="titleId" label="题目Id" width="120"></el-table-column>
      <el-table-column prop="titleName" label="题目名称" width="180"></el-table-column>
      <el-table-column prop="content" label="内容" width="180"></el-table-column>
      <el-table-column prop="teacherId" label="教师Id" width="180"></el-table-column>
      <el-table-column prop="teacherName" label="教师名称" width="180"></el-table-column>
      <el-table-column prop="studentId" label="学生Id" width="180"></el-table-column>
      <el-table-column prop="studentName" label="学生名称" width="180"></el-table-column>
      <el-table-column prop="status" label="选题状态" width="180" :formatter="statusName"></el-table-column>
      <el-table-column prop="facultyId" label="学科" width="180" :formatter="facultyName"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <el-button @click="dialogFormVisible1 = true" type="text" size="small">修改</el-button>
        <el-button @click="dialogFormVisible2 = true" type="text" size="small">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog title="修改题目信息" :visible.sync="dialogFormVisible1">
      <el-form :model="updateTitle">
        <el-form-item label="题目Id:">
          <el-input :disabled="true" v-model="updateTitle.titleId"></el-input>
        </el-form-item>
        <el-form-item label="题目名称:">
          <el-input v-model="updateTitle.titleName"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <el-input v-model="updateTitle.content"></el-input>
        </el-form-item>
        <el-form-item label="教师Id:">
          <el-input v-model="updateTitle.teacherId"></el-input>
        </el-form-item>
        <el-form-item label="学生Id:">
          <el-input v-model="updateTitle.studentId"></el-input>
        </el-form-item>
        <el-form-item label="题目状态:">
          <el-select v-model="updateTitle.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
              <span style="float: left">{{ item.label }}</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学科:">
          <el-select v-model="updateTitle.facultyId" placeholder="请选择">
            <el-option
              v-for="item in $store.state.faculty"
              :key="item.facultyId"
              :label="item.facultyName"
              :value="item.facultyId"
            >
              <span style="float: left">{{ item.facultyName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="updateTitleData">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="是否删除题目" :visible.sync="dialogFormVisible2">
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="delectTitle">确 定</el-button>
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
import { getTitleByDTO, updateTitleData, delectTitle } from "network/title";
import { uploadTitle } from "network/upload";
export default {
  data() {
    return {
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 1
      },
      titleDTO: {
        titleId: null,
        teacherId: null,
        studentId: null,
        status: null,
        facultyId: null
      },

      titleDTOs: [],
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      statusList: [
        {
          value: "0",
          label: "未被选"
        },
        {
          value: "1",
          label: "等待教师确认"
        },
        {
          value: "2",
          label: "学生选题成功"
        }
      ],
      updateTitle: {
        titleId: null,
        titleName: null,
        content: null,
        teacherId: null,
        studentId: null,
        status: null,
        facultyId: null
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
      console.log(this.titleDTO, this.page);
      getTitleByDTO(this.titleDTO, this.page).then(res => {
        console.log(res);
        if (res.ret == "SUCCESS") {
          this.titleDTOs = res.title;
          this.total = res.total;
        }
      });
    },
    reset() {
      const userList = this.titleDTOs;
      Object.assign(this.$data, this.$options.data());
      this.titleDTOs = userList;
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
      this.updateTitle.titleId = data.titleId;
      this.updateTitle.titleName = data.titleName;
      this.updateTitle.content = data.content;
      this.updateTitle.teacherId = data.teacherId;
      this.updateTitle.studentId = data.studentId;
      this.updateTitle.status = data.status;
      this.updateTitle.facultyId = data.facultyId;
    },
    statusName(row) {
      return row.status == 0
        ? "未被选"
        : row.status == 1
        ? "等待教师确认"
        : "学生选题成功";
    },
    facultyName(row) {
      console.log(row);
      for (const value of this.$store.state.faculty) {
        if (value.facultyId == row.facultyId) {
          return value.facultyName;
        }
      }
    },
    updateTitleData() {
      this.dialogFormVisible1 = false;
      updateTitleData(this.updateTitle).then(res => {
        console.log(res);
        if (res == "SUCCESS") {
          this.clickEnter();
        }
      });
    },
    delectTitle() {
      this.dialogFormVisible2 = false;
      delectTitle(this.updateTitle.titleId).then(res => {
        console.log(res);
        if (res == "SUCCESS") {
          this.clickEnter();
        }
      });
    },
    uploadSuccess(file) {
      uploadTitle(file).then(res => {
        console.log(res);
        if (res == "SUCCESS") {
          this.clickEnter();
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>