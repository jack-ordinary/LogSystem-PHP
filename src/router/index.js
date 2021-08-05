import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    // component: () => import('@/views/dashboard/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: '首页',
      icon: '后台'
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '主控台', icon: '后台' }
      },
      {
        path: 'create',
        name: 'CreateImage',
        component: () => import('@/views/image/create'),
        meta: { title: '监控页', icon: '添加' },
        hidden: true
      },
      {
        path: 'create',
        name: 'CreateImage',
        component: () => import('@/views/image/create'),
        meta: { title: '工作台', icon: '添加' },
        hidden: true
      }
    ]
  },
  {
    path: '/image',
    component: Layout,
    redirect: '/image/list',
    name: 'Image',
    meta: {
      title: '系统管理',
      icon: '图片'
    },
    children: [
      {
        path: 'create',
        name: 'CreateImage',
        component: () => import('@/views/image/create'),
        meta: { title: '用户管理', icon: '添加' },
        hidden: true
      },
      {
        path: 'list',
        name: 'ImageList',
        component: () => import('@/views/image/list'),
        meta: { title: '菜单权限管理', icon: '列表' },
        hidden: true
      },
      {
        path: 'edit',
        component: () => import('@/views/image/edit'),
        name: 'EditImage',
        meta: { title: '角色权限管理', noCache: true, activeMenu: '/image/list' },
        hidden: true
      }
    ],
    hidden: true
  },
  {
    path: '/image',
    component: Layout,
    redirect: '/image/list',
    name: 'Image',
    meta: {
      title: '图片管理',
      icon: '图片'
    },
    children: [
      {
        path: 'create',
        name: 'CreateImage',
        component: () => import('@/views/image/create'),
        meta: { title: '图片添加', icon: '添加' }
      },
      {
        path: 'list',
        name: 'ImageList',
        component: () => import('@/views/image/list'),
        meta: { title: '图片列表', icon: '列表' }
      },
      {
        path: 'edit',
        component: () => import('@/views/image/edit'),
        name: 'EditImage',
        meta: { title: '编辑图片', noCache: true, activeMenu: '/image/list' },
        hidden: true
      }
    ],
    hidden: true
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/list',
    name: 'Article',
    meta: {
      title: '文章发布',
      icon: '文章管理'
    },
    children: [
      {
        path: 'create',
        name: 'CreateArticle',
        component: () => import('@/views/article/create'),
        meta: { title: '创建文章', icon: '添加' }
      },
      {
        path: 'list',
        name: 'ArticleList',
        component: () => import('@/views/article/list'),
        meta: { title: '文章列表', icon: '列表' }
      },

      {
        path: 'edit',
        component: () => import('@/views/article/edit'),
        name: 'EditArticle',
        meta: { title: '编辑文章', noCache: true, activeMenu: '/article/list' },
        hidden: true
      }
    ],
    hidden: true
  },
  {
    path: '/apply',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'apply',
        component: () => import('@/views/apply/list'),
        meta: { title: '申请列表', icon: '企业信息' }
      }
    ],
    hidden: true
  },
  {
    path: '/companyInfo',
    component: Layout,
    redirect: '/image/list',
    name: 'Image',
    meta: {
      title: '设置页面',
      icon: '图片'
    },
    children: [
      {
        path: 'index',
        name: 'companyInfo',
        component: () => import('@/views/companyInfo/index'),
        meta: { title: '个人中心', icon: '企业信息' }
      },
      {
        path: 'index',
        name: 'companyInfo',
        component: () => import('@/views/companyInfo/index'),
        meta: { title: '个人设置', icon: '企业信息' }
      }
    ],
    hidden: true
  },
  {
    path: '/tools',
    component: Layout,
    redirect: '/tools/log',
    name: 'tools',
    meta: {
      title: '工具',
      icon: '图片'
    },
    children: [
      {
        path: '/log',
        name: 'log',
        component: () => import('@/views/tools/log'),
        meta: { title: '日志', icon: '企业信息' },
        children: [
          {
            path: 'logRecord',
            name: 'logRecord',
            component: () => import('@/views/tools/log/logRecord'),
            meta: { title: '日志记录', icon: '企业信息' },
            hidden: false
          },
          {
            path: 'errorCaptrue',
            name: 'errorCaptrue',
            component: () => import('@/views/tools/log/errorCaptrue'),
            meta: { title: '错误捕获', icon: '企业信息' },
            hidden: false
          }
        ]
      }
    ]
  },
  {
    path: '/dictionary',
    component: Layout,
    redirect: '/dictionary',
    meta: {
      title: '字典',
      icon: '后台'
    },
    children: [
      {
        path: 'dictionary',
        name: 'Dictionary',
        component: () => import('@/views/dictionary/index'),
        meta: { title: '字典', icon: '后台' }
      }
    ]
  },
  // {
  //   path: '/dictionary',
  //   component: Layout,
  //   redirect: '/dictionary',
  //   name: 'dictionary',
  //   meta: {
  //     title: '字典',
  //     icon: '图片'
  //   },
  // }

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: '综合实例', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '表单', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: '路由嵌套',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: '菜单1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: '菜单1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: '菜单1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: '菜单1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: '菜单1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: '菜单1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: '菜单' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: '外链', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
