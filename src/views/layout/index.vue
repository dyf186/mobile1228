<template>
  <div class="container">
    <van-nav-bar
      fixed
      title="这个头条"
      right-text="搜索"
      @click-right="$router.push('/search')"
      v-if="showNavBar"
    />
    <div class="my-wrapper" :class="{ noTop: !showNavBar }">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">
        {{ $store.state.user.token ? "我的" : "未登录" }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {
    showNavBar() {
      return this.$route.path !== "/user";
    },
    userGo: function () {
      return this.$store.state.user.token ? "/user" : "/login";
    },
  },
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop {
      padding-top: 0;
    }
  }
}
</style>
