import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./../views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./../views/About.vue')
    },
    {
      path: '/:namespace/:page',
      name: 'Test',
      props: router => ({
        namespace: router.params.namespace,
        page: router.params.page
      }),
      component: () => import('./../views/Test.vue')
    }
  ]
})
