import React from 'react';
import { Button } from 'antd';
import { getCookie } from '@/utils/cookie';
import { history } from 'umi';
function Tab() {
  const username = getCookie('username');
  return (
    <div>
      当前操作用户：{username}{' '}
      <Button
        type="ghost"
        danger
        onClick={() => {
          history.push('/login');
        }}
      >
        退出
      </Button>
    </div>
  );
}

export default Tab;
