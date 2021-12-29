import {createRouter, createWebHashHistory} from 'vue-router'

import Login from "../views/login/Login";
import Register from "../views/register/Register";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // 实现进入登录页面时 判断是否登录 如果登录就跳转首页
    beforeEnter: (to, from, next) => {
      const {isLogin} = localStorage;
      (isLogin) ? next({name: "Home"}) : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/shop/:id',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop.vue')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/CartList.vue')
  },
  {
    path: '/orderConfirm/:id',
    name: 'OrderConfirm',
    component: () => import(/* webpackChunkName: "orderConfirm" */ '../views/orderConfirm/OrderConfirm.vue')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "orderList" */ '../views/orderList/OrderList.vue')
  },

  /* {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/!* webpackChunkName: "about" *!/ '../views/About.vue')
  } */
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 任何 路由都会执行该函数
// 当未登录时，自动跳转到登录页面
router.beforeEach((to, from, next) => {
  console.log(to, from)
  const {isLogin} = localStorage;
  (isLogin || to.name === "Login" || to.name === "Register") ? next() : next({name: "Login"});
})

export default router
