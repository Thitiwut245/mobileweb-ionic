import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/list'
  },
  {
    path: '/list',
    component: () => import('@/views/ExpenseList.vue')
  },
  {
    path: '/edit/:id',
    component: () => import('@/views/EditExpense.vue')
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/list'
      },
      {
        path: 'list',
        component: () => import('@/views/TabList.vue')
      },
      {
        path: 'add',
        component: () => import('@/views/AddExpense.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
