<template>
  <div>
    <div class="btn">
      <el-button type="primary" icon="el-icon-circle-plus">增加</el-button>
      <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
    </div>
    <div class="user-table">
      <!-- 数据表 -->
      <el-table
       ref="multipleTable"
       :data="tableData" 
       class="table"
       @selection-change="handleSelectionChange" 
       border>
        <el-table-column
          type="selection"
          width="60"
          align="center">
        </el-table-column>
        <el-table-column 
        v-for="(col,index) in cols" 
        :key="index"
        :property="col.prop" 
        :label="col.label"
        align="center"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="250"
          align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick_look(scope.row)" type="primary" size="small">查看</el-button>
            <el-button @click="handleClick_edit(scope.row)" type="warning" size="small">编辑</el-button>
            <el-button @click="handleClick_delete(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据表
      tableData: [],
      cols: [],

      multipleSelection: [],
    }
  },
  created() {
    this.getUser()
  },
  methods: {

    // 获取数据
    getUser() {
      this.$http.post('user-select').then( result => {
        console.log(result);
        if (result.body.status == 200) {
          var users = result.body.users;
          var tableData = users;
          var cols = [];
          for (var key in users[0]) {
            var title = '';
            if (key == 'account') {
              title = '用户名';
            } else if (key == 'password') {
              title = '密码';
            } else if (key == 'phone') {
              title = '手机号';
            } else if (key == 'email') {
              title = '邮箱';
            }
            cols.push({
              prop: key,
              label: title,
            })
          };
          this.tableData = tableData;
          this.cols = cols;
        }
      })
    },
    // 表格的选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(row) {
      console.log(row);
      this.multipleSelection = row;
    },

    // 查看
    handleClick_look(row) {
      console.log(row);
    },

    // 编辑
    handleClick_edit(row) {
      console.log(row);
    },

    // 删除
    handleClick_delete(row) {
      console.log(row);
    }


  }
}
</script>

<style lang="scss" scoped>
.btn {
  margin: 10px 0px 0px 30px;
  padding: 10px 0px 0px 30px;
}
.table {
  white-space: nowrap;
}
.user-table {
  margin: 5px;
  padding: 10px;
}
</style>