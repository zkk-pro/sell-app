// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import Goods from '@/components/goods/goods';
import Ratings from '@/components/ratings/ratings';
import Seller from '@/components/seller/seller';
import './common/less/base.less';
// import Axios from 'axios';

Vue.config.productionTip = false;
Vue.use(VueRouter);
// Vue.use(Axios);

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   template: '<App />',
//   components: { App }
// });
// let app = Vue.extend(App);
const routes = [
  {path: '/goods', component: Goods},
  {path: '/ratings', component: Ratings},
  {path: '/seller', component: Seller}
];
const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  routes
});
new Vue({
  template: '<App />',
  components: { App },
  router
}).$mount('#app');
router.push('/goods');
