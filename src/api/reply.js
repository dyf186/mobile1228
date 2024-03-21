import request from "@/utils/request";

export function apiReplyList({ commentID, lastID }) {
  return request({
    url: "/app/v1_0/comments",
    method: "get",
    params: {
      type: "c",
      source: commentID,
      offset: lastID,
      limit: 10,
    },
  });
}

// 添加评论或回复
export function apiAddCorR({ target, content, art_id = null }) {
  return request({
    rul: "/app/v1_0/comments",
    method: "POST",
    data: {
      target,
      content,
      art_id,
    },
  });
}
