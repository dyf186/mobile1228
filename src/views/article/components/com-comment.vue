<template>
  <div class="comment">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in commentList" :key="index">
        <div slot="icon">
          <img
            src="http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU"
            class="avatar"
            alt=""
          />
        </div>
        <div slot="title">
          <span>123</span>
        </div>
        <div slot="default">
          <van-button icon="like-o" size="mini" plain>&nbsp;12</van-button>
        </div>
        <div slot="label">
          <p>hello world</p>
          <p>
            <span>2022-7-7 14:08:20</span>
            .
            <span @click="openReply(item.com_id)">4&nbsp;回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
    <van-popup
      v-model="showReply"
      position="bottom"
      :style="{ height: '80%' }"
      round
    >
      <van-list
        v-model="reply.loading"
        :finished="reply.finished"
        @load="onLoadReply"
      >
        <van-cell
          v-for="(item, index) in reply.list"
          :key="index"
          :title="item"
        >
          <div slot="icon">
            <img
              class="avatar"
              src="http://toutiao.meiduo.site/Fn6-mrb5zLTZIRG3yH3jG8HrURdU"
              alt=""
            />
          </div>
          <div slot="title">
            <span>度</span>
          </div>
          <div slot="label">
            <p>123231231</p>
            <p>
              <span>2022-07-07 15:55:43</span>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-popup>
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="contentCorR" placeholder="写评论或回复...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px">
        </van-loading>
        <span class="submit" v-else slot="button" @click="add">提交</span>
      </van-field>
    </div>
  </div>
</template>
<script>
import { apiCommentList } from "@/api/comment.js";
import { apiReplyList, apiAddCorR } from "@/api/reply.js";
export default {
  name: "com-comment",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      contentCorR: "",
      submiting: false,
      nowComID: "",
      lastID: null,
      replyList: [],
      showReply: false,
      reply: {
        list: [],
        loading: false,
        finished: false,
      },
      commentList: [],
      commentID: null,
      loading: false,
      finished: false,
    };
  },
  computed: {
    aid() {
      return this.$route.params.aid;
    },
  },
  filters: {},
  watch: {},
  methods: {
    async add() {
      console.log(this.aid, "aid");
      if (!this.contentCorR) return false;
      this.submiting = true;
      if (this.showReply) {
        const result = await apiAddCorR({
          target: this.nowComID,
          content: this.contentCorR,
          art_id: this.aid,
        });
        this.replyList.unshift(result.now_obj);
        let comment = this.commentList.find(
          (item) => item.com_id.toString() === this.nowComID
        );
        comment.reply_count++;
      } else {
        const result = await apiAddCorR({
          target: this.aid,
          content: this.contentCorR,
        });
      }
      this.contentCorR = "";
      this.submiting = false;
    },
    openReply(commentID) {
      this.nowComID = commentID;
      this.showReply = true;
      this.replyList = [];
      this.reply.finished = false;
      this.lastID = null;
    },
    async onLoadReply() {
      if (false) {
        const result = await apiReplyList({
          commentID: this.nowComID,
          lastID: this.lastID,
        });
        this.reply.loading = false;
        if (result.results.length === 0) {
          this.reply.finished = true;
          return false;
        }
        this.replyList.push(...result.results);
        this.lastID = result.last_id;
      }
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.reply.list.push(this.reply.list.length + 1);
        }
        this.reply.loading = false;
        if (this.reply.length >= 40) {
          this.reply.finished = true;
        }
      }, 1000);
    },
    async onLoad() {
      if (true) {
      } else {
        const result = await apiCommentList({
          articleID: this.aid,
          commentID: this.commentID,
        });
        this.loading = false;
        if (result.results.length === 0) {
          this.finished = true;
          return false;
        }
        this.commentList.push(...result.results);
        this.commentID = result.last_id;
      }

      setTimeout(() => {
        for (let i = 0; i < 5; i++) {
          this.commentList.push(this.commentList.length + 1);
        }
        this.loading = false;
        if (this.commentList.length >= 10) {
          this.finished = true;
        }
      }, 500);
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
<style lang="less" scoped>
.comment {
  margin-top: 15px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  /deep/ .van-cell + title {
    .van-cell__label {
      width: 400px;
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}
</style>
