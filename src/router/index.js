import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'

Vue.use(Router)
Vue.use(Vuex)

const constRoute = [
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/error',
    name: 'Error',
    component: () => import('../page/Error')
  },
  {
    path: '/',
    name: 'main',
    component: () => import('../page/Main'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../page/Home')
      },
      {
        path: '/portfolio',
        name: 'Portfolio',
        component: () => import('../page/Portfolio')
      },
      {
        path: '/introduction',
        name: 'introduction',
        component: () => import('../page/Introduction')
      },
      {
        path: '/list',
        name: 'list',
        component: () => import('../page/SongList')
      },
      {
        path: '/my-music',
        name: 'my-music',
        component: () => import('../page/MyMusic')
      },
      {
        path: '/song-list-album/:portfolio_id',
        name: 'song-list-album',
        component: () => import('../page/SongListAlbum')
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('../page/Setting')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('../page/Search')
      }
    ]
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: (o, from, savedPosition) => ({ x: 0, y: 0 }),
  routes: constRoute
})
