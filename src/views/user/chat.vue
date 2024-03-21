<template>
  <div class="container">
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小智同学"
    ></van-nav-bar>
    <div class="chat-list" ref="talkArea">
      <div
        class="chat-item"
        :class="[item.name === 'xz' ? 'left' : 'right']"
        v-for="(item, index) in talks"
        :key="index"
      >
        <van-image
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          v-if="item.name === 'xz'"
        ></van-image>
        <div class="chat-pao">{{ item.msg }}</div>
        <van-image
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          v-if="item.name === 'vip'"
        ></van-image>
      </div>
    </div>
    <div class="reply-container van-hairline--top">
      <van-field
        v-model.trim="content"
        placeholder="说点什么..."
        @keyup.enter="send()"
      >
        <van-loading
          v-if="loading"
          slot="button"
          type="spinner"
          size="16px"
        ></van-loading>
        <span
          v-else
          @click="send()"
          slot="button"
          style="font-size: 24px; color: #999"
          >提交</span
        >
      </van-field>
    </div>
  </div>
</template>

<script>
import { apiUserInfo } from "@/api/user";
import io from "socket.io-client";
export default {
  name: "user-chat",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      socket: null,
      userInfo: null,
      content: "",
      loading: false,
      talks: [],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getUserInfo();
    this.setSocket();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {
    this.socket.close();
  },
  methods: {
    scrollBottom() {
      this.$nextTick(() => {
        this.$refs.talkArea.scrollTop = this.$refs.talkArea.scrollHeight;
      });
    },
    async send() {
      if (!this.content) return false;
      this.loading = true;
      let obj = {
        name: "vip",
        msg: this.content,
        timestamp: Date.now(),
      };
      this.talks.push(obj);
      this.scrollBottom();
      this.content = "";
      this.socket.emit("message", obj);
      this.loading = false;
    },
    setSocket() {
      this.socket = io("http://ttapi.research.itcast.cn", {
        query: {
          token: this.$store.state.user.token,
        },
      });
      this.socket.on("connect", () => {
        this.talks.push({
          msg: "在吗？",
          timestamp: Data.now(),
          name: "xz",
        });
      });
      this.socket.on("message", (data) => {
        this.talks.push({ ...data, name: "xz" });
        this.scrollBottom();
      });
    },
    async getUserInfo() {
      if (false) {
        this.userInfo = await apiUserInfo();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 92px 0px 100px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 20px;
      .van-image {
        vertical-align: top;
        width: 80px;
        height: 80px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 80px;
        max-width: 140%;
        min-height: 80px;
        line-height: 76px;
        border: 1px solid #c3d9ea;
        border-radius: 8px;
        position: relative;
        padding: 0 20px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 28px;
        color: #333;
        &::before {
          content: "";
          width: 20px;
          height: 20px;
          position: absolute;
          top: 24px;
          border-top: 1px solid #c2d9ea;
          border-right: 1px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 30px;
    &::before {
      right: -12px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 30px;
    margin-right: 0;
    &::before {
      left: -10px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 88px;
  width: 100%;
  background: #f5f5f5;
  z-index: 999;
}
</style>
