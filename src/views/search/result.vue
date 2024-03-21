<template>
  <div class="container">
    <van-nav-bar
      title="搜索结果"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item, index) in searchList"
        :key="index"
        :title="item.title"
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { apiSearchList } from "@/api/search";
export default {
  name: "search-result",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      page:1,// 页码
      per_page:10,// 条数
      searchList: [],
      loading: false,
      finished: false,
    };
  },
  computed: {
    q() {
      return this.$route.params.q;
    },
  },
  watch: {},
  created() {
    this.getSearchList();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    onLoad() {
      setTimeout(() => {
        this.searchList = this.searchList.concat(this.searchList);
        this.loading = false;
        if (this.searchList.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    async getSearchList() {
      if (true) {
        this.searchList = [
          {
            art_id: 66610,
            aut_id: 2,
            aut_name: "13323454l53",
            ch_id: 14,
            collect_count: 0,
            comm_count: 0,
            title: "sdfafefsdfefasdfasf1",
            pubdate: "2018-11-29T15:58:13",
          },
          {
            art_id: 66611,
            aut_id: 2,
            aut_name: "13323454l53",
            ch_id: 15,
            collect_count: 0,
            comm_count: 0,
            title: "sdfafefsdfefasdfasf2",
            pubdate: "2018-11-29T15:58:13",
          },
          {
            art_id: 66612,
            aut_id: 2,
            aut_name: "13323454l53",
            ch_id: 16,
            collect_count: 0,
            comm_count: 0,
            title: "sdfafefsdfefasdfasf3",
            pubdate: "2018-11-29T15:58:13",
          },
          {
            art_id: 66613,
            aut_id: 2,
            aut_name: "13323454l53",
            ch_id: 17,
            collect_count: 0,
            comm_count: 0,
            title: "sdfafefsdfefasdfasf4",
            pubdate: "2018-11-29T15:58:13",
          },
          {
            art_id: 66614,
            aut_id: 2,
            aut_name: "13323454l53",
            ch_id: 18,
            collect_count: 0,
            comm_count: 0,
            title: "sdfafefsdfefasdfasf5",
            pubdate: "2018-11-29T15:58:13",
          },
          {
            art_id: 66615,
            aut_id: 2,
            aut_name: "13323454l53",
            ch_id: 19,
            collect_count: 0,
            comm_count: 0,
            title: "sdfafefsdfefasdfasf6",
            pubdate: "2018-11-29T15:58:13",
          },
          {
            art_id: 66616,
            aut_id: 2,
            aut_name: "13323454l53",
            ch_id: 20,
            collect_count: 0,
            comm_count: 0,
            title: "sdfafefsdfefasdfasf7",
            pubdate: "2018-11-29T15:58:13",
          },
          {
            art_id: 66617,
            aut_id: 2,
            aut_name: "13323454l53",
            ch_id: 21,
            collect_count: 0,
            comm_count: 0,
            title: "sdfafefsdfefasdfasf8",
            pubdate: "2018-11-29T15:58:13",
          },
        ];
      } else {
        let result = await apiSearchList({ q: this.q });
        this.searchList = result.results;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  .van-list {
    flex: 1;
    margin-top: 0px;
  }
}
</style>
