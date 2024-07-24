import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DetailProductView from '../views/DetailProductView.vue'
import ChatView from '../views/ChatView.vue'
import MyOrder from '../views/MyOrder.vue'
import WalentHistory from '../views/WalentHistoryView.vue'
import Walent from '../views/WaletView.vue'
import Favorit from '../views/FavoritView.vue'
import Ads from '../views/AdsView.vue'
import Notification from '../views/NotificationView.vue'
import AdresView from '../views/AdresView.vue'
import SettingView from '../views/SettingView.vue'
import CreateAds1 from '../views/CreateAds1.vue'
import CreateAds2 from '../views/CreateAds2.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/detailProductView',
    name: 'detailProductView',
    component: DetailProductView,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
  },
  {
    path: '/myOrder',
    name: 'myOrder',
    component: MyOrder,
  },
  {
    path: '/walent',
    name: 'walent',
    component: Walent,
  },
  {
    path: '/walentHistory',
    name: 'walentHistory',
    component: WalentHistory,
  },
  {
    path: '/favorit',
    name: 'favorit',
    component: Favorit,
  },
  {
    path: '/ads',
    name: 'ads',
    component: Ads,
  },
  {
    path: '/notif',
    name: 'notif',
    component: Notification,
  },
  {
    path: '/adres',
    name: 'adres',
    component: AdresView,
  },
  {
    path: '/setting',
    name: 'setting',
    component: SettingView,
  },
  {
    path: '/createAds1',
    name: 'createAds1',
    component: CreateAds1,
  },
  {
    path: '/createAds2',
    name: 'createAds2',
    component: CreateAds2,
  }
  // {
  //   path: '/product',
  //   name: 'product',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/ProductView.vue')
  // },
  // {
  //   path: '/favourites',
  //   name: 'favourites',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/FavouritesView.vue')
  // },
  // {
  //   path: '/myProd',
  //   name: 'myProd',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/MyProdView.vue')
  // },
  // {
  //   path: '/favourites',
  //   name: 'favourites',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/FavouritesView.vue')
  // },
  // {
  //   path: '/notices',
  //   name: 'notices',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/NoticesView.vue')
  // },
  // {
  //   path: '/createProd',
  //   name: 'createProd',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/CreateProdView.vue')
  // },
  // {
  //   path: '/settings',
  //   name: 'settings',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/SettingsView.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
