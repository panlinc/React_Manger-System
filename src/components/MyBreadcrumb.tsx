import React, { useState, useEffect } from 'react';
import styles from './MyBreadcrumb.less';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'umi';
export default function MyBreadcrumb() {
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const { pathname } = useLocation();
  const obj: any = {
    '/user/list': {
      title: '用户管理',
      subTitle: '用户列表',
    },
    '/permission/permission': {
      title: '权限管理',
      subTitle: '权限列表',
    },
    '/permission/role': {
      title: '权限管理',
      subTitle: '角色列表',
    },
    '/goods/list': {
      title: '商品管理',
      subTitle: '商品列表',
    },
    '/goods/categorg': {
      title: '商品管理',
      subTitle: '商品类别',
    },
    '/goods/arguments': {
      title: '商品管理',
      subTitle: '分类参数',
    },
    '/order/list': {
      title: '订单管理',
      subTitle: '订单列表',
    },
    '/data/chart': {
      title: '数据统计',
      subTitle: '数据报表',
    },
  };
  useEffect(() => {
    for (let key in obj) {
      if (key === pathname) {
        setTitle(obj[key].title);
        setSubTitle(obj[key].subTitle);
      }
    }
  });
  return (
    <div className={styles.breadcrumb_container}>
      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/user/list">{subTitle}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
