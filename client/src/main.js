// import { L } from 'vue2-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import Vue from 'vue'
import App from './App.vue'
// import 'leaflet/dist/images/marker-icon.png'
// import router from './router'

// delete L.icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

import store from './store'
const bootstrap = require('bootstrap')
import jQuery from 'jquery';
global.jQuery = jQuery;
global.$ = jQuery;
import 'bootstrap/dist/css/bootstrap.css';
Vue.use(bootstrap);
Vue.config.productionTip = false

new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')
