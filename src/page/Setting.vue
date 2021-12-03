<template>
  <div class="setting">
    <div class="nav">
      <el-button type="primary" plain @click="goMsg">修改个人信息</el-button>
      <el-button type="primary" plain @click="goUpload">更换头像</el-button>
    </div>
    <el-divider></el-divider>
    <component :is="com"> </component>
  </div>
</template>

<script>
import Msg from '../components/Msg'
import Upload from '../components/Upload'
export default {
  name: 'setting',
  data () {
    return {
      com: 'Msg'
    }
  },
  components: {
    Msg,
    Upload
  },
  methods: {
    goMsg () {
      this.com = 'Msg'
    },
    goUpload () {
      this.com = 'Upload'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/setting';
</style>
