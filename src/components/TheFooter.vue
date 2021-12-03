<template>
  <div class="the-footer">
    <div class="container">
      <p class="footer-img" v-for="(item,index) in footerImg" :key="index">
        <a :href="item.path">
          <img :src="item.img" alt="">
        </a>
      </p>
    </div>
    <p class="footer-text">Copyright © 2021-2022 LHY</p>
  </div>
</template>

<script>
import {footerImg} from '../assets/data/footer-img'
export default {
  name: 'the-footer',
  data () {
    return {
      footerImg: footerImg
    }
  },
  components: {
    footerImg
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/the-footer.scss';
</style>
