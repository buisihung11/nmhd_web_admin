export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/product',
    name: 'product',
    icon: 'star',
    routes: [
      {
        path: '/product',
        redirect: '/product/master',
      },
      {
        path: '/product/master',
        name: 'master',
        component: './product/master.jsx',
      },
      {
        path: '/product/create',
        name: 'create-master',
        hideInMenu: true,
        component: './product/create.jsx',
      },
      {
        path: '/product/:productId',
        name: 'update',
        hideInMenu: true,
        component: './product/[productId]',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
