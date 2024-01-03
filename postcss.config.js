module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      // 根值：默认是37.5，来自于设计稿大小的10分之一
      rootValue: 37.5, // 根植对应设计稿宽375px
    //   rootValue: 75, // 根植对应设计稿宽750px
      propList: ["*"],
    },
  },
};
// 暂时报错
// const {
//     sep
//   } = require('path')
  
//   module.exports = ({
//     file
//   }) => {
//     const rootValue = file.dirname.indexOf(`node_modules${sep}vant`) !== -1
//       ? 37.5
//       : 75
  
//     return {
//       plugins: {
//         autoprefixer: {},
//         'postcss-pxtorem': {
//           rootValue,
//           propList: ['*']
//         }
//       }
//     }
//   }
  