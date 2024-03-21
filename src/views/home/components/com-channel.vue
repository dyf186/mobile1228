<template>
  <van-popup
    :value="value"
    @input="$emit('input', $event)"
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
          <van-button type="danger" plain size="mini" round @click="changeEdit"
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
</template>
<script>

export default {
  name: "com-channel",
  components: {},
  mixins: [],
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    channelList: {
      type: Array,
      default: () => [],
    },
    activeChannelIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      
    };
  },
  computed: {
    
  },
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
    
  },
  beforeCreate() {},
  created() {
    
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

</style>
