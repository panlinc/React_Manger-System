//! 运行时配置
import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import Tab from '@/components/Tab';
export const layout = () => {
  return {
    rightContentRender: () => <Tab />, //<RightContent />,
    footerRender: () => <div>底部</div>, //<Footer />,
    // onPageChange: () => {
    //   const { currentUser } = initialState;
    //   const { location } = history;
    //   // 如果没有登录，重定向到 login
    //   if (!currentUser && location.pathname !== '/user/login') {
    //     history.push('/user/login');
    //   }
    // },
    // menuHeaderRender: undefined,
    // ...initialState?.settings,
  };
};
