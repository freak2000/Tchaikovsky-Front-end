const user = {
  state: {
    userId: '',
    username: '',
    avatar: 'public/imgs/avatar/QQ.jpg',
    likeList: [],
    likePortfolio: []
  },
  getters: {
    userId: state => {
      let userId = state.userId
      if (!userId) {
        userId = JSON.parse(window.localStorage.getItem('userId') || null)
      }
      return userId
    },
    likeList: state => {
      let likeList = state.likeList
      if (likeList.length === 0) {
        likeList = JSON.parse(window.localStorage.getItem('likeList') || null)
      }
      return likeList
    },
    likePortfolio: state => {
      let likePortfolio = state.likePortfolio
      if (likePortfolio.length === 0) {
        likePortfolio = JSON.parse(window.localStorage.getItem('likePortfolio') || null)
      }
      return likePortfolio
    },
    username: state => {
      let username = state.username
      if (!username) {
        username = JSON.parse(window.localStorage.getItem('username') || null)
      }
      return username
    },
    avatar: state => {
      let avatar = state.avatar
      if (avatar === 'public/imgs/avatar/QQ.jpg') {
        avatar = JSON.parse(window.localStorage.getItem('avatar') || null)
      }
      return avatar
    }
  },
  mutations: {
    setUserId: (state, userId) => {
      state.userId = userId
      window.localStorage.setItem('userId', JSON.stringify(userId))
    },
    setLikeList: (state, likeList) => {
      state.likeList = likeList
      window.localStorage.setItem('likeList', JSON.stringify(likeList))
    },
    setLikePortfolio: (state, likePortfolio) => {
      state.likePortfolio = likePortfolio
      window.localStorage.setItem('likePortfolio', JSON.stringify(likePortfolio))
    },
    setUsername: (state, username) => {
      state.username = username
      window.localStorage.setItem('username', JSON.stringify(username))
    },
    setAvatar: (state, avatar) => {
      state.avatar = avatar
      window.localStorage.setItem('avatar', JSON.stringify(avatar))
    }
  },
  actions: {}
}

export default user
