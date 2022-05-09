<template>
<!-- el-contain布局 -->
  <el-container style="height: 100%">
    <el-aside width="auto">
      <!-- 侧边栏 -->
        <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
      <!-- 顶部栏 -->
        <common-header></common-header>
      </el-header>
      <!-- 面包屑组件 -->
      <common-tag></common-tag>
      <el-main>
      <!-- 组件路由 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
// 引入公共组件
import CommonAside from '../src/components/CommonAside.vue'
import CommonHeader from'../src/components/CommonHeader.vue'
import CommonTag from '../src/components/CommonTag.vue'
export default {
  name: "home",
  components:{
      CommonAside,
      CommonHeader,
      CommonTag,
  },
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
// 设置公共样式
.el-header{
    background-color: #333;
}
.el-main{
    padding-top: 0;
}
</style>