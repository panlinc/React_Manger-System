//! 登录的操作可以放置在user/model.ts中

//todo dva数据流(redux数据流)
import { Effect, ImmerReducer, Reducer, Subscription, history } from 'umi';
//? Effect,ImmerReducer,Subscription都是TS的类型
import { loginReq } from '@/service';
export interface userStateType {
  username: string;
}
import { message } from 'antd';
import { setCookie } from '@/utils/cookie';

export interface userModelType {
  namespace: 'user';
  state: userStateType;
  effects: {
    login: Effect;
  };
  reducers: {
    LOGIN: ImmerReducer;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const userModel: userModelType = {
  namespace: 'user', //?
  state: {
    username: 'panlc',
    //? 数据(状态)
  },
  effects: {
    //? 创建动作，发送数据请求
    *login({ payload }, { call, put }) {
      const r = yield call(loginReq, payload);
      //   console.log(r);
      if (r.meta.status == 400) {
        message.error(r.meta.msg);
        return;
      }
      //todo 经过if判断密码是对的
      setCookie('email', r.data.email, 7);
      setCookie('id', r.data.id, 7);
      setCookie('mobile', r.data.mobile, 7);
      setCookie('rid', r.data.rid, 7);
      setCookie('token', r.data.token, 7);
      setCookie('username', r.data.username, 7);
      //todo 跳转页面(命令式跳转=> history.push/replace)
      history.push('/');
      put({
        //? 没有页面渲染，put可以注释
        type: 'LOGIN',
      });
    },
  },
  reducers: {
    //? 修改数据
    LOGIN() {},
  },
  subscriptions: {
    //? 异步操作：日期、通信连接
    setup() {},
  },
};

export default userModel;
