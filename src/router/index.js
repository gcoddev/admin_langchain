import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'app',
    component: () => import('@/pages/AppWrapper.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue')
      },
      // USUARIOS
      {
        path: '/user',
        name: 'user',
        component: () => import('@/views/Users/UserView.vue')
      },
      {
        path: '/usernew',
        name: 'usernew',
        component: () => import('@/views/Users/UserNew.vue')
      },
      {
        path: '/useredit',
        name: 'useredit',
        component: () => import('@/views/Users/UserEdit.vue')
      },
      // DOCUMENTOS
      {
        path: '/doc',
        name: 'doc',
        component: () => import('@/views/Docs/DocView.vue')
      },
      {
        path: '/docnew',
        name: 'docnew',
        component: () => import('@/views/Docs/DocNew.vue')
      },
      {
        path: '/docedit',
        name: 'docedit',
        component: () => import('@/views/Docs/DocEdit.vue')
      },
      // // VIDEOS
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/Videos/VideoView.vue')
      },
      {
        path: '/videonew',
        name: 'videonew',
        component: () => import('@/views/Videos/VideoNew.vue')
      },
      {
        path: '/videoedit',
        name: 'videoedit',
        component: () => import('@/views/Videos/VideoEdit.vue')
      },
      // // BLOGS
      {
        path: '/blog',
        name: 'blog',
        component: () => import('@/views/Blogs/BlogView.vue')
      },
      {
        path: '/blognew',
        name: 'blognew',
        component: () => import('@/views/Blogs/BlogNew.vue')
      },
      {
        path: '/blogedit',
        name: 'blogedit',
        component: () => import('@/views/Blogs/BlogEdit.vue')
      },
      // {
      //   path: 'chat',
      //   name: 'chat',
      //   component: () => import('@/views/ChatBot.vue')
      // }
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
