<template>
  <div class="container">
    <div class="user-profile">
      <div class="info">
        <van-image round src="https://img.yzcdn.cn/vant/cat.jpeg"></van-image>
        <h3 class="name">
          huazai
          <br />
          <van-tag size="mini">申请认证</van-tag>
        </h3>
      </div>
      <van-row>
        <van-col span="6">
          <p>0</p>
          <p>动态</p>
        </van-col>
        <van-col span="6">
          <p>0</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>0</p>
          <p>粉丝</p>
        </van-col>
        <van-col span="6">
          <p>0</p>
          <p>被赞</p>
        </van-col>
      </van-row>
    </div>
    <van-row class="user-links">
      <van-col span="8">
        <van-icon name="newspaper-o" color="#7af"></van-icon>我的作品
      </van-col>
      <van-col span="8">
        <van-icon name="star-o" color="#f00"></van-icon>我的收藏
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" color="#fa0"></van-icon>阅读历史
      </van-col>
    </van-row>
    <van-cell-group class="user-group">
      <van-cell
        icon="edit"
        title="编辑资料"
        to="/user/profile"
        is-link
      ></van-cell>
      <van-cell
        icon="chat-o"
        title="小智同学"
        to="/user/chat"
        is-link
      ></van-cell>
      <van-cell icon="setting-o" title="系统设置" is-link></van-cell>
      <van-cell
        icon="wrning-o"
        title="退出登录"
        @click="logout()"
        is-link
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { apiUserInfo } from "@/api/user";
export default {
  name: "user-index",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserInfo();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    logout() {
      if (true) {
        this.$dialog
          .confirm({
            title: "退出",
            message: "确定要退出吗？",
          })
          .then(() => {
            this.$store.commit("clearUser");
            this.$router.push("/login");
          })
          .catch((err) => {});
      }
    },
    async getUserInfo() {
      if (false) {
        this.userInfo = await apiUserInfo();
      } else {
        this.userInfo = {};
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  &-profile {
    width: 100%;
    height: 300px;
    display: block;
    background: #3296fa;
    color: #fff;
    .info {
      display: flex;
      padding: 40px;
      align-items: center;
      .van-image {
        width: 128px;
        height: 128px;
      }
      .name {
        font-size: 32px;
        font-weight: normal;
        margin-left: 20px;
      }
      .van-tag {
        background: #fff;
        color: #3296fa;
      }
    }
    p {
      margin: 0;
      text-align: center;
    }
  }
  &-group {
    margin-bottom: 30px;
  }
  &-links {
    padding: 30px 0;
    font-size: 24px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 48px;
      padding-bottom: 10px;
    }
  }
}
</style>
