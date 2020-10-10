//主模块
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//引入axios,全局配置axios对象
import axios from 'axios';
Vue.prototype.axios = axios;
//创建一个处理图片尺寸的全局过滤器
Vue.filter('setWh', (url, arg) => {
  return url.replace(/w\.h/, arg);
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
