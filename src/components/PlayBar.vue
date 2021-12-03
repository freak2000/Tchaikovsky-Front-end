<template>
  <div class="play-bar" :class="{show:!toggle}" @mouseup="mouseup">
    <div @click="toggle=!toggle" class="item-up" :class="{turn: toggle}">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="ZHEDIE"></use>
      </svg>
    </div>
    <div class="kongjian" >
      <!--上一首-->
      <div class="item" @click="prev">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="SHANGYISHOU"></use>
        </svg>
      </div>
      <!--播放-->
      <div class="item" @click="togglePlay">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="playButtonUrl"></use>
        </svg>
      </div>
      <!--下一首-->
      <div class="item" @click="next">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="XIAYISHOU"></use>
        </svg>
      </div>
      <!--歌曲图片-->
      <div class="item-img">
        <img :src=picUrl alt="">
      </div>
      <!--播放进度-->
      <div class="playing-speed">
        <!--播放开始时间-->
        <div class="current-time">{{ nowTime }}</div>
        <div class="progress-box">
          <div class="item-song-title">
            <div>{{this.title}}</div>
            <div>{{this.artist}}</div>
          </div>
          <div ref="progress" class="progress" @mousemove="mousemove">
            <!--进度条-->
            <div ref="bg" class="bg" @click="updatemove">
              <div ref="curProgress" class="cur-progress" :style="{width: curLength+'%'}"></div>
            </div>
            <!--进度条 end -->
            <!--拖动的点点-->
            <div ref="idot" class="idot" :style="{left: curLength+'%'}" @mousedown="mousedown" @mouseup="mouseup"></div>
            <!--拖动的点点 end -->
          </div>
        </div>
        <!--播放结束时间-->
        <div class="left-time">{{ songTime }}</div>
      </div>
      <!--音量-->
      <div class="item icon-volume" >
        <svg v-if="volume !== 0" class="icon" aria-hidden="true">
          <use :xlink:href="YINLIANG"></use>
        </svg>
        <svg v-else class="icon" aria-hidden="true">
          <use :xlink:href="JINGYIN"></use>
        </svg>
        <el-slider class="volume" v-model="volume" :vertical="true"></el-slider>
      </div>
      <!--喜欢-->
      <div class="item" @click="like">
        <svg :class="{ active: isActive }" class="icon" aria-hidden="true">
          <use :xlink:href="likeOrNot()"></use>
        </svg>
      </div>
      <!--下载-->
      <div class="item" @click="downLoad">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="XIAZAI"></use>
        </svg>
      </div>
      <!--歌曲列表-->
      <div class="item" @click="isShowList = true">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="LIEBIAO"></use>
        </svg>
      </div>
    </div>
<!--    播放列表-->
    <el-drawer
      :append-to-body="true"
      title="播放列表"
      :modal="false"
      :visible.sync="isShowList"
      direction="rtl"
      size="30%"
      style="height: 65%;position: fixed; top: 120px; font-size: 20px; text-align:center; ">
      <el-table :data="listOfSongs" :row-class-name="HandleRowStyle" @row-click="toPlay">
