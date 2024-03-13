<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <van-tab
        :title="item.name"
        v-for="(item, index) in channelList"
        :key="index"
      >
        <com-article :channelID="item.id"></com-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { apiChannelList } from "@/api/channel.js";
import comArticle from "./components/com-article.vue";
export default {
  name: "home",
  components: {
    comArticle,
  },
  mixins: [],
  props: {},
  data() {
    return {
      activeChannelIndex: 0,
    };
  },
  computed: {},
  watch: {},
  created() {
    if (
      !this.$store.state.user.refresh_token &&
      !this.$store.state.user.token
    ) {
      this.$router.push("/login");
    }
    this.getChannelList();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getChannelList() {
      // const result = await apiChannelList();
      // console.log(result.channels);
      this.channelList = [
        { name: "推荐", id: "12" },
        { name: "后端", id: "13" },
        { name: "linux", id: "14" },
        { name: "人工智能", id: "15" },
        { name: "前端", id: "16" },
      ];
    },
  },
};
</script>

<style lang="less" scoped>
.van-tabs {
  display: flex;
  flex-direction: column;
  height: 100%;
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
  }
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
