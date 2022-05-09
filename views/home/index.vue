<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <!-- 第一部分cart -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userInfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登入時間：<span>2021-1-1</span></p>
          <p>上次登入地點：<span>中山</span></p>
        </div>
      </el-card>
      <!-- 第二部分cart-table -->
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, index) in tableLabel"
            :key="index"
            :prop="index"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 第三部分info -->
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- chart_1 -->
      <el-card style="height: 280px">
        <div style="height: 280px" ref="echarts"></div>
      </el-card>
      <!-- chart_2_3 -->
      <div class="graph">
          <!-- chart_1 -->
        <el-card style="height: 260px">
          <div style="height: 240px" ref="UserEcharts"></div>
        </el-card>
          <!-- chart_2 -->
        <el-card style="height: 260px">
            <div style="height: 240px" ref="VideoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../../api/data.js";
import * as echarts from "echarts";
export default {
  name: "home",
  data() {
    return {
      userImg: require("../../src/assets/images/user-default.png"),
      //   tableData: [
      //     {
      //       name: "oppo",
      //       todayBuy: 100,
      //       monthBuy: 300,
      //       totalBuy: 800,
      //     },
      //     {
      //       name: "vivo",
      //       todayBuy: 100,
      //       monthBuy: 300,
      //       totalBuy: 800,
      //     },
      //     {
      //       name: "苹果",
      //       todayBuy: 100,
      //       monthBuy: 300,
      //       totalBuy: 800,
      //     },
      //     {
      //       name: "小米",
      //       todayBuy: 100,
      //       monthBuy: 300,
      //       totalBuy: 800,
      //     },
      //     {
      //       name: "三星",
      //       todayBuy: 100,
      //       monthBuy: 300,
      //       totalBuy: 800,
      //     },
      //     {
      //       name: "魅族",
      //       todayBuy: 100,
      //       monthBuy: 300,
      //       totalBuy: 800,
      //     },
      //   ],
      //tableData表格数据
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
    //   第三部分数据
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    };
  },
  mounted() {
    //通过getData_Api获取数据
    getData().then((res) => {
      const { code, data } = res;
      //如果请求成功
      if (code == 20000) {
        console.log("success!");
        console.log(res,'res-getData数据')
        console.log(data.tableData,'tableData');
        console.log(data.orderData,'orderData');
        //mock获取tableData
        this.tableData = data.tableData;
        //绘制折线图
        const orderData = data.orderData;
        //获得x轴信息
        const XData = orderData.date;
        //获取配置信息数据
        const keyArray = Object.keys(orderData.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: orderData.data.map((item) => item[key]),
            type: "line",
          });
        });
        const option = {
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            data: XData,
          },
          yAxis: {},
          legend: {
            data: keyArray,
          },
          series,
        };
        const E = echarts.init(this.$refs.echarts);
        E.setOption(option);

        // 用户图
        const userOption = {
          legend: {
            // 图例文字颜色
            textStyle: {
              color: "#333",
            },
          },
          grid: {
            left: "20%",
          },
          // 提示框
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category", // 类目轴
            data: data.userData.map((item) => item.date),
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
            axisLabel: {
              interval: 0,
              color: "#333",
            },
          },
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            },
          ],
          color: ["#2ec7c9", "#b6a2de"],
          series: [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ],
        };
        const E_user = echarts.init(this.$refs.UserEcharts);
        E_user.setOption(userOption);

        //饼图
        const videoOption = {
          tooltip: {
            trigger: "item",
          },
          color: [
            "#0f78f4",
            "#dd536b",
            "#9462e5",
            "#a6a6a6",
            "#e1bb22",
            "#39c362",
            "#3ed1cf",
          ],
          series: [
              {
                  data:data.videoData,
                  type: "pie"
              }
          ],
        };
        const E_video = echarts.init(this.$refs.VideoEcharts);
        E_video.setOption(videoOption);
      }
    });
  },
};
</script>