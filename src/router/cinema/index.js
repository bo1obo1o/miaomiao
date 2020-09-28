export default {
  path: '/cinema',
  //组件按需引入 @代表src目录
  component: () => import('@/views/Cinema'),
};
