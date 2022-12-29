import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'
//将vue-router注册进vue全局中,可在任意位置调用this.$Router....
Vue.use(Router)

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
//路由主体配置，也是配置中唯一需要动的地方，一个对象数组固定写法
export const constantRoutes = [
  {
    //匹配后缀为login的url路径
    path: '/login',
    //表明这个路径转到views目录下的login/index.vue页面
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,//表明该页面使用这个组件,也就是左侧的tabbar栏
    redirect: '/dashboard',
    //children的意思是layout的app-main需要显示的页面
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {title: '首页', icon: 'dashboard'}
    }]
  },

  {
    path: '/notice',
    component: Layout,
    children: [{
      path: 'index',
      name: 'Notice',
      component: () => import('@/views/notice/Index'),
      meta: {title: '用户反馈', icon: 'dashboard'}
    }]
  },
  {
    path: '/superManage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Super',
        component: () => import('@/views/supermanage/Index'),
        meta: {title: '超管管理', icon: 'table'}
      }
    ]
  },

  {
    path: '/goodsManage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'goods',
        component: () => import('@/views/goodsmanage/Index'),
        meta: {title: '商品管理', icon: 'form'}
      }
    ]
  },

  {
    path: '/dynamicManage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'dynamic',
        component: () => import('@/views/dynamicmanage/Index'),
        meta: {title: '动态管理', icon: 'form'}
      }
    ]
  },
  {
    path: '/imageManage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'image',
        component: () => import('@/views/indeximage/Index'),
        meta: {title: '首页轮播图管理', icon: 'form'}
      }
    ]
  },


  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
