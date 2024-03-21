//导入axios模块
import request from "@/utils/request.js";
//创建登录api方法
// export function apiUserLogin ({mobile,code}){
//     return request({
//         url:'/api/v1_0/authorizations',
//         method:'post',
//         data:{
//             mobile,
//             code
//         }
//     })
// }

export default function apiUserLogin({ mobile, code }) {
  // 请求axios，request就是axios的复制品，操作结构完全一致
  // return 返回执行结果，是promise对象
  return request({
    url: "/app/v1_0/authorizations",
    method: "post",
    data: {
      // 对象成员简易赋值
      mobile, // mobile:mobile
      code, // code:code
    },
    // params: get请求成员标志
    // data: 非get请求成员标志
  });
}
//关注作者
export function apiFollow(target) {
  return request({
    url: "/app/v1_0/user/followings",
    method: "post",
    data: {
      target,
    },
  });
}
// 取消关注作者
export function apiUnFollow(target) {
  return request({
    url: `/app/v1_0/user/followings/${target}`,
    method: "delete",
  });
}

// 获取用户自己的信息
export const apiUserInfo = () => {
  return request({
    url: `/app/v1_0/user`,
    method: "GET",
  });
};

// 获取用户个人资料
export function apiUserProfile() {
  return request({
    url: "/app/v1_0/user/profile",
    method: "get",
  });
}

// 上传用户头像
export function apiUserPhoto(fdObj) {
  return request({
    url: "/app/v1_0/user/photo",
    method: "patch",
    data: fdObj,
  });
}

// 更新用户资料
export function apiSaveProfile({ name, gender, birthday }) {
  return request({
    url: "/app/v1_0/user/profile",
    data: {
      name,
      gender,
      birthday,
    },
    method: "patch",
  });
}
