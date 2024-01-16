<template>
  <div class="container">home组件
    <van-button round size="small" @click="$store.commit('clearToken')">清除token</van-button>
    
  </div>
  
</template>

<script>
export default {
  name: 'home',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {},
}
</script>

<style lang="less" scoped>
</style>
