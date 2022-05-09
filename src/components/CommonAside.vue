<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>{{isCollapse ? '后台':'通用后台管理系統'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.label" :key="item.path">
      <i :class="'el-icon-' + item.icon" class="el-icon-menu"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    
    <el-submenu v-for="item in hasChildren" :index="item.label" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{item.label}}</span>
      </template>
      <el-menu-item-group v-for="(subItem) in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.label">{{subItem.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu{
    height:100%;
    border: none;
    h3 {
      color: #fff;
      text-align: center;
      line-height:48px;
    }
}
</style>

<script>
export default {
  data() {
    return {
    //   menu: [
    //     {
    //       path: "/",
    //       name: "home",
    //       label: "首页",
    //       icon: "s-home",
    //       url: "Home/Home",
    //     },
    //     {
    //       path: "/mall",
    //       name: "mall",
    //       label: "商品管理",
    //       icon: "video-play",
    //       url: "MallManage/MallManage",
    //     },
    //     {
    //       path: "/user",
    //       name: "user",
    //       label: "用户管理",
    //       icon: "user",
    //       url: "UserManage/UserManage",
    //     },
    //     {
    //       label: "其他",
    //       icon: "location",
    //       children: [
    //         {
    //           path: "/page1",
    //           name: "page1",
    //           label: "页面1",
    //           icon: "setting",
    //           url: "Other/PageOne",
    //         },
    //         {
    //           path: "/page2",
    //           name: "page2",
    //           label: "页面2",
    //           icon: "setting",
    //           url: "Other/PageTwo",
    //         },
    //       ],
    //     },
    //   ],
     menu:[]
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item){
        console.log(item.name)
        this.$router.push({
            name:item.name
        }
       )
       //更新menu信息
       this.$store.commit('selectMenu',item)
    }
  },
  computed: {
    noChildren() {
      //return this.menu.filter((item) => !item.children);
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
     return this.asyncMenu.filter((item) => item.children);
      //return this.menu.filter((item) => item.children);
    },
    //获取vuex的state.isCollapse属性
    isCollapse(){
        return this.$store.state.tab.isCollapse
    },
    //获得menu
    asyncMenu(){
       return this.$store.state.tab.menu
    }
  },
};
</script>
