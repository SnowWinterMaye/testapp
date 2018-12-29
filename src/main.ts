import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import mask from './directive/mask'

Vue.config.productionTip = false

Vue.directive('mask', mask)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
