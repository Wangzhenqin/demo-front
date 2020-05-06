<!--  -->
<template>
  <div style="width: 85vw">
    <el-table :data="titleDTOS" stripe border @row-click="rowClick" max-height="700">
      <el-table-column fixed prop="titleName" label="题目名字" width="180"></el-table-column>
      <el-table-column prop="content" label="内容" width="180"></el-table-column>
      <el-table-column prop="teacherName" label="教师名字" width="180"></el-table-column>
      <el-table-column prop="facultyId" label="学科" width="180" :formatter="facultyName"></el-table-column>
      <el-table-column label="状态" width="180" :formatter="statusName"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <el-upload class="upload-demo" :action="url" :on-success="uploadSuccess">
          <el-button type="text" size="small">提交</el-button>
        </el-upload>
      </el-table-column>
    </el-table>

    
  </div>
</template>

<script>
import { getStudentTitle } from "network/title";
import { uploadStudentFile } from "network/upload";
export default {
  data() {
    return {
      url:'./assets/file',
      titleDTOS: [],

      isUpload: null
    };
  },

  // computed:{
  //   pageTotal(){
  //     return this.total/this.page.pageSize
  //   }
  // },

  // mounted: {},

  methods: {
    uploadSuccess(file) {
      uploadStudentFile(this.titleDTOS[0].titleId,'STATUS_REPLY',file).then(
        res => {
          console.log(res);
          if (res == "SUCCESS") {
            this.isUpload=true
            this.getStudentTitle();
          }
        }
      );
    },
    rowClick(data) {
      console.log(data);
      this.selectTitleId = data.titleId;
    },
    statusName() {
      return this.isUpload? '已提交' : '未提交';
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
            this.uploadStudentFile();
          }
        }
      });
    },
    uploadStudentFile(){
      uploadStudentFile(this.titleDTOS[0].titleId,'STATUS_REPLY',null).then(res => {
        console.log(res);
        if (res.ret == "SUCCESS") {
          if (res.url == null) {
            this.isUpload=false
          } else {
            this.isUpload=true
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