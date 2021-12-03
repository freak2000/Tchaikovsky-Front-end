<template>
<!--  <el-empty description="404" :image-size="400"></el-empty>-->
  <div class="error">
    <section class="error-container">
      <span>4</span>
      <span><span class="screen-reader-text">0</span></span>
      <span>4</span>
    </section>
    <div class="link-container">
      <a target="_blank"  class="more-link">没有找到页面</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/error";
</style>
