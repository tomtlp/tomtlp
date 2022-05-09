<template>
  <div class="manage">
      <!-- 对话框新增用户或者编辑用户 -->
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '跟新用户'"
      :visible.sync="isShow"
    >    
      <!-- 通用表单组件 -->
      <common-form
        :formLabel="operateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      >
      </common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <!-- 通用表单组件 -->
      <common-form
        :formLabel="formLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword,1)">搜索</el-button>
      </common-form>
    </div>
    <!-- 用户表格 -->
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList1"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>
<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";
import { getUser } from "../../api/data";
export default {
  name: "User",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: "add",
      isShow: false,
      //对话框fom组件
      operateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      //查询form组件
      formLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      //表格信息
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          width: 200,
        },
        {
          prop: "addr",
          label: "地址",
          width: 320,
        },
      ],
      //分页配置信息
      config: {
          page:1,
          total:20
      },
    };
  },
  methods: {
    //   弹出框确定提交
    confirm() {
        //根据操作请求发送响应
      if (this.operateType === "edit") {
        this.$http.post("/user/edit", this.operateForm).then((res) => {
          console.log(res,"编辑数据返回");
          this.isShow = false;
          //更新数据
          this.getList();
        });
      } else {
        this.$http.post("/user/add", this.operateForm).then((res) => {
          console.log(res,"新增数据返回");
          this.isShow = false;
          //更新数据
          this.getList();
        });
      }
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    //用于搜索数据，跟新数据
    getList(name = '') {
      this.config.loading = true;
      name ? (this.config.page = 1) : '';
      getUser({
        page: this.config.page,
        name,
      }).then((res) => {
        console.log(res,"getList返回数据");
        this.tableData = res.list.map((item) => {
          item.sexLabel === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
      console.log(this.config,"config信息")
    },
    //用于数据分页，根据子组件val进行切换分页
    getList1(val) {
      this.config.loading = true;
      this.config.page = val
      getUser({
        page: this.config.page,
      }).then((res) => {
        this.tableData = res.list.map((item) => {
          item.sexLabel === 0 ? "女" : "男";
          return item;
        });
        this.config.total = res.count;
        this.config.loading = false;
      });
      console.log(this.config,"config")
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该组件", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("/user/del", {
            params: { id },
          })
          .then((res) => {
            console.log(res);
            this.$message({ type: "success", message: "删除成功" });
            this.getList();
          });
      });
    },
  },
  created() {
    //   数据跟新
    this.getList();
  },
};
</script>
<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>