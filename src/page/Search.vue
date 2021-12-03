<template>
  <div class="search">
    <div class="nav">
      <el-button type="primary" plain @click="goSingle">单曲</el-button>
      <el-button type="primary" plain @click="goPortfolio">歌单</el-button>
    </div>
    <div class="res">
      <component :is="com" :songTable="tableData" :contentList="portfolioList"></component>
    </div>
  </div>
</template>

<script>
import ContentList from '../components/ContentList'
import SongTable from '../components/SongTable'
import {HttpManager} from '../api'
import {mapGetters} from 'vuex'

export default {
  name: 'Search',
  components: {
    ContentList,
    SongTable
  },
  computed: {
    ...mapGetters([
      'searchWord'
    ])
  },
  watch: {
    searchWord: function () {
      this.getSong()
      this.getPortfolio()
    }
  },
  data () {
    return {
      com: 'SongTable',
      portfolioList: [],
      tableData: []
    }
  },
  methods: {
    goSingle () {
      this.com = 'SongTable'
    },
    goPortfolio () {
      this.com = 'ContentList'
    },
    getSong () {
      console.log(this.$route.query.searchWord)
      if (this.$route.query.searchWord) {
        HttpManager.searchSongs({
          word: this.$route.query.searchWord
        }).then(res => {
          console.log(res.songs)
          this.tableData = res.songs
        })
      }
    },
    getPortfolio () {
      if (this.$route.query.searchWord) {
        HttpManager.searchPortfolio({
          word: this.$route.query.searchWord
        }).then(res => {
          console.log(res.portfolio)
          this.portfolioList = res.portfolio
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/search";
</style>
