import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        },
        {
          name: 'publish-edit',
          path: '/publish/:id',
          component: () => import('@/views/publish')
        }
      ]
    },
    { name: 'login', path: '/login', component: () => import('@/views/login') }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    // 访问登录页面
    if (window.localStorage.getItem('user_info')) {
      // 已经登录时
      if (from.path === to.path) {
        NProgress.done()
      }
      next({ path: '/' })
    } else {
      // 未登录时
      next()
    }
  } else {
    // 访问非登录页面
    if (window.localStorage.getItem('user_info')) {
      // 已经登录时
      next()
    } else {
      // 未登录时
      if (from.path === '/login') {
        NProgress.done()
      }
      next({ name: 'login' })
    }
  }
})
router.afterEach((to, from) => {
  NProgress.done()
})

export default router
