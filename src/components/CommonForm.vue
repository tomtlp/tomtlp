<template>
  <div>
    <el-form ref="form" label-width="100px" :model="form" :inline="inline">
      <el-form-item
        v-for="item in formLabel"
        :key="item.label"
        :label="item.label"
      >
        <el-input
          v-if="item.type === 'input'"
          :placeholder="'请输入' + item.label"
          v-model="content[item.model]"
        >
        </el-input>

        <el-switch v-if="item.type === 'switch'" v-model="content[item.model]">
        </el-switch>
        <el-input-number  v-if="item.type === 'number'" v-model="content[item.model]">
        </el-input-number >

        <el-time-picker v-if="item.type === 'time'" v-model="content[item.model]"></el-time-picker>

        <el-date-picker
          v-if="item.type === 'date'"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          v-model="content[item.model]"
        ></el-date-picker>

        <el-select
          v-if="item.type === 'select'"
          placeholder="请选择"
          v-model="content[item.model]"
        >
          <el-option
            v-for="item in item.opts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 一个插槽 -->
      <el-form-item><slot></slot></el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "CommonForm",
  props: {
    //表单类型
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
  data() {
    return {
      content: this.form,
    };
  },
  watch: {
    content() {
      this.content = this.form;
    },
  },
};
</script>