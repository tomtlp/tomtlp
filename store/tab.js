import Cookie from "js-cookie";
export default {
  state: {
    isCollapse: false,
    //管理面包屑
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
    currentMenu: null,
    //动态路由信息
    menu: [],
  },
  mutations: {
    //关闭Aside
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    //面包屑路由
    selectMenu(state, val) {
      if (val.name !== "home") {
        state.currentMenu = val;
        const result = state.tabsList.findIndex(
          (item) => item.name === val.name
        );
        if (result === -1) {
          state.tabsList.push(val);
        }
      } else {
        state.currentMenu = null;
      }
    },
    //关闭面包屑
    closeTab(state, val) {
      //查询到删除
      const result = state.tabsList.findIndex((item) => item.name === val.name);
      state.tabsList.splice(result, 1);
    },

    // 管理动态路由
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    //Cookie 添加动态路由
    addMenu(state,router) {
      if (!Cookie.get("menu")) {
        return;
      }
      const menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      const menuArray = [];
      menu.forEach((item) => {
        //有子路由
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`../views/${item.url}`);
            return item
          });
          menuArray.push(...item.children)
        }
        //没有子路由
        else{
            item.component = () => import(`../views/${item.url}`)
            menuArray.push(item)
        }
      });
      //路由动态添加
      menuArray.forEach(item=>{
        router.addRoute('Main',item)
      })
    },
  },
};
