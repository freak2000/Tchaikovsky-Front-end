const NavLeft = [{
  name: '首页',
  path: '/',
  num: 1
}, {
  name: '作品集',
  path: '/portfolio',
  num: 2
}, {
  name: '人物介绍',
  path: '/introduction',
  num: 3
}, {
  name: '目录',
  path: '/list',
  num: 4
}, {
  name: '我的',
  path: '/my-music',
  num: 5
}
]

const NavRight = [{
  name: '登录',
  path: '/login',
  num: 6
}, {
  name: '注册',
  path: '/sign-up',
  num: 7
}
]

// 用户下拉菜单项
const menuList = [{
  name: '设置',
  path: '/setting',
  num: 6
}, {
  name: '退出',
  path: 0,
  num: 7
}]

export {
  NavLeft,
  NavRight,
  menuList
}
