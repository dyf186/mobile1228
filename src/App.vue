<template>
  <div id="app">
    <div class="appp">App件</div>
    <div class="bpjjj"><van-button type="primary">主要按钮</van-button></div>
    <div style="margin-bottom: 10rem;"><van-button type="success">成功按钮</van-button></div>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app",
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.appp {
  font-size: 24px;
  width: 375px;
  display: inline-block;
  background-color: #ccc;
}
.bpjjj{
  margin-bottom: 375px;
}
</style>
