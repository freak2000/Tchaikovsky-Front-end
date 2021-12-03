<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      drag
      ref="uploadPic"
      :before-upload="beforeAvatarUpload"
      list-type="picture"
      :http-request="changeAvatar"
      action="">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {HttpManager} from '../api'
export default {
  name: 'Upload',
  data () {
    return {
      imageUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'userId',
      'username'
    ])
  },
  methods: {
    ...mapMutations([
      'setAvatar'
    ]),
    changeAvatar () {
      const picArray = this.$refs.uploadPic.uploadFiles
      console.log(this.$refs.uploadPic.uploadFiles[0].raw)
      let pic = new FormData()
      pic.append('avatar', picArray[0].raw)
      pic.append('id', this.userId)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime()
        }
      }
      HttpManager.setAvatar(pic, config)
        .then(res => {
          console.log(res.filePath)
          this.setAvatar(res.filePath)
          this.$message({
            type: 'success',
            message: '更换头像成功!'
          })
          this.$router.push({path: '/my-music'})
        }).catch(err => {
          console.log(err)
        })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$emit('handleMounted')
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
@import '../assets/css/upload.scss';
</style>
