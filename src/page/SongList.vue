<template>
  <song-table :songTable="tableData"></song-table>
</template>

<script>
import SongTable from '../components/SongTable'
import {HttpManager} from '../api'

export default {
  name: 'song-list',
  components: {
    SongTable
  },
  data () {
    return {
      activeName: '全部歌单',
      pageSize: 15, // 页数
      currentPage: 1, // 当前页
      albumDatas: [], // 歌单
      currentRow: null,
      tableData: []
    }
  },
  computed: {
    // ...mapGetters([
    //   'songsList'
    // ]),
    // 计算当前表格中的数据
  },
  created () {
    this.getAllSongs()
  },
  methods: {
    getAllSongs () {
      HttpManager.getSongs()
        .then(res => {
          this.tableData = res.songs
          console.log(this.tableData)
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/song-list.scss";
</style>
