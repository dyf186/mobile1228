import store from "@/store";

const CHANNEL_KEY_TRAVEL = "hm-channel-travel"; // 游客key
const CHANNEL_KEY_VIP = "hm-channel-vip"; // 登录用户key
import request from "@/utils/request.js";
import { stringify } from "postcss";

// 获取用户频道数据
export function apiChannelList() {
  // return new Promise(async (resolve) => {
  const key = store.state.user.token ? CHANNEL_KEY_VIP : CHANNEL_KEY_TRAVEL;
  //   const localChannels = localStorage.getItem(key);
  //   if (localChannels) {
  //     resolve({ channels: JSON.parse(localChannels) });
  //   } else {
  //     const result = await request({
  //       url: "/app/v1_0/user/channels",
  //       method: "get",
  //     });
  //     localStorage.setItem(key, JSON.stringify(result.channels));
  //     resolve(result);
  //   }
  // });
  let channels = [
    { name: "推荐", id: "22" },
    { name: "后端", id: "10" },
    { name: "linux", id: "4" },
    { name: "人工智能", id: "11" },
    { name: "前端", id: "13" },
  ];
  if (!localStorage.getItem(key).length) {
    localStorage.setItem(key, JSON.stringify(channels));
  }
  return "123";
}
// 获取所有频道数据
export function apiChannelAll() {
  return request({
    url: "/app/v1_0/channels",
    method: "get",
  });
}
// this.channelAll = [
//   { name: "c++", id: "0" },
//   { name: "android", id: "1" },
//   { name: "css", id: "2" },
//   { name: "go", id: "3" },
//   { name: "linux", id: "4" },
//   { name: "php", id: "5" },
//   { name: "javascript", id: "6" },
//   { name: "python", id: "7" },
//   { name: "区块链", id: "8" },
//   { name: "产品", id: "9" },
//   { name: "后端", id: "10" },
//   { name: "人工智能", id: "11" },
//   { name: "架构", id: "12" },
//   { name: "前端", id: "13" },
//   { name: "算法", id: "14" },
//   { name: "面试", id: "15" },
//   { name: "科技动态", id: "16" },
//   { name: "设计", id: "17" },
//   { name: "数码产品", id: "18" },
// ];

// 添加频道
export function apiChannelAdd(channel) {
  // return new Promise(function (resolve) {
  let key = store.state.user.token ? CHANNEL_KEY_VIP : CHANNEL_KEY_TRAVEL;
  let localChannels = localStorage.getItem(key);
  let channels = JSON.parse(localChannels);
  channels.push(channel);
  localStorage.setItem(key, JSON.stringify(channels));
  //   resolve();
  // });

  return "123";
}
// 删除频道
export function apiChannelDel(id) {
  const key = store.state.user.token ? CHANNEL_KEY_VIP : CHANNEL_KEY_TRAVEL;
  let localChannels = localStorage.getItem(key);
  let channels = JSON.parse(localChannels);
  channels = channels.filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(channels));
  return "123";
}
