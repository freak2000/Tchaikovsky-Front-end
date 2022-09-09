<template>
  <div class="song-list">
    <el-header>全部作品</el-header>
    <el-table
      ref="singleTable"
      :data="songData"
      :row-class-name="setRowIndex"
      @cell-click="toPlay"
      style="width: 100%">
      <el-table-column
        type="index"
        :index="indexAdd"
        width="50">
      </el-table-column>
      <el-table-column
        label=""
        width="40">
        <template slot-scope="scope">
          <svg class="icon" aria-hidden="true" height="20px" width="20px" @click="like(scope.row)">
            <use :xlink:href="likeOrNot(scope.row)"></use>
          </svg>
        </template>
      </el-table-column>
      <el-table-column
        label=""
        width="50">
        <template slot-scope="scope">
          <svg class="icon" aria-hidden="true" height="20px" width="20px" @click="downLoad(scope.row)">
            <use :xlink:href="XIAZAI2"></use>
          </svg>
        </template>
      </el-table-column>
      <el-table-column
        property="name"
        label="作品名"
        width="450">
      </el-table-column>
      <el-table-column
        sortable
        property="op"
        label="作品号"
        width="100">
      </el-table-column>
      <el-table-column
        sortable
        property="type"
        label="类型"
        width="120">
      </el-table-column>
      <el-table-column
        sortable
        show-overflow-tooltip="true"
        property="orchestra"
        label="乐团"
        width="200">
      </el-table-column>
      <el-table-column
        sortable
        property="performer"
        label="演奏者"
        width="200">
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="changePage"
        background
        layout="total, prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="songTable.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {ICON} from '../assets/icon'
import {mapMutations, mapGetters} from 'vuex'
import {HttpManager} from '../api'
export default {
  name: 'song-table',
  props: {
    songTable: Array,
    path: String
  },
  computed: {
    ...mapGetters([
      'tempList',
      'id',
      'likeList',
      'loginIn',
      'userId',
      'listIndex',
      'listOfSongs'
    ]),
    songData () {
      return this.songTable.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  },
  data () {
    return {
      MEIXIHUAN: ICON.MEIXIHUAN,
      XIHUAN: ICON.XIHUAN,
      XIAZAI2: ICON.XIAZAI2,
      DAYINLIANG: ICON.DAYINLIANG,
      FENXIANG: ICON.FENXIANG,
      currentPage: 1,
      pageSize: 10

    }
  },
  methods: {
    ...mapMutations([
      'setId',
      'setListIndex',
      'setUrl',
      'setpicUrl',
      'setTitle',
      'setListOfSongs',
      'setLikeList',
      'setTempList'
    ]),
    downLoad (row) {
      console.log(row.song_id)
      this.$confirm('确认下载此歌曲？')
        .then(_ => {
          window.open(`${this.$target}songs/download/${row.song_id}`, 'iframeId')
        })
        .catch(_ => {})
    },
    likeOrNot (row) {
      if (this.likeList === null) {
        return this.MEIXIHUAN
      }
      for (let i = 0; i < this.likeList.length; i++) {
        if (this.likeList[i].song_id === row.song_id) {
          return this.XIHUAN
        }
      }
      return this.MEIXIHUAN
    },
    like (row) {
      console.log(row.song_id)
      if (!this.loginIn) {
        this.$notify({
          message: '请先登录',
          type: 'warning'}
        )
      } else {
        HttpManager.likeSongs({
          'userId': this.userId,
          'songId': row.song_id
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
            console.log(this.likeList[0].songId)
          })
      }
    },
    indexAdd (index) {
      return index + 1 + (this.currentPage - 1) * this.pageSize
    },
    changePage (val) {
      this.currentPage = val
    },
    setRowIndex ({row, rowIndex}) {
      row.id = rowIndex
      if (this.id === row.song_id) {
        return 'success-row'
      }
    },
    toPlay (row, column, cell, event) {
      console.log(row)
      if (column.label === '作品名') {
        let songIndex = row.id + 1 + (this.currentPage - 1) * this.pageSize
        // console.log(this.songTable[row.id])
        this.setListOfSongs(this.songTable)
        this.setId(row.song_id)
        this.setListIndex(songIndex)
        this.setUrl('http://localhost:8852/' + row.url)
        this.setpicUrl('http://localhost:8852/' + this.tempList.portfolio_pic)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../src/assets/css/song-table";
.el-header {
  background-color: #f6ad8f;
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
