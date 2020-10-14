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
    //配置详情页路由
    {
      path: 'detail/1/:movieId',
      components: {
        //此处是为了组件切换动画进行中被覆盖的组件内容不为空
        default: () => import('@/components/NowPlaying'),
        detail: () => import('@/views/Movie/detail'),
      },
      //对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：通过 props 解耦
      //这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试
      //如果 props 被设置为 true，route.params 将会被设置为组件属性
      props: {
        detail: true,
      },
    },
    {
      path: 'detail/2/:movieId',
      components: {
        default: () => import('@/components/ComingSoon'),
        detail: () => import('@/views/Movie/detail'),
      },
      props: {
        detail: true,
      },
    },
    //配置重定向路由
    { path: '/movie', redirect: '/movie/nowPlaying' },
  ],
};
