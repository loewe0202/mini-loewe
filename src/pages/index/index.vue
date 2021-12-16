<template>
  <view class="pages">
    <web-view src="https://wwww.baidu.com"></web-view>
  </view>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  data() {
    return {
      title: 'Hello',
    };
  },
  onLoad() {},
  methods: {},
});
</script>

<style lang="scss">
.pages {
  background: #f8f8f8;
}
</style>
