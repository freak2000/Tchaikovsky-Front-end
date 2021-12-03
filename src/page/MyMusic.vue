<template>
  <div class="my-music">
    <div class="album-slide">
      <div class="album-img">
        <img :src="attachImageUrl(avatar)" alt="">
      </div>
      <div class="album-info">
        <div class="album-username">
          <span>{{SignUpUser.username}}</span>
          <el-button type="primary" round class="album-button" icon="el-icon-edit" @click="goSetting">
            编辑个人信息
          </el-button>
        </div>
        <el-divider></el-divider>
        <ul class="album-list">
          <li>生日： {{ SignUpUser.birth }}</li>
          <li>个人介绍: {{SignUpUser.introduction}}</li>
        </ul>
      </div>
    </div>
    <song-table :songTable="this.likeList"></song-table>
    <div class="my-list">
      <div class="my-list-title">
        我的歌单
      </div>
      <content-list :contentList="this.likePortfolio" path="song-list-album"></content-list>
      <div class="pagination">
      </div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixins'
import { mapGetters } from 'vuex'
import SongTable from '../components/SongTable'
import ContentList from '../components/ContentList'
import {HttpManager} from '../api'
export default {
  name: 'my-music',
  mixins: [mixin],
  components: {
    SongTable,
    ContentList
  },
  data () {
    return {
      SignUpUser: {
        username: '',
        password: '',
        sex: 1,
        introduction: '',
        birth: ''
      },
      username: '',
      userSex: '',
      birth: '',
      location: '',
      introduction: '',
      collection: [], // 存放收藏的歌曲ID
      collectList: [] // 收藏的歌曲
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'id',
      'listOfSongs', // 存放的音乐
      'avatar',
      'likeList',
      'likePortfolio'
    ])
  },
  mounted () {
    this.getMsg()
  },
  methods: {
    goSetting () {
      this.$router.push({path: '/setting'})
    },
    getMsg () {
      HttpManager.getMsg({userId: this.userId})
        .then(res => {
          this.SignUpUser.username = res.user[0].username
          this.SignUpUser.password = res.user[0].password
          this.SignUpUser.sex = res.user[0].sex
          this.SignUpUser.introduction = res.user[0].introduction
          this.SignUpUser.birth = res.user[0].birth
        })
        .then(() => {
          let str = this.SignUpUser.birth
          str = str.substring(0, 10)
          this.SignUpUser.birth = str
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/my-music.scss';
</style>
