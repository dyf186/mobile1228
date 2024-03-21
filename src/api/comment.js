import request from "@/utils/request.js";

export function apiCommentList({ articleID, commentID }) {
  return request({
    url: "/app/v1_0/comments",
    method: "GET",
    params: {
      type: "a",
      source: articleID,
      offset: commentID,
      limit: 10,
    },
  });
}
