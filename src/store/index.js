import Vue from "vue";
import Vuex from "vuex";
import router from "@/router/index.js";

Vue.use(Vuex);
// localStorage 存储用户信息的key名称，统一设置，方便后续使用
const USER_KEY = "hm-toutiao-m-user";

export default new Vuex.Store({
  state: {
    // 通过 || 设定，如果local Storage没有数据，就返回{}对象
    user: JSON.parse(localStorage.getItem(USER_KEY) || "{}"),
  },
  getters: {},
  mutations: {
    // 修改/更新用户信息
    // data:{token:xx,refresh_token:xx}
    updateUser(state, data) {
      // vuex做更新，使得有响应式
      state.user = data;
      // local Storage做持久更新
      localStorage.setItem(USER_KEY, JSON.stringify(data));
    },
    // 清除用户信息
    clearUser(state) {
      // vuex做清除，使得有响应式
      state.user = {};
      // local Storage做持久清除
      localStorage.removeItem(USER_KEY);
      router.push("/login");
    },
    // 删除token数据
    clearToken(state) {
      console.log("667");
      delete state.user.token;
      localStorage.removeItem(USER_KEY);
      router.push("/login");
    },
  },
  actions: {},
  modules: {},
});
