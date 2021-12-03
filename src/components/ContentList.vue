<template>
    <div class="content-list">
      <ul class="section-content">
        <li class="content-item" v-for="(item, index) in data" :key="index">
          <div class="kuo" @click="goAblum(item)">
            <img class="item-img" :src="$target + item.portfolio_pic" alt="">
            <div class="mask"  @click="goAblum(item)">
              <svg class="icon" aria-hidden="true">
                <use :xlink:href="BOFANG"></use>
              </svg>
            </div>
          </div>
          <p class="item-name">{{item.portfolio_name}}</p>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination
          @current-change="changePage"
          background
          layout="total, prev, pager, next"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="this.contentList.length">
        </el-pagination>
      </div>
    </div>
</template>

<script>
import mixin from '../mixins'
import {ICON} from '../assets/icon'
import {swiperList} from '../assets/data/swiper'
export default {
  name: 'content-list',
  mixins: [mixin],
  props: {
    contentList: Array,
    path: String
  },
  computed: {
    data () {
      return this.contentList.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  data () {
    return {
      BOFANG: ICON.BOFANG,
      swiperList: swiperList,
      portfolio: [],
      currentPage: 1,
      pageSize: 15 // 每页个数
    }
  },
  methods: {
    changePage (val) {
      this.currentPage = val
    },
    goAblum (item) {
      // console.log(item)
      this.$store.commit('setTempList', item)
      this.$router.push({path: `/${this.path}/${item.portfolio_id}`})
      console.log(this.$store.getters.tempList)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/content-list";
</style>
