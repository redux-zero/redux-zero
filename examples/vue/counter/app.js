import Vue from 'vue'
import Counter from './Counter.vue'
import store from './store'

Vue.prototype.$store = store;

new Vue({
  el: '#app',
  render: h => h(Counter)
});