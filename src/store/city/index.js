const state = {
  nm: window.localStorage.getItem('nowNm') || '北京',
  id: window.localStorage.getItem('nowId') || 1,
};
//getter类似于 Vue 中的 计算属性（可以认为是 store 的计算属性）
//action: 一组方法，其中可以包含异步操作
//并不直接改变state，而是发起mutations
const actions = {};
//mutation: 一组方法，是改变store中状态的执行者，只能同步
// 传入的额外的参数，即 mutation 的载荷（payload）
const mutations = {
  CITY_INFO(state, payload) {
    state.nm = payload.nm;
    state.id = payload.id;
  },
};

export default {
  //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  namespaced: true,
  state,
  actions,
  mutations,
};
