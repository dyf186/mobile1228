<template>
  <div class="container">
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <div class="detail">
      <h3>{{ article.title }}</h3>
      <div class="author">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="article.aut_photo"
        ></van-image>
        <div class="text">
          <p class="name">{{ article.aut_name }}</p>
          <p class="time">{{ article.pubdate }}</p>
        </div>
        <van-button
          round
          size="small"
          :type="article.is_followed ? 'default' : 'info'"
          @click="followMe()"
          :loading="followLoading"
          >{{ article.is_followed ? "取消关注" : "+ 关注" }}</van-button
        >
      </div>
      <div class="content">
        <p>{{ article.content }}</p>
      </div>
      <div class="zan">
        <van-button
          round
          size="small"
          :class="{ active: article.attitude === 1 }"
          plain
          icon="like-o"
          style="margin-right: 8px"
          >点赞</van-button
        >
        <van-button
          round
          size="small"
          :class="{ active: article.attitude === 0 }"
          plain
          icon="delete"
          >不喜欢</van-button
        >
      </div>
      <com-comment></com-comment>
    </div>
  </div>
</template>

<script>
import { apiFollow, apiUnFollow } from "@/api/user";
import { apiArticleDetail } from "@/api/article";
import ComComment from "./components/com-comment.vue";
export default {
  name: "article-fjsdfj",
  components: {
    ComComment,
  },
  mixins: [],
  props: {},
  data() {
    return {
      followLoading: false, //关注活动加载标志
      article: {}, // 文章详情信息
    };
  },
  computed: {
    aid: function () {
      return this.$route.params.aid;
    },
  },
  watch: {},
  created() {
    this.getArticleDetail();
  },
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    async followMe() {
      this.followLoading = true;
      if (this.article.is_followed) {
        try {
          await apiUserUnFollow(this.article.aut_id);
          this.article.is_followed = false;
          this.$toast.fail("取消关注成功");
        } catch (err) {
          this.$toast.fail("取消关注成功");
          this.article.is_followed = false;
        }
      } else {
        try {
          await apiUserFollow(this.article.aut_id);
          this.article.is_followed = true;
          this.$toast.fail("关注成功！"); // 临时成功，实际是不能自己关注自己
        } catch (err) {
          this.article.is_followed = true;
          this.$toast.fail("关注成功！"); // 临时成功，实际是不能自己关注自己
        }
      }
      this.followLoading = false;
    },
    async getArticleDetail() {
      if (true) {
        this.article = {
          aut_id: "1234",
          title: "djfsfjalsfjlsakf",
          aut_photo: "https://img.yzcdn.cn/vant/cat.jpeg",
          aut_name: "ddd",
          pubdate: "2-15 11:14",
          is_followed: true,
          content: "zheshiajsdlkfjoeiwfja;sldkfhjakldsfj;ilerfjasl;d",
          attitude: 1,
        };
      } else {
        const result = await apiArticleDetail(this.aid);
        this.article = result;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.detail {
  
  background-color: #fff;
  padding: 0px 20px 18px;
  margin-top: 46px;
  .title {
    font-size: 36px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 20px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 10px 0;
    display: flex;
    position: sticky;// 头像关注是否固定
    background-color: #fff;
    top: 67px;
    z-index: 2;
    .text {
      flex: 1;
      padding-left: 20px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 20px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    p {
      font-size: 14px;
    }
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
  }
}
</style>
