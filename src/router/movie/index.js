export default {
  path: '/movie',
  //组件按需引入 @代表src目录
  component: () => import('@/views/Movie'),
  //配置二级路由
  children: [
    { path: 'city', component: () => import('@/components/City') },
    { path: 'nowPlaying', component: () => import('@/components/NowPlaying') },
    { path: 'comingSoon', component: () => import('@/components/ComingSoon') },
    { path: 'search', component: () => import('@/components/Search') },
    //配置重定向路由
    { path: '/movie', redirect: '/movie/nowPlaying' },
  ],
};
