import axios from "axios";
import JSONBig from "json-bigint";
import store from "@/store";
import router from "@/router/index.js";
const instance = axios.create({
  //请求跟地址
  baseURL: "http://ttapi.research.itcast.cn/",
  //请求完毕的数据（转换器），超大整型数字转换处理
  transformResponse: [
    function (data) {
      try {
        return JSONBig.parse(data);
      } catch (err) {
        return data;
      }
    },
  ],
});
// 请求拦截器
instance.interceptors.request.use(
  function (config) {
    console.log("请求拦截器");
    if (store.state.user.token) {
      config.headers.Authorization = "Bearer" + store.state.user.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
// 响应拦截器
instance.interceptors.response.use(
  function (response) {
    console.log("响应拦截器");
    try {
      return response.data.data;
    } catch (err) {
      return response.data;
    }
  },
  async function (error) {
    if (error.response.status === 401) {
      if (!store.state.user.refresh_token) {
        router.push("/login");
        return new Promise(function () {});
      }
      try {
        const result = await axios({
          method: "put",
          url: "http://ttapi.research.itcast.cn/app/v1_0/authorizations",
          // 配置token
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`,
          },
        });
        store.commit("updateUser", {
          token: result.data.data.token,
          refresh_token: store.state.user.refresh_token,
        });
        return instance(error.config);
      } catch (err) {
        store.commit("clearUser");
        router.push("/login");
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
export default instance;
