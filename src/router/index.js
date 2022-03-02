import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '夢百貨'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '關於夢百貨 ✦ 夢百貨'
    }
  },
  {
    path: '/commissionsList',
    name: 'CommissionsList',
    component: () => import(/* webpackChunkName: "commissionsList" */ '../views/CommissionsList.vue'),
    meta: {
      title: '委託列表 ✦ 夢百貨'
    }
  },
  {
    path: '/illustratorsList',
    name: 'IllustratorsList',
    component: () => import(/* webpackChunkName: "illustratorsList" */ '../views/IllustratorsList.vue'),
    meta: {
      title: '創作者列表 ✦ 夢百貨'
    }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import(/* webpackChunkName: "terms" */ '../views/Terms.vue'),
    meta: {
      title: '服務條款與隱私權政策 ✦ 夢百貨'
    }
  },
  {
    path: '/products/:id',
    name: 'Products',
    component: () => import(/* webpackChunkName: "product" */ '../views/Products.vue'),
    meta: {
      title: '委託項目 ✦ 夢百貨'
    }
  },
  {
    path: '/member/:id',
    name: 'Member',
    component: () => import(/* webpackChunkName: "member" */ '../views/Member.vue'),
    meta: {
      title: '會員主頁 ✦ 夢百貨'
    }
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/user/User.vue'),
    children: [
      {
        path: '',
        name: 'UserHome',
        component: () => import(/* webpackChunkName: "userhome" */ '../views/user/UserHome.vue'),
        meta: {
          login: true,
          user: true,
          title: '會員中心 ✦ 夢百貨 '
        }
      },
      {
        path: 'myinfo',
        name: 'UserMyInfo',
        component: () => import(/* webpackChunkName: "usermyinfo" */ '../views/user/UserMyInfo.vue'),
        meta: {
          login: true,
          user: true,
          title: '個人資料 ✦ 夢百貨 '
        }
      },
      {
        path: 'album',
        name: 'UserAlbum',
        component: () => import(/* webpackChunkName: "useralbum" */ '../views/user/UserAlbum.vue'),
        meta: {
          login: true,
          user: true,
          title: '相簿管理 ✦ 夢百貨 '
        }
      },
      {
        path: 'orders',
        name: 'UserOrders',
        component: () => import(/* webpackChunkName: "userorders" */ '../views/user/UserOrders.vue'),
        meta: {
          login: true,
          user: true,
          title: ' 委託交易 ✦ 夢百貨 '
        }
      }
    ]
  },
  {
    path: '/illustrator',
    name: 'Illustrator',
    component: () => import(/* webpackChunkName: "illustrator" */ '../views/illustrator/Illustrator.vue'),
    children: [
      {
        path: '',
        name: 'IllustratorHome',
        component: () => import(/* webpackChunkName: "illustratorhome" */ '../views/illustrator/IllustratorHome.vue'),
        meta: {
          login: true,
          illustrator: true,
          title: '會員中心 ✦ 夢百貨 '
        }
      },
      {
        path: 'myinfo',
        name: 'IllustratorMyInfo',
        component: () => import(/* webpackChunkName: "illustratormyinfo" */ '../views/illustrator/IllustratorMyInfo.vue'),
        meta: {
          login: true,
          illustrator: true,
          title: '個人資料 ✦ 夢百貨 '
        }
      },
      {
        path: 'products',
        name: 'IllustratorProducts',
        component: () => import(/* webpackChunkName: "illustratorproducts" */ '../views/illustrator/IllustratorProducts.vue'),
        meta: {
          login: true,
          illustrator: true,
          title: '項目管理 ✦ 夢百貨 '
        }
      },
      {
        path: 'album',
        name: 'IllustratorAlbum',
        component: () => import(/* webpackChunkName: "illustratoralbum" */ '../views/illustrator/IllustratorAlbum.vue'),
        meta: {
          login: true,
          illustrator: true,
          title: '相簿管理 ✦ 夢百貨 '
        }
      },
      {
        path: 'orders',
        name: 'IllustratorOrders',
        component: () => import(/* webpackChunkName: "illustratororders" */ '../views/illustrator/IllustratorOrders.vue'),
        meta: {
          login: true,
          illustrator: true,
          title: '相簿管理 ✦ 夢百貨 '
        }
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import(/* webpackChunkName: "admin" */ '../views/admin/Admin.vue'),
    children: [
      {
        path: '',
        name: 'AdminUsers',
        component: () => import(/* webpackChunkName: "adminusers" */ '../views/admin/AdminUsers.vue'),
        meta: {
          login: true,
          admin: true,
          title: '用戶管理 ✦ 夢百貨 '
        }
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import(/* webpackChunkName: "adminproducts" */ '../views/admin/AdminProducts.vue'),
        meta: {
          login: true,
          admin: true,
          title: '項目管理 ✦ 夢百貨 '
        }
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import(/* webpackChunkName: "adminorders" */ '../views/admin/AdminOrders.vue'),
        meta: {
          login: true,
          admin: true,
          title: '訂單管理 ✦ 夢百貨 '
        }
      },
      {
        path: 'questions',
        name: 'AdminQuestions',
        component: () => import(/* webpackChunkName: "adminquestions" */ '../views/admin/AdminQuestions.vue'),
        meta: {
          login: true,
          admin: true,
          title: '問題回報 ✦ 夢百貨 '
        }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "notfound" */ '../views/NotFound.vue'),
    meta: {
      title: 'Not Found ✦ 夢百貨'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

// 進到每頁之前
router.beforeEach((to, from, next) => {
  const user = store.getters['user/user']
  // 如果使用者沒有登入，把他導回首頁
  if (to.meta.login && !user.isLogin) {
    next('/')
  // 如果使用者沒有委託者或管理員權限，把他導回首頁
  } else if (to.meta.user && user.isIllustrator) {
    next('/')
  // 如果使用者沒有創作者或管理員權限，把他導回首頁
  } else if (to.meta.illustrator && user.isUser) {
    next('/')
  // 如果使用者沒有管理員權限，把他導回首頁
  } else if (to.meta.admin && !user.isAdmin) {
    next('/')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  document.title = to.meta.title
})

export default router
