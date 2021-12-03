<template>
  <div class="home">
    <el-carousel class="swiper-container" :interval="444444000" type="card" height="530px">
      <el-carousel-item v-for="(item,index) in carousel" :key="index">
        <img :src="$target + item.imgPath" alt=""/>
      </el-carousel-item>
    </el-carousel>
    <!--热门歌单-->
    <div class="section">
      <div class="section-title">歌单</div>
      <content-list  path="song-list-album"></content-list>
    </div>
    <!--热门单曲-->
    <div class="section">
      <div class="section-title">单曲</div>
      <content-list  path="singer-album"></content-list>
    </div>
  </div>
</template>

<script>
import ContentList from '../components/ContentList'
import {HttpManager} from '../api'
export default {
  name: 'Home',
  components: {
    ContentList
  },
  data () {
    return {
      carousel: '',
      songList: [],
      singleSong: []
    }
  },
  created () {
    this.getCarousel()
    // this.$axios.get('/carousel')
    //   .then(res => {
    //     console.log(res)
    //     this.carousel = res.data.carousel
    //   })
    //   .catch(err => {
    //     return Promise.reject(err)
    //   })
  },
  methods: {
    getCarousel () {
      HttpManager.getCarousel()
        .then(res => {
          this.carousel = res.carousel
          console.log(res.carousel)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/home";
</style>
