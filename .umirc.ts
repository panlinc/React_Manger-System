//! 项目配置
import { defineConfig } from 'umi';
import { routes } from './config/route';
import { createLogger } from 'redux-logger';
import { message } from 'antd';

export const dva = {
  config: {
    onAction: createLogger(),
    onError(e: Error) {
      message.error(e.message, 3);
    },
  },
};
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  layout: {
    //? 界面配置
    // 支持任何不需要 dom 的
    // https://procomponents.ant.design/components/layout#prolayout
    name: 'Manage-System',
    // logo: './pic/kwas.jpg',
    locale: true,
    layout: 'side',
  },
  dva: {
    //? Dva数据流的配置
    immer: true, //? 表示允许修改reducers
    hmr: true, //? 表示是否启动热更新
  },
});
