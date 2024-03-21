<template>
  <div class="scroll-wrapper">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="downSuccessText"
      :success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          @click="
            $router.push({
              name: 'article',
              params: { aid: item.art_id.toString() },
            })
          "
        >
          <template slot="label">
            <van-grid
              :border="false"
              v-if="item.cover.type > 0"
              :column-num="item.cover.type"
            >
              <van-grid-item v-for="(item2, k2) in item.cover.images" :key="k2">
                <van-image
                  width="90"
                  height="90"
                  :src="item2"
                  lazy-load
                ></van-image>
              </van-grid-item>
            </van-grid>
            <p>
              <van-icon
                name="close"
                style="float: right; margin-top: 8px"
                @click.stop="displayDialog(item.art_id.toString())"
              ></van-icon>
              <span>作者：</span>
              &nbsp;
              <span>评论：</span>
              &nbsp;
              <span>时间：</span>
            </p>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
    <more-ation
      v-model="showDialog"
      :articleID="nowArticleID"
      @dislikeSuccess="handleDislikeSuccess"
    ></more-ation>
  </div>
</template>
<script>
import { apiArticleList } from "@/api/article.js";
import MoreAtion from "./com-moreation.vue";
export default {
  name: "com-article",
  components: {
    MoreAtion,
  },
  mixins: [],
  props: {
    channelID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      downSuccessText: "",
      nowArticleID: "", // 不感兴趣ID
      showDialog: false,
      articleList: [],
      ts: 1,
      isLoading: false,
      loading: false,
      finished: false,
    };
  },
  computed: {},
  filters: {},
  watch: {},
  methods: {
    handleDislikeSuccess() {
      const index = this.articleList.findIndex(
        (item) => item.art_id.toString() == this.nowArticleID
      );
      this.articleList.splice(index, 1);
    },
    displayDialog(artID) {
      this.showDialog = true;
      this.nowArticleID = artID;
    },
    getArticleList() {
      console.log(this.ts);
      // const result = await apiArticleList({
      //     channel_id:this.channelID,
      //     timestamp:this.ts
      // })
      return [
        { title: "12", art_id: 34341234, cover: { type: 0, images: "" } },
        { title: "13", art_id: 314341234, cover: { type: 0, images: "" } },
        { title: "14", art_id: 341341234, cover: { type: 0, images: "" } },
        { title: "15", art_id: 343141234, cover: { type: 0, images: "" } },
        { title: "16", art_id: 343411234, cover: { type: 0, images: "" } },
        { title: "17", art_id: 343411234, cover: { type: 0, images: "" } },
        { title: "18", art_id: 343412134, cover: { type: 0, images: "" } },
        { title: "19", art_id: 343412314, cover: { type: 0, images: "" } },
        { title: "20", art_id: 343412341, cover: { type: 0, images: "" } },
        { title: "21", art_id: 134341234, cover: { type: 0, images: "" } },
        { title: "22", art_id: 1134341234, cover: { type: 0, images: "" } },
        { title: "23", art_id: 1314341234, cover: { type: 0, images: "" } },
        { title: "24", art_id: 1341341234, cover: { type: 0, images: "" } },
        { title: "25", art_id: 1343411234, cover: { type: 0, images: "" } },
        { title: "26", art_id: 1343412134, cover: { type: 0, images: "" } },
      ];
    },
    onRefresh() {
      // this.$sleep(800);
      this.ts = 1;
      setTimeout(() => {
        this.onLoad();
        if (this.articleList.length > 0) {
          this.downSuccessText = "文章更新成功";
        } else {
          this.downSuccessText = "文章已经是最新的";
        }
        this.isLoading = false;
        this.$toast("刷新成功");
      }, 1000);
    },
    onLoad() {
      const articles = this.getArticleList();
      if (articles.length > 0) {
        if (this.ts === 1) {
          this.articleList = articles;
        } else {
          this.articleList.push(...articles);
        }
        this.ts++;
      } else {
        this.finished = true;
      }
      this.loading = false;
    },
  },
  beforeCreate() {},
  created() {
    this.onLoad();
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
};
</script>
<style lang="less" scoped>
.scroll-wrapper {
  height: 100%;
  overflow: scroll;
  .van-list {
    height: 100%;
    // overflow: scroll;
  }
}
</style>
