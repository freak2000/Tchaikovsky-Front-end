<template>
  <div class="the-header">
    <div class="header-logo">
      <svg class="icon">
        <use :xlink:href="BIAOZHI"></use>
      </svg>
      <span>{{websiteName}}</span>
    </div>
    <el-menu class="el-menu-demo"
             mode="horizontal"
             background-color="#fefefe"
             text-color="#302f4b"
             active-text-color="#F17C67">
      <el-menu-item v-for="item in NavLeft" :index="item.num"  :key="item.name" @click="jumpTo(item.path, item.name)">{{item.name}}</el-menu-item>
      <el-menu-item>
        <div class="header-search">
          <input type="text" placeholder="搜索音乐" @keyup.enter="goSearch" v-model="searchWord">
          <div class="search-btn" @click="goSearch">
            <svg class="icon">
              <use :xlink:href="SOUSUO"></use>
            </svg>
          </div>
        </div>
      </el-menu-item>
      <el-menu-item v-if="!loginIn" v-for="item in NavRight" :index="item.num"  :key="item.name" @click="setShow(item)">{{item.name}}</el-menu-item>
<!--      <el-menu-item v-if="loginIn" v-for="item in menuList" :index="item.num"  :key="item.name" >{{item.name}}</el-menu-item>-->
      <el-menu-item v-if="loginIn">
        {{username}}
        <el-dropdown trigger="click">
          <el-avatar :size="medium" :src="attachImageUrl(this.avatar)"></el-avatar>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div>
                <svg class="out-setting" style="height: 30px; width: 30px; vertical-align: middle">
                  <use :xlink:href="SHEZHI"></use>
                </svg>
                <span style="vertical-align: middle;  cursor: pointer" @click="goSetting">设置</span>
              </div>
            </el-dropdown-item>
            <el-dropdown-item>
              <svg class="out-setting" style="height: 30px; width: 30px; vertical-align: middle" @click="logout">
                <use :xlink:href="TUICHU"></use>
              </svg>
              <span style="vertical-align: middle;  cursor: pointer" @click="logout">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
<!--    分割-->
<!--    <div class="header-right" v-if="loginIn">-->
<!--      <div class="user"></div>-->
<!--      <div class="menu">-->
<!--        <li v-for="(item,index) in menuList" :key="index" @click="goMenuList(item.path)">{{item.name}}</li>-->
<!--      </div>-->
<!--    </div>-->
    <Login :isShowLogin="isShowLogin" @fromChild="LoginDialogVisible"></Login>
    <SignUp :isShowSignUp="isShowSignUp" @fromChild="SignUpDialogVisible"></SignUp>
  </div>
</template>

<script>
import Login from './Login'
import SignUp from './SignUp'
import {mapGetters, mapMutations} from 'vuex'
import { NavRight, NavLeft, menuList } from '../assets/data/header'
import { ICON } from '../assets/icon'
import mixin from '../mixins'

export default {
  name: 'TheHeader',
  mixins: [mixin],
  components: {
    Login,
    SignUp
  },
  data () {
    return {
      activeIndex: '首页',
      searchWord: '',
      isShowLogin: false,
      isShowSignUp: false,
      websiteName: 'Tchai-music',
      NavLeft: NavLeft,
      NavRight: NavRight,
      menuList: menuList,
      BIAOZHI: ICON.BIAOZHI,
      SOUSUO: ICON.SOUSUO,
      SHEZHI: ICON.SHEZHI,
      TUICHU: ICON.TUICHU,
      radio: '1',
      dateTable: new Date(),
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      value1: '',
      value2: ''

    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'activeName',
      'avatar',
      'username',
      'loginIn'
    ])
  },
  methods: {
    ...mapMutations([
      'setLoginIn',
      'setUsername',
      'setUserId',
      'setAvatar',
      'setSearchWord',
      'setListOfSongs'
    ]),
    goSetting () {
      this.$router.push({path: '/setting'})
    },
    setShow (item) {
      if (item.name === '登录') {
        this.isShowLogin = true
      } else {
        this.isShowSignUp = true
      }
      console.log(this.isShowSignUp)
    },
    jumpTo (path, name) {
      // document.querySelector('.menu').classList.remove('show')
      this.changeIndex(name)
      if (!this.loginIn && path === '/my-music') {
        this.notify('请先登录', 'warning')
      } else {
        this.$router.push({path: path})
      }
    },
    LoginDialogVisible (val) {
      this.isShowLogin = val
    },
    SignUpDialogVisible (val) {
      this.isShowSignUp = val
    },
    changeIndex (value) {
      this.$store.commit('setActiveName', value)
    },
    goSearch () {
      this.setSearchWord(this.searchWord)
      this.$router.push({path: '/search', query: {searchWord: this.searchWord}})
    },
    logout () {
      this.$confirm('确定退出改账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.setAvatar(null)
        this.setUsername(null)
        this.setUserId(null)
        this.setLoginIn(false)
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/css/the-header";
</style>
