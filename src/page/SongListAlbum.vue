<template>
<div class="song-list-album">
  <div class="album-slide">
    <el-avatar shape="square" class="album-img" :size="200" :src="$target + songList.portfolio_pic"></el-avatar>
    <div class="album-info">
      <div class="album-username">
        <span>{{songList.portfolio_name}}</span>
      </div>
      <el-divider></el-divider>
      <ul class="album-list">
        <li>{{songList.orchestra}}</li>
        <li>{{songList.performer}}</li>
      </ul>
    </div>
    <div class="album-button">
      <el-button  class="play-btn" plain>
        <svg class="icon" aria-hidden="true" height="20px" width="20px">
          <use :xlink:href="BOFANG"></use>
        </svg>
        全部播放
      </el-button>
      <el-button @click="like">
        <svg class="icon" aria-hidden="true" height="20px" width="20px">
          <use :xlink:href="likeOrNot()"></use>
        </svg>
        <span>{{this.collect}}</span>
      </el-button>
      <el-button type="primary" round>
        <svg class="icon" aria-hidden="true" height="20px" width="20px">
          <use :xlink:href="XIAZAI2"></use>
        </svg>
        全部下载
      </el-button>
    </div>
  </div>
  <little-song-table :songTable="tableData"></little-song-table>
</div>
</template>

<script>
import {ICON} from '../assets/icon'
import LittleSongTable from '../components/LittleSongTable'
import {mapGetters, mapMutations} from 'vuex'
import {HttpManager} from '../api'
export default {
  name: 'SongListAlbum',
  components: {
    LittleSongTable
  },
  data () {
    return {
      XIAZAI2: ICON.XIAZAI2,
      BOFANG: ICON.BOFANG,
      FENXIANG: ICON.FENXIANG,
      MEIXIHUAN: ICON.MEIXIHUAN,
      XIHUAN: ICON.XIHUAN,
      songList: '',
      tableData: [],
      collect: '喜欢'
    }
  },
  computed: {
    ...mapGetters([
      'loginIn', // 登录标识
      'tempList', // 单个歌单信息
      'listOfSongs', // 存放的音乐
      'userId', // 用户ID
      'avator', // 用户头像
      'likePortfolio'
    ])
  },
  created () {
    this.songList = this.tempList
    // this.getAllSongs()
    this.getSongsByPortfolio()
  },
  methods: {
    ...mapMutations([
      'setListOfSongs',
      'setLikePortfolio'
    ]),
    like () {
      if (!this.loginIn) {
        this.$notify({
          message: '请先登录',
          type: 'warning'}
        )
      } else {
        HttpManager.likePortfolio({
          'userId': this.userId,
          'portfolio_id': this.tempList.portfolio_id
        })
          .then(res => {
            console.log(res)
            if (res.code === '006') {
              this.collect = '喜欢'
              this.$notify({
                message: res.msg,
                type: 'info'}
              )
            }
            if (res.code === '007') {
              this.collect = '已喜欢'
              this.$notify({
                message: res.msg,
                type: 'success'}
              )
            }
          }).then(res =>
            HttpManager.getLikedPortfolio({
              'userId': this.userId
            })
          )
          .then(res => {
            console.log(res.likes)
            this.setLikePortfolio(res.likes)
            console.log(this.likePortfolio[0].portfolio_id)
          })
      }
    },
    likeOrNot () {
      if (this.likeList === null) {
        return this.MEIXIHUAN
      }
      if (this.likePortfolio === null) {
        return this.MEIXIHUAN
      }
      for (let i = 0; i < this.likePortfolio.length; i++) {
        if (this.likePortfolio[i].portfolio_id === this.tempList.portfolio_id) {
          return this.XIHUAN
        }
      }
      return this.MEIXIHUAN
    },
    getAllSongs () {
      HttpManager.getSongs()
        .then(res => {
          this.tableData = res.songs
          // this.setListOfSongs(this.tableData)
          // console.log('tableData' + this.tableData)
        }).catch(error => {
          console.log(error)
        })
    },
    getSongsByPortfolio () {
      const data = {
        portfolio_id: this.songList.portfolio_id
      }
      HttpManager.getSongsByPortfolio(data)
        .then(res => {
          console.log(res)
          this.tableData = res.songs
          // console.log(this.tableData)
        }).catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/song-list-album";
</style>
