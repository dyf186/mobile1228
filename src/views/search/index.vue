<template>
  <div class="container">
    <van-nav-bar
      title="搜索中心"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-search
      v-model.trim="searchText"
      placeholder="请输入关键词"
      @search="onSearch(searchText)"
    ></van-search>
    <van-cell-group v-if="suggestionList.length > 0">
      <van-cell
        v-for="(item, k) in suggestionList"
        :key="k"
        title="单元格"
        icon="search"
        @click="onSearch(item)"
      >
        <div slot="title" v-html="heighlightCell(item, searchText)"></div>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon
          @click="isDeleteData = true"
          v-show="!isDeleteData"
          slot="right-icon"
          name="delete"
          style="line-height: inherit"
        ></van-icon>
        <div v-show="isDeleteData">
          <span style="margin-right: 10px" @click="delAllSuggest()"
            >全部删除</span
          >
          <span @click="isDeleteData = false">完成</span>
        </div>
      </van-cell>
      <van-cell
        v-for="(item, index) in suggestHistories"
        :key="index"
        :title="item"
      >
        <van-icon
          v-show="isDeleteData"
          slot="right-icon"
          name="close"
          style="line-height: inherit"
          @click="delSuggest(index)"
        ></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
const SH = "suggest-histories";
import { apiSuggestionList } from "@/api/search";
export default {
  name: "search",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      suggestHistories: JSON.parse(localStorage.getItem(SH)) || [],
      isDeleteData: false,
      searchText: "", // 搜索关键字
      suggestionList: [], // 关键字列表
    };
  },
  computed: {},
  watch: {
    searchText: async function (newV) {
      if (!newV) {
        this.suggestionList = [];
        return false;
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(async () => {
        if (true) {
          this.suggestionList = ["vue", "vuesfsf"];
        } else {
          const result = await apiSuggestionList({ q: newV });
          this.suggestionList = result.option;
        }
      }, 1000);
    },
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    delAllSuggest() {
      this.suggestHistories = [];
      localStorage.removeItem(SH);
    },
    delSuggest(k) {
      this.suggestHistories.splice(k, 1);
      localStorage.setItem(SH, JSON.stringify(this.suggestHistories));
    },
    onSearch(keywords) {
      if (!keywords) {
        return false;
      }
      const data = new Set(this.suggestHistories);
      data.add(keywords);
      this.suggestHistories = Array.from(data);
      localStorage.setItem(SH, JSON.stringify(this.suggestHistories));
      this.$router.push({ name: "result", params: { q: keywords } });
    },
    heighlightCell(item, keywords) {
      const reg = new RegExp(`${keywords}`, "i");
      const rst = item.match(reg);
      return item.replace(reg, `<span style="color:red">${rst[0]}</span>`);
    },
  },
};
</script>

<style lang="less" scoped></style>
