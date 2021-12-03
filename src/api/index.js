import {get, post} from './request'

const HttpManager = {
  getCarousel: () => get('carousel'),
  getPortfolio: () => get('portfolio/allPortfolio'),
  getSongs: () => get('songs/allSongs'),
  getSongsByPortfolio: (data) => post(`songs/songByPortfolio`, data),
  getLogin: (data) => post('user/login', data),
  getSignUp: (data) => post('user/signup', data),
  getMsg: (data) => post('user/msg', data),
  modifyMsg: (data) => post('user/modify', data),
  setAvatar: (data, config) => post('user/avatar', data, config),
  searchSongs: (data) => post('songs/search', data),
  searchPortfolio: data => post('portfolio/search', data),
  likeSongs: data => post('songs/like', data),
  getLikedSongs: data => post('songs/likedSongs', data),
  likePortfolio: data => post('portfolio/like', data),
  getLikedPortfolio: data => post('portfolio/likedPortfolio', data)
}

export {HttpManager}
