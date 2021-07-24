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
    access: 'canAdmin',
  },
  {
    path: '/product',
    name: 'product',
    icon: 'star',
    access: 'canAdmin',
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
        path: '/product/child',
        name: 'child',
        component: './product/products.jsx',
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
  // BLOGPOST
  {
    name: 'blog-post',
    icon: 'star',
    path: '/blog-post',
    access: 'canAdmin',
    routes: [
      {
        path: '/blog-post/',
        redirect: '/blog-post/index',
      },
      {
        name: 'index',
        hideInMenu: true,
        path: '/blog-post/index',
        component: './blog-post/index',
      },
      {
        name: 'create',
        hideInMenu: true,
        path: '/blog-post/create',
        component: './blog-post/create',
      },
      {
        name: 'update',
        hideInMenu: true,
        path: '/blog-post/:updateId',
        component: './blog-post/[updateId]',
      },
    ],
  }, //end
  {
    name: 'password',
    hideInMenu: true,
    path: '/change-password',
    component: './change-password',
    access: 'canAdmin',
  },
  {
    name: 'order',
    icon: 'money-collect',
    path: '/order',
    component: './order/index',
    access: 'canAdmin',
    // routes: [
    //   {
    //     name: 'list',
    //     icon: 'smile',
    //     path: '/order/list',
    //   },
    // ],
  },
  {
    path: '/',
    redirect: '/product',
  },
  {
    component: './404',
  },
];
