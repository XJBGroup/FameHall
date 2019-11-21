import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.prototype.$ajax = axios;
Vue.prototype.$axios = axios
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

