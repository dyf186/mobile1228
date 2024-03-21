import request from "@/utils/request";

// 搜索关键字
export function apiSuggestionList({ q }) {
  return request({
    url: "/app/v1_0/suggestion",
    method: "get",
    params: {
      q,
    },
  });
}
// 搜索关键字
export function apiSearchList({ q, page = 1, per_page = 10 }) {
  return request({
    url: "/app/v1_0/search",
    method: "get",
    params: {
      q,
      page,
      per_page,
    },
  });
}
