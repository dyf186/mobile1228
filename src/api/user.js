//导入axios模块
import request from '@/utils/request.js'
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

export default function apiUserLogin ({ mobile, code }) {
    // 请求axios，request就是axios的复制品，操作结构完全一致
    // return 返回执行结果，是promise对象
    return request({
      url: '/app/v1_0/authorizations',
      method: 'post',
      data: {
        // 对象成员简易赋值
        mobile, // mobile:mobile
        code // code:code
      }
      // params: get请求成员标志
      // data: 非get请求成员标志
    })
  }