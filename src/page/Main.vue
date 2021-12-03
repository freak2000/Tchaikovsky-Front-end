<template>
  <div>
    <song-audio></song-audio>
    <the-header></the-header>
    <router-view class="music-content"/>
    <play-bar/>
    <the-footer></the-footer>
  </div>
</template>

<script>
import SongAudio from '../components/SongAudio'
import TheHeader from '../components/TheHeader'
import PlayBar from '../components/PlayBar'
import TheFooter from '../components/TheFooter'
export default {
  components: {
    SongAudio,
    TheHeader,
    PlayBar,
    TheFooter
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/css/main";
</style>
