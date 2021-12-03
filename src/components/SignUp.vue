<template>
  <el-dialog title="注册账号" :visible.sync="SignUpDialogVisible" :append-to-body="true" width="500px">
    <div class="signup">
      <el-form :model="SignUpUser" status-icon ref="signUpForm" :rules="rules" class="demo-ruleForm" label-width="70px">
        <el-form-item prop="username" label="用户名">
          <el-input placeholder="用户名" v-model="SignUpUser.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" placeholder="密码" v-model="SignUpUser.password"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="重复密码">
          <el-input type="password" placeholder="重复密码" v-model="SignUpUser.repeatPassword"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="SignUpUser.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
            <el-radio label="3">保密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="introduction" label="介绍">
          <el-input  type="textarea" placeholder="签名" v-model="SignUpUser.introduction"></el-input>
        </el-form-item>
        <el-form-item prop="birth" label="生日">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="SignUpUser.birth"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <div class="sign-up-button">
          <el-button type="warning" @click="SignUp">注册</el-button>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import {HttpManager} from '../api'

export default {
  name: 'Resign',
  props: {
    isShowSignUp: Boolean
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
      SignUpDialogVisible: false,
      SignUpUser: {
        username: '',
        password: '',
        repeatPassword: '',
        sex: '',
        introduction: '',
        birth: ''
      },
      rules: {
        username: [{validator: validateName, trigger: 'blur'}],
        password: [{validator: validatePassword, trigger: 'blur'}]
      }
    }
  },
  watch: {
    isShowSignUp: function (val) {
      this.SignUpDialogVisible = val
    },
    SignUpDialogVisible: function (val) {
      if (!val) {
        this.$refs['signUpForm'].resetFields()
        this.$emit('fromChild', val)
      }
    }
  },
  methods: {
    SignUp () {
      this.$refs['signUpForm'].validate(valid => {
        if (valid) {
          console.log('sb')
          HttpManager.getSignUp({
            username: this.SignUpUser.username,
            password: this.SignUpUser.password,
            sex: this.SignUpUser.sex,
            birth: this.SignUpUser.birth,
            introduction: this.SignUpUser.introduction
          })
            .then(res => {
              console.log(res.code)
              if (res.code === '001') {
                console.log('dd')
                this.SignUpDialogVisible = false
                // this.notifySucceed(res.msg)
                this.$message({
                  type: 'success',
                  message: '注册成功!'
                })
              } else {
                // 清空输入框的校验状态
                this.$refs['signUpForm'].resetFields()
                // 弹出通知框提示登录失败信息
                console.log('wrong')
                this.notifyError(res.msg)
              }
            })
            .catch(err => {
              this.$message({
                type: 'info',
                message: '注册失败!'
              })
              return Promise.reject(err)
            })
        } else {
          console.log('ree')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
