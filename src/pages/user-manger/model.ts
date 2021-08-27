import { Effect, ImmerReducer } from 'umi';
import * as service from '@/service';
import { message } from 'antd';

interface ListItemType {
  readonly id: number;
  username: string;
  mobile: string;
  type: number;
  email: string;
  create_time: string;
  mg_state: boolean;
  role_name: string;
}

export interface UserListStateType {
  list: ListItemType[];
  totalPage: number;
}

interface userListModelType {
  namespace: 'userList';
  state: UserListStateType;
  effect: {
    getUserList: Effect;
    addUser: Effect;
    modifyUserState: Effect;
    deleteUser: Effect;
    modifyUserInfo: Effect;
    modifyRoot: Effect;
  };
  reducers: {
    GET_USER_LIST: ImmerReducer;
    ADD_USER: ImmerReducer;
    MODIFY_USER_STATE: ImmerReducer;
    DELETE_USER: ImmerReducer;
    MODIFY_USER_INFO: ImmerReducer;
    MODIFY_ROOT: ImmerReducer;
  };
}
const userListModel: userListModelType = {
  namespace: 'userList',
  state: {
    list: [],
    totalPage: 1,
  },
  effect: {
    //? 获取用户数据列表
    *getUserList({ payload }, { call, put }) {
      //   const r = yield call(service.userListReq, payload);
      //   console.log(r);
      //   yield put({//? 将r传递给reducer
      //     type: 'GET_USER_LIST',
      //     payload: r,
      //   });
      //* 代码优化后
      yield put({
        type: 'GET_USER_LIST',
        payload: yield call(service.userListReq, payload),
      });
    },
    //? 添加用户数据
    *addUser({ payload }, { call, put }) {
      const r = yield call(service.addUserReq, payload);
      if (r.meta.status == 400) {
        message.error(r.meta.msg);
        return; // 创建失败后代码就终止了
      }
      if (r.meta.status == 400) {
        message.success(r.meta.msg);
      }
      yield put({
        type: 'ADD_USER',
        payload: r,
      });
    },
    //? 修改用户状态
    *modifyUserState({ payload }, { call, put }) {
      //* 发送请求
      const r = yield call(service.modifyUserStateReq, payload);
      if (r.meta.status === 200) {
        message.success(r.meta.msg);
      }
      //* 激活reducers中然后修改数据
      yield put({
        type: 'MODIFY_USER_STATE',
        payload: r.data,
      });
    },
    //? 删除用户
    *deleteUser({ payload }, { call, put }) {
      //* 发送请求
      const r = yield call(service.deleteUserReq, payload);
      if (r.meta.status === 200) {
        message.success(r.meta.msg);
      }
      //* 修改本地数据,通过put激活reducers方法
      yield put({
        type: 'DELETE_USER',
        payload,
      });
    },
    //? 修改用户信息
    *modifyUserInfo({ payload }, { call, put }) {
      //* 发送请求
      const r = yield call(service.modifyUserReq, payload);
      if (r.meta.status === 200) {
        message.success(r.meta.msg);
      }
      //* 修改本地数据
      yield put({
        type: 'MODIFY_USER_INFO',
        payload: r.data,
      });
    },
    //? 修改用户角色
    *modifyRoot({ payload }, { call, put }) {
      const r = yield call(service.modifyRoleReq, payload);
      if (r.meta.status === 400) {
        message.warn(r.meta.msg);
        return;
      }
      if (r.meta.status === 200) {
        message.success(r.meta.msg);
      }
      yield put({
        type: 'MODIFY_ROOT',
        payload: r,
      });
    },
  },
  reducers: {
    // GET_USER_LIST(state, action) {//? 将收到的r赋值给list
    //   state.list = action.payload.data.users;
    // },
    //? 代码优化后
    GET_USER_LIST(
      state,
      {
        payload: {
          data: { users, total },
        },
      },
    ) {
      state.totalPage = total;
      state.list = users;
    },
    ADD_USER(state, { payload }) {
      state.list.push(payload.data);
    },
    MODIFY_USER_STATE(state, { payload }) {
      //* 远端的用户状态数据改变后,本地的数据通过此方法进行修改,免去的刷新的步骤
      state.list.forEach((value: any) => {
        if (value.id === payload.id) {
          value.mg_state = payload.mg_state;
        }
      });
    },
    DELETE_USER(state, { payload }) {
      //* 远端的用户状态数据删除后,本地的数据通过此方法进行修改,免去的刷新的步骤
      state.list = state.list.filter((value: any) => value.id !== payload); //? filter生成运行结果为true的新数组
    },
    MODIFY_USER_INFO(state, { payload }) {
      state.list = state.list.array.forEach((value: any) => {
        if (value.id === payload.id) {
          value.email = payload.email;
          value.mobile = payload.mobile;
        }
      });
    },
    MODIFY_ROOT(state, { payload }) {
      state.list = state.list.array.forEach((value: any) => {
        if (value.id === payload.id) {
          value.role_name = '管理员';
        }
      });
    },
  },
};

export default userListModel;
