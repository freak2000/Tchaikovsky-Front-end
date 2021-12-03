<template>
  <el-form :model="SignUpUser" status-icon ref="signUpForm" :rules="rules" class="info" label-width="70px">
    <el-form-item prop="username" label="用户名">
      <el-input placeholder="用户名" v-model="SignUpUser.username"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码">
      <el-input type="password" placeholder="密码" v-model="SignUpUser.password"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="SignUpUser.sex">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
        <el-radio :label="3">保密</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item prop="introduction" label="介绍">
      <el-input  type="textarea" placeholder="签名" v-model="SignUpUser.introduction"></el-input>
    </el-form-item>
    <el-form-item prop="birth" label="生日">
      <el-date-picker
        v-model="SignUpUser.birth"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <div class="confirm">
      <el-button type="primary" round @click="modifyMsg">确定修改</el-button>
      <el-button  round @click="cancel">取消</el-button>
    </div>
  </el-form>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {HttpManager} from '../api'

export default {
  name: 'Msg',
  data () {
    // 用户名验证
    let validateName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      }
      //  4-11个字符(可包含中文,数字,字母和下划线)
      const userNameRule = /^[\da-zA-Z_\u4e00-\u9f5a]{3,10}$/
      if (userNameRule.test(value)) {
        this.$refs.signUpForm.validateField('checkPass')
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
        this.$refs.signUpForm.validateField('checkPass')
        return callback()
      } else {
        return callback(new Error('请输入以字母开头,长度在6-14之间,允许字母数字和下划线的密码'))
      }
    }
    return {
      labelPosition: 'right',
      SignUpUser: {
        username: '',
        password: '',
        sex: 1,
        introduction: '',
        birth: ''
      },
      rules: {
        username: [{validator: validateName, trigger: 'blur'}],
        password: [{validator: validatePassword, trigger: 'blur'}]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'username'
    ])
  },
  mounted () {
    this.getMsg()
  },
  methods: {
    ...mapMutations([
      'setUsername'
    ]),
    getMsg () {
      HttpManager.getMsg({userId: this.userId})
        .then(res => {
          this.SignUpUser.username = res.user[0].username
          this.SignUpUser.password = res.user[0].password
          this.SignUpUser.sex = res.user[0].sex
          this.SignUpUser.introduction = res.user[0].introduction
          this.SignUpUser.birth = res.user[0].birth
        })
    },
    modifyMsg () {
      this.$confirm('确定修改账号信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        HttpManager.modifyMsg({
          userId: this.userId,
          username: this.SignUpUser.username,
          password: this.SignUpUser.password,
          sex: this.SignUpUser.sex,
          introduction: this.SignUpUser.introduction,
          birth: this.SignUpUser.birth
        })
      }
      ).then(res => {
        this.setUsername(this.SignUpUser.username)
        console.log(res)
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.$router.push({path: '/my-music'})
      })
    },
    cancel () {
      this.$router.push({path: '/my-music'})
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/msg";
</style>
