import request from "@/utils/request.js";
export function apiArticleList({ channel_id, timestamp }) {
  return request({
    url: "/app/v1_1/articles",
    method: "get",
    params: {
      channel_id,
      timestamp,
      with_top: 1,
    },
  });
}
// 对不感兴趣的文章做处理
export function apiArticleDislike(articleID) {
  return request({
    url: "/app/v1_0/article/dislikes",
    method: "post",
    data: {
      target: articleID,
    },
  });
}
// 对文章做举报处理
export function apiArticleReport({ aritcleID, type, remark = "" }) {
  return request({
    url: "/app/v1_0/article/reports",
    method: "post",
    data: {
      target: articleID,
      type,
      remark,
    },
  });
}
