import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'app',
    component: () => import('@/pages/AppWrapper.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/Users/UserView.vue')
      },
      {
        path: 'docs',
        name: 'docs',
        component: () => import('@/views/Docs/DocsView.vue')
      },
      {
        path: 'docnew',
        name: 'docnew',
        component: () => import('@/views/Docs/DocNew.vue')
      },
      {
        path: 'chat',
        name: 'chat',
        component: () => import('@/views/ChatBot.vue')
      }
    ]
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/pages/SigninView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/pages/SignupView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/404View.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
