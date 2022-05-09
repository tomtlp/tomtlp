<template>
  <header>
    <div class="l-content">
      <el-button
        @click="handleMenu"
        plain
        icon="el-icon-menu"
        size="mini"
      ></el-button>
      <!-- <h3 style="color: #fff">首頁</h3> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item class="myColor" v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="personCenter">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "CommonHeader",
  data() {
    return {
      userImg: require("../assets/images/user-default.png"),
    };
  },
  methods: {
    handleMenu() {
      //关闭Aside
      this.$store.commit("collapseMenu");
    },
    personCenter(){
        this.$router.push('/home')
    },
    logOut(){
        this.$store.commit('clearToken')
        this.$store.commit('clearMenu')
        this.$router.push('/login')
    }
  },
  computed: {
      ...mapState({
          tags:state =>state.tab.tabsList
      })
  }
};
</script>

<style lang="less" scoped>
// .myColor /deep/ .el-breadcrumb__inner {
//   color: #fff ;
// }
.el-breadcrumb  /deep/  .el-breadcrumb__inner 
      {
        color:#ccc !important;				//你想要设置的字体颜色
    }
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>>