<!--        <el-table-column property="date" label="日期" width="150"></el-table-column>-->
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column property="name" label="" ></el-table-column>
      </el-table>
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { ICON } from '../assets/icon/index'
import SongAudio from './SongAudio'
import {HttpManager} from '../api'
// import {HttpManager} from '../api'
export default {
  name: 'play-bar',
  components: {
    SongAudio
  },
  data () {
    return {
      modal: false,
      isShowList: false,
      tag: false,
      nowTime: '00:00',
      songTime: '00:00',
      curLength: 0, // 进度条的位置
      progressLength: 0, // 进度条长度
      mouseStartX: 0, // 拖拽开始位置
      toggle: true,
      volume: 50,
      XIAZAI: ICON.XIAZAI,
      ZHEDIE: ICON.ZHEDIE,
      SHANGYISHOU: ICON.SHANGYISHOU,
      XIAYISHOU: ICON.XIAYISHOU,
      YINLIANG: ICON.DAYINLIANG,
      JINGYIN: ICON.WUYINLIANG,
      LIEBIAO: ICON.LIEBIAO,
      XIHUAN: ICON.XIHUAN,
      MEIXIHUAN: ICON.MEIXIHUAN
    }
  },
  computed: {
    ...mapGetters([
      'loginIn', // 用户登录状态
      'userId', // 用户 id
      'isPlay', // 播放状态
      'playButtonUrl', // 播放状态的图标
      'id', // 音乐id
      'url', // 音乐地址
      'title', // 歌名
      'artist', // 歌手名
      'picUrl', // 歌曲图片
      'curTime', // 当前音乐的播放位置
      'duration', // 音乐时长
      'listOfSongs', // 当前歌单列表
      'listIndex', // 当前歌曲在歌曲列表的位置
      'showAside', // 是否显示侧边栏
      'autoNext', // 用于触发自动播放下一首
      'isActive',
      'likeList'
    ])
  },
  watch: {
    // 切换播放状态的图标
    isPlay (val) {
      if (val) {
        this.$store.commit('setPlayButtonUrl', ICON.ZANTING)
      } else {
        this.$store.commit('setPlayButtonUrl', ICON.BOFANG)
      }
    },
    volume () {
      this.$store.commit('setVolume', this.volume / 100)
    },
    // 播放时间的开始和结束
    curTime () {
      this.nowTime = this.formatSeconds(this.curTime)
      // console.log(this.curTime)
      this.songTime = this.formatSeconds(this.duration)
      // 移动进度条
      this.curLength = (this.curTime / this.duration) * 100
      // 处理歌词位置及颜色
    },
    // 自动播放下一首
    autoNext () {
      this.next()
    }
  },
  mounted () {
    this.progressLength = this.$refs.progress.getBoundingClientRect().width
    document.querySelector('.icon-volume').addEventListener('click', function (e) {
      document.querySelector('.volume').classList.add('show-volume')
      e.stopPropagation()
    }, false)
    document.querySelector('.volume').addEventListener('click', function (e) {
      e.stopPropagation()
    }, false)
    document.addEventListener('click', function () {
      document.querySelector('.volume').classList.remove('show-volume')
    }, false)
    HttpManager.getLikedSongs({})
  },
  methods: {
    ...mapMutations([
      'setId',
      'setListIndex',
      'setUrl',
      'setpicUrl',
      'setTitle',
      'setLikeList'
    ]),
    likeOrNot () {
      for (let i = 0; i < this.likeList.length; i++) {
        if (this.likeList[i].song_id === this.id) {
          return this.XIHUAN
        }
      }
      return this.MEIXIHUAN
    },
    like () {
      if (!this.loginIn) {
        this.$notify({
          message: '请先登录',
          type: 'warning'}
        )
      } else {
        HttpManager.likeSongs({
          'userId': this.userId,
          'songId': this.id
        })
          .then(res => {
            console.log(res)
            if (res.code === '006') {
              this.$notify({
                message: res.msg,
                type: 'info'}
              )
            }
            if (res.code === '007') {
              this.$notify({
                message: res.msg,
                type: 'success'}
              )
            }
          }).then(res =>
            HttpManager.getLikedSongs({
              'userId': this.userId
            })
          )
          .then(res => {
            console.log(res.likes)
            this.setLikeList(res.likes)
            // console.log(this.likeList[0].songId)
          })
      }
    },
    prev () {
      if (this.listIndex !== -1 && this.listOfSongs.length > 1) {
        if (this.listIndex > 0) {
          this.$store.commit('setListIndex', this.listIndex - 1)
          this.toPlay(this.listOfSongs[this.listIndex])
        } else {
          this.$store.commit('setListIndex', this.listOfSongs.length - 1)
          this.toPlay(this.listOfSongs[this.listIndex])
        }
      }
    },
    next () {
      if (this.listIndex !== -1 && this.listOfSongs.length > 1) {
        if (this.listIndex < this.listOfSongs.length) {
          this.$store.commit('setListIndex', this.listIndex + 1)
          this.toPlay(this.listOfSongs[this.listIndex])
        } else {
          this.$store.commit('setListIndex', 0)
          this.toPlay(this.listOfSongs[this.listIndex])
        }
      }
    },
    HandleRowStyle ({row, rowIndex}) {
      row.id = rowIndex + 1
      if (this.id === row.song_id) {
        return 'success-row'
      }
    },
    toPlay (row) {
      // console.log(this.listOfSongs)
      // console.log(this.temList)
      console.log(row)
      this.setId(row.song_id)
      this.setListIndex(row.id)
      // console.log(row.id)
      this.setUrl('http://localhost:8852/' + row.url)
      // this.setpicUrl('http://localhost:8852/' + this.tempList.portfolio_pic)
      // this.$store.commit('setId', row.id)
      // this.$store.commit('setListIndex', row.index)
      // this.$store.commit('setUrl', 'http://localhost:8080' + row.url)
      // this.$store.commit('setpicUrl', 'http://localhost:8080' + row.pic)
      // this.$store.commit('setTitle', this.replaceFName(name))
      // this.$store.commit('setArtist', this.replaceLName(name))
      // this.$store.commit('setLyric', this.parseLyric(lyric))
      // alert(row.conductor)
      // console.log(row)
    },
    downLoad () {
      this.$confirm('确认下载此歌曲？')
        .then(_ => {
          window.open(`${this.$target}songs/download/${this.id}`, 'iframeId')
        })
        .catch(_ => {})
    },
    togglePlay () {
      if (this.isPlay) {
        this.$store.commit('setIsPlay', false)
      } else {
        this.$store.commit('setIsPlay', true)
      }
    },
    formatSeconds (value) {
      let theTime = parseInt(value)
      let theTime1 = 0
      let theTime2 = 0
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60) // 分
        theTime = parseInt(theTime % 60) // 秒
        // 是否超过一个小时
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60) // 小时
          theTime1 = 60 // 分
        }
      }
      // 多少秒
      if (parseInt(theTime) < 10) {
        var result = '0:0' + parseInt(theTime)
      } else {
        result = '0:' + parseInt(theTime)
      }
      // 多少分钟时
      if (theTime1 > 0) {
        if (parseInt(theTime) < 10) {
          result = '0' + parseInt(theTime)
        } else {
          result = parseInt(theTime)
        }
        result = parseInt(theTime1) + ':' + result
      }
      // 多少小时时
      if (theTime2 > 0) {
        if (parseInt(theTime) < 10) {
          result = '0' + parseInt(theTime)
        } else {
          result = parseInt(theTime)
        }
        result = parseInt(theTime2) + ':' + parseInt(theTime1) + ':' + result
      }
      return result
    },
    // 拖拽开始
    mousedown (e) {
      // console.log(1)
      this.mouseStartX = e.clientX
      this.tag = true
    },
    // 拖拽结束
    mouseup () {
      this.tag = false
    },
    // 拖拽中
    mousemove (e) {
      if (!this.duration) {
        return false
      }
      if (this.tag) {
        let movementX = e.clientX - this.mouseStartX
        // console.log(this.$refs)
        let curLength = this.$refs.curProgress.getBoundingClientRect().width
        //  计算出百分比
        this.progressLength = this.$refs.progress.getBoundingClientRect().width
        let newPercent = ((curLength + movementX) / this.progressLength) * 100
        // console.log(curLength)
        if (newPercent > 100) {
          newPercent = 100
        }
        this.curLength = newPercent
        console.log(curLength)
        this.mouseStartX = e.clientX
        //  根据百分比推出对应的播放时间
        this.changeTime(newPercent)
      }
    },
    // 更改歌曲进度
    changeTime (percent) {
      let newCurTime = this.duration * (percent * 0.01)
      // console.log(newCurTime)
      this.$store.commit('setChangeTime', newCurTime)
      this.$store.commit('setCurTime', newCurTime)
    },
    updatemove (e) {
      if (!this.tag) {
        let curLength = this.$refs.bg.offsetLeft
        this.progressLength = this.$refs.progress.getBoundingClientRect().width
        let newPercent = ((e.clientX - curLength) / this.progressLength) * 100
        if (newPercent < 0) {
          newPercent = 0
        } else if (newPercent > 100) {
          newPercent = 100
        }
        this.curLength = newPercent
        this.changeTime(newPercent)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

@import '../assets/css/play-bar';
.el-drawer.rtl {
  border-radius: 5px;
}
</style>
