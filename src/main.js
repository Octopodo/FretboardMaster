import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import './filters/filters.js'

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
