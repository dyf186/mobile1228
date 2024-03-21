<template>
  <div class="container">
    <van-tabs v-model="activeChannelIndex">
      <div slot="nav-right" class="channel-more" @click="showChannel = true">
        <van-icon name="wap-nav"></van-icon>
      </div>
      <van-tab
        :title="item.name"
        v-for="(item, index) in channelList"
        :key="index"
      >
        <com-article :channelID="item.id"></com-article>
        <!-- 弹窗 -->
        <van-popup
          :value="showChannel"
          @input="closeChannel"
          closeable
          round
          position="bottom"
          :style="{ height: '95%' }"
          close-icon-position="top-left"
        >
          <div class="channel">
            <div class="channel-head">
              <div>
                <span class="title">我的频道</span>
                <span class="desc">点击进入频道</span>
              </div>
              <div>
                <van-button
                  type="danger"
                  plain
                  size="mini"
                  round
                  @click="changeEdit"
                  >{{ isEdit ? "完成" : "编辑" }}</van-button
                >
              </div>
            </div>
            <van-grid class="channel-content" :gutter="10" clickable>
              <van-grid-item
                v-for="(item, index) in channelList"
                :key="index"
                @click="clkChannel(item.id, index)"
              >
                <span
                  class="text"
                  :style="{ color: index === activeChannelIndex ? 'red' : '' }"
                  >{{ item.name }}</span
                >
                <van-icon
                  v-show="index > 0 && isEdit"
                  class="close-icon"
                  name="close"
                ></van-icon>
              </van-grid-item>
            </van-grid>
          </div>
          <div class="channel">
            <div class="channel-head">
              <div>
                <span class="title">频道推荐</span>
                <span class="desc">点击添加频道</span>
              </div>
            </div>
            <van-grid class="channel-content" :gutter="10" clickable>
              <van-grid-item
                v-for="item in restChannel"
                :key="item.id"
                @click="restToUser(item)"
              >
                <div class="info">
                  <span class="text">{{ item.name }}</span>
                </div></van-grid-item
              >
            </van-grid>
          </div>
        </van-popup>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { apiChannelList } from "@/api/channel.js";
import comArticle from "./components/com-article.vue";
import ComChannel from "./components/com-channel.vue";
import { apiChannelAll, apiChannelAdd, apiChannelDel } from "@/api/channel";
export default {
  name: "home",
  components: {
    comArticle,
    ComChannel,
  },
  mixins: [],
  props: {},
  data() {
    return {
      activeChannelIndex: 0,
      showChannel: false,
      isEdit: false,
      initnumber: 0,
      channelAll: [],
      channelList: [],
    };
  },
  computed: {
    restChannel() {
      const userChannelIds = this.channelList.map((item) => {
        return item.id;
      });
      const rest = this.channelAll.filter((item) => {
        return !userChannelIds.includes(item.id);
      });
      return rest;
    },
  },
  watch: {},
  created() {
    if (
      !this.$store.state.user.refresh_token &&
      !this.$store.state.user.token
    ) {
      this.$router.push("/login");
    }
    this.getChannelList();
    this.getChannelAll();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    closeChannel() {
      this.showChannel = false;
      this.isEdit = false;
    },
    changeEdit() {
      this.isEdit = !this.isEdit;
    },
    // 我的频道点击
    clkChannel(id, index) {
      if (this.isEdit && index > 0) {
        // 删除当前频道
        this.channelList.splice(index, 1);
        apiChannelDel(id);
        if (index < this.activeChannelIndex) {
          this.activeChannelIndex -= 1;
        }
      } else {
        // 激活当前频道
        this.activeChannelIndex = index;
        this.showChannel = false;
      }
    },
    // 点击频道推荐
    restToUser(channel) {
      apiChannelAdd(channel);
      this.changeList();
    },
    // 获取全部频道
    getChannelAll() {
      this.channelAll = [
        { name: "c++", id: "0" },
        { name: "android", id: "1" },
        { name: "css", id: "2" },
        { name: "go", id: "3" },
        { name: "linux", id: "4" },
        { name: "php", id: "5" },
        { name: "javascript", id: "6" },
        { name: "python", id: "7" },
        { name: "区块链", id: "8" },
        { name: "产品", id: "9" },
        { name: "后端", id: "10" },
        { name: "人工智能", id: "11" },
        { name: "架构", id: "12" },
        { name: "前端", id: "13" },
        { name: "算法", id: "14" },
        { name: "面试", id: "15" },
        { name: "科技动态", id: "16" },
        { name: "设计", id: "17" },
        { name: "数码产品", id: "18" },
      ];
    },
    // 触发更新dom
    changeList() {
      let key = "hm-channel-vip";
      this.channelList = JSON.parse(localStorage.getItem(key));
    },
    // 获取我的频道
    getChannelList() {
      // const result = await apiChannelList();
      apiChannelList();
      // console.log(result.channels);
      let key = "hm-channel-vip";
      this.channelList = JSON.parse(localStorage.getItem(key));
    },
  },
};
</script>

<style lang="less" scoped>
.channel {
  margin-top: 70px;
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 15px;
      margin-right: 5px;
    }
    .desc {
      font-size: 12px;
      color: gray;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 10px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
.channel-more {
  position: fixed;
  right: 0;
  background-color: #fff;
  line-height: 44px;
  width: 20px;
  text-align: center;
  font-size: 16px;
}

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
  /deep/ .van-tab__wrap {
    width: 90%;
  }
}
</style>
