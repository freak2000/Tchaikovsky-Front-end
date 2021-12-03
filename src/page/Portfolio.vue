<template>
  <div class="portfolio">
    <ul class="portfolio-header">
      <li
        v-for="(item,index) in songStyle"
        :key="index"
        :class="{active: item.name === activeName}"
        @click="getPortfolioByStyle(item.name)">
        {{item.name}}
      </li>
    </ul>
    <div class="portfolio-content">
      <content-list :contentList="this.portfolio" path="song-list-album"></content-list>
<!--      <div class="pagination">-->
<!--        <el-pagination-->
<!--          @current-change="changePage"-->
<!--          background-->
<!--          layout="total, prev, pager, next"-->
<!--          :current-page="currentPage"-->
<!--          :page-size="pageSize"-->
<!--          :total="portfolio.length">-->
<!--        </el-pagination>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import ContentList from '../components/ContentList'
import { SongStyle } from '../assets/data/songList'
// import {swiperList} from '../assets/data/swiper'
import {HttpManager} from '../api'
export default {
  name: 'Portfolio',
  components: {
    ContentList
  },
  data () {
    return {
      songStyle: SongStyle,
      activeName: '全部',
      // swiperList: swiperList,
      portfolio: [],
      currentPage: 1,
      pageSize: 15 // 每页个数
    }
  },
  created () {
    this.getPortfolio()
  },
  // computed: {
  //   data () {
  //     return this.portfolio.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
  //   }
  // },
  methods: {
    // changePage (val) {
    //   this.currentPage = val
    // },
    getPortfolio () {
      this.portfolio = []
      HttpManager.getPortfolio()
        .then(res => {
          console.log(res)
          this.portfolio = res.portfolio
          // console.log(res.portfolio)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getPortfolioByStyle (name) {
      this.portfolio = []
      if (name === '全部') {
        this.activeName = name
        this.getPortfolio()
      } else {
        this.activeName = name
        HttpManager.getPortfolio()
          .then(res => {
            for (var i = 0; i < res.portfolio.length; i++) {
              if (res.portfolio[i].type === name) {
                this.portfolio.push(res.portfolio[i])
              }
            }
            console.log(res.portfolio)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/portfolio";
</style>
