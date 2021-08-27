import {
  UserOutlined,
  ApartmentOutlined,
  ShoppingOutlined,
  UnorderedListOutlined,
  AreaChartOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Component } from 'react';
export const routes = [
  {
    path: '/home',
    component: '@/pages/home',
    name: '首页',
    icon: 'HomeOutlined',
  },
  {
    path: '/user',
    // component: '@/pages/user-manger',
    name: '用户管理',
    icon: 'UserOutlined',
    routes: [
      {
        path: '/user/list',
        component: '@/pages/user-manger/UserList',
        name: '用户列表',
      },
    ],
  },
  {
    path: '/permission',
    name: '权限管理',
    icon: 'ApartmentOutlined',
    routes: [
      {
        path: '/permission/permission',
        component: '@/pages/permission-manger/PermissionList',
        name: '权限列表',
      },
      {
        path: '/permission/role',
        component: '@/pages/permission-manger/RoleList',
        name: '角色列表',
      },
    ],
  },
  {
    path: '/goods',
    // component: '@/pages/home',
    name: '商品管理',
    icon: 'ShoppingOutlined',
    routes: [
      {
        path: '/goods/list',
        component: '@/pages/goods-manger/GoodList',
        name: '商品列表',
      },
      {
        path: '/goods/categorg',
        component: '@/pages/goods-manger/GoodCategorg',
        name: '商品类别',
      },
      {
        path: '/goods/arguments',
        component: '@/pages/goods-manger/ClassesArguments',
        name: '分类参数',
      },
    ],
  },
  {
    path: '/order',
    // component: '@/pages/home',
    name: '订单管理',
    icon: 'UnorderedListOutlined',
    routes: [
      {
        path: '/order/list',
        component: '@/pages/order-manger/OrderList',
        name: '订单列表',
      },
    ],
  },
  {
    path: '/data',
    // component: '@/pages/home',
    name: '数据统计',
    icon: 'AreaChartOutlined',
    routes: [
      {
        path: '/data/chart',
        component: '@/pages/data-statistics/DataChart',
        name: '数据报表',
      },
    ],
  },
  {
    path: '/login',
    component: '@/pages/user/Login',
    // 不展示顶栏
    headerRender: false,
    // 不展示页脚
    footerRender: false,
    // 不展示菜单
    menuRender: false,
    // 不展示菜单顶栏
    menuHeaderRender: false,
  },
  {
    //重定向
    path: '*',
    component: '@/pages/404',
  },
];
