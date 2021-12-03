<template>
  <el-dialog title="账号登录" :visible.sync="LoginDialogVisible" :append-to-body="true" width="500px">
    <div class="login">
      <el-form :model="LoginUser" status-icon ref="loginForm" :rules="rules" class="demo-ruleForm" >
        <el-form-item prop="username">
          <el-input placeholder="用户名" v-model="LoginUser.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" @keyup.enter.native="loginIn" v-model="LoginUser.password"></el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="danger" @click="Login">登录</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {HttpManager} from '../api'
export default {
  name: 'Login',
  props: {
    isShowLogin: Boolean
  },
  data () {
    // 用户名验证
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      }
      //  4-11个字符(可包含中文,数字,字母和下划线)
      const userNameRule = /^[\da-zA-Z_\u4e00-\u9f5a]{3,10}$/
      if (userNameRule.test(value)) {
        this.$refs.loginForm.validateField('checkPass')
        return callback()
      } else {
        return callback(new Error('4-11个字符(可包含中文,数字,字母和下划线)'))
      }
    }
    // 密码验证
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入密码'))
      }
      // 密码以字母开头,长度在6-14之间,允许字母数字和下划线
      const userNameRule = /^[a-zA-Z]\w{5,13}$/
      if (userNameRule.test(value)) {
        this.$refs.loginForm.validateField('checkPass')
        return callback()
      } else {
        return callback(new Error('请输入以字母开头,长度在6-14之间,允许字母数字和下划线的密码'))
      }
    }
    return {
      LoginDialogVisible: false,
      LoginUser: {
        username: '',
        password: ''
      },
      rules: {
        username: [{validator: validateName, trigger: 'blur'}],
        password: [{validator: validatePassword, trigger: 'blur'}]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  watch: {
    isShowLogin: function (val) {
      this.LoginDialogVisible = val
    },
    LoginDialogVisible: function (val) {
      if (!val) {
        this.$refs['loginForm'].resetFields()
        this.$emit('fromChild', val)
      }
    }
  },
  methods: {
    ...mapMutations([
      'setLikeList',
      'setUserId',
      'setUsername',
      'setAvatar',
      'setLoginIn',
      'setLikePortfolio'
    ]),
    Login () {
      this.$refs['loginForm'].validate(valid => {
        if (valid) {
          HttpManager.getLogin({
            username: this.LoginUser.username,
            password: this.LoginUser.password
          })
            .then(res => {
              console.log(res.code)
              console.log(res.user[0])
              if (res.code === '005') {
                console.log(res)
                this.LoginDialogVisible = false
                this.setLoginIn(true)
                this.setAvatar(res.user[0].avatar)
                this.setUserId(res.user[0].id)
                this.setUsername(res.user[0].username)
                this.$message({
                  type: 'success',
                  message: '登录成功!'
                })
              } else {
                // 清空输入框的校验状态
                this.$refs['loginForm'].resetFields()
                // 弹出通知框提示登录失败信息
                this.notifyError(res.msg)
              }
            })
            .then(res =>
              HttpManager.getLikedSongs({
                'userId': this.userId
              })
            )
            .then(res => {
              console.log(res)
              console.log(res.likes)
              this.setLikeList(res.likes)
              HttpManager.getLikedPortfolio({
                'userId': this.userId
              })
                .then(res => {
                  console.log(1555)
                  console.log(res)
                  this.setLikePortfolio(res.likes)
                })
            })
            .catch(err => {
              this.$message({
                type: 'info',
                message: '登录失败!'
              })
              return Promise.reject(err)
            })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
