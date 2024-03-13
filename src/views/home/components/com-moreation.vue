<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input', $event)"
      :show-confirm-button="false"
      close-on-click-overlay
      @close="isOneLevel = true"
    >
      <van-cell-group v-if="isOneLevel">
        <van-cell
          icon="location-o"
          title="不敢兴趣"
          @click="articleDislike()"
        ></van-cell>
        <van-cell
          icon="location-o"
          title="反馈垃圾内容"
          is-link
          @click="isOneLevel = false"
        ></van-cell>
        <van-cell icon="location-o" title="拉黑作者"></van-cell>
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isOneLevel = true"></van-cell>
        <van-cell
          icon="location-o"
          v-for="(item, index) in reportsList"
          :key="index"
          :title="item.title"
          @click="articleReport(item.value)"
        ></van-cell>
      </van-cell-group>
    </van-dialog>
  </div>
</template>
<script>
import { apiArticleDislike, apiArticleReport } from "@/api/article";

export default {
  name: "com-moreation",
  components: {},
  mixins: [],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    articleID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      show: true,
      isOneLevel: true,
      reportsList: [
        { title: "其他问题", value: 0 },
        { title: "标题夸张", value: 1 },
        { title: "低俗色情", value: 2 },
        { title: "错别字多", value: 3 },
        { title: "旧闻重复", value: 4 },
        { title: "广告软文", value: 5 },
        { title: "内容不实", value: 6 },
        { title: "涉嫌违法犯罪", value: 7 },
        { title: "侵权", value: 8 },
      ],
    };
  },
  computed: {},
  filters: {},
  watch: {
    //aa(newV,oldV) {}
    //bb:{
    //handler(newV,oldV) {},
    //deep: true
    //},
    //'dd.ee.ff'(newV,oldV) {}
  },
  methods: {
    articleReport(type) {
      const obj = { articleID: this.articleID, type };
      this.$toast.success("举报成功");
      this.$emit("input", false);
    },
    articleDislike() {
      console.log("123", this.articleID);
      this.$toast.success("处理成功");
      this.$emit("input", false);
      this.$emit("dislikeSuccess");
    },
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped></style>
