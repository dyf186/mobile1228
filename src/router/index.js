import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/views/layout/index.vue"), //一级路由
    redirect: "/home", //重定向
    children: [
      {
        path: "/home",
        component: () => import("@/views/home/index.vue"), //首页组件 二级路由
      },
      {
        path: "/question",
        component: () => import("@/views/question/index.vue"), //问答组件 二级路由
      },
      {
        path: "/video",
        component: () => import("@/views/video/index.vue"), //视频组件 二级路由
      },
      {
        path: "/user",
        component: () => import("@/views/user/index.vue"), //个人中心 二级路由
      },
    ],
  },
  {
    path: "/user/profile",
    component: () => import("@/views/user/profile.vue"), //编辑资料
  },
  {
    path: "/user/chat",
    component: () => import("@/views/user/chat.vue"), //小智同学
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/user/login.vue"), //登录
  },
  {
    path: "/article/:aid",
    name:'article',
    component: () => import("@/views/article/index.vue"), //文章详情
  },
  {
    path: "/search",
    component: () => import("@/views/search/index.vue"), //搜索中心
  },
  {
    path: "/search/result/:q",// q是路由参数，搜素关键字
    name:'result',
    component: () => import("@/views/search/result.vue"), //搜索结果
  },
];

const router = new VueRouter({
  routes,
});

export default router;
