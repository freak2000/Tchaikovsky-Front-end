<template>
  <div class="home">
    <el-carousel class="swiper-container" :interval="444444000" type="card" height="530px">
      <el-carousel-item v-for="(item,index) in carousel" :key="index">
        <a href="">
          <img :src="$target + item.imgPath" alt=""/>
        </a>
      </el-carousel-item>
    </el-carousel>
    <!--热门歌单-->
    <div class="section">
      <div class="section-title">热门歌单</div>
      <content-list  :content-list="headerPortfolio" path="song-list-album"></content-list>
    </div>
  </div>
</template>

<script>
import {homePortfolio} from '../assets/data/home-portfolio'
import ContentList from '../components/ContentList'
import SongTable from '../components/SongTable'
import {HttpManager} from '../api'
export default {
  name: 'Home',
  components: {
    ContentList,
    SongTable
  },
  data () {
    return {
      carousel: '',
      songList: [],
      singleSong: [],
      headerPortfolio: homePortfolio
    }
  },
  created () {
    this.getCarousel()
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
