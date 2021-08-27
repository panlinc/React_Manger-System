import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
//todo 样式模块化
import styles from './login.less';
import { connect } from 'umi';
import { userStateType } from './model';

/*
!!! antd组件库中的From组件
1.只有form可以一次拿到全部表单数据
2.登录按钮上一定要有htmlType="submit"属性，只有这样才能激活onfinish方法
3。input必须放在form.item中
*/

const Login = (props: any) => {
  const onFinish = ({ username, password }: any) => {
    //value中有三个值，将其中需要的两个值解构出来
    // console.log('Received values of form: ', values);
    //? 通过redux走login流程，通过dispatch来激活effects中的方法
    props.dispatch({
      //? type：命名空间(model)/effects(model)中的方法名
      type: 'user/login',
      payload: { username, password },
    });
  };
  useEffect(() => {
    const h = document.documentElement.clientHeight;
    const login: Element | null = document.querySelector('.login___1VOM-');
    Login.style.height = h + 'px';
  }, []);
  return (
    <div className={styles.login}>
      <div className={styles.content}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: '请输入你的用户名!4-16位字母、数字、下划线和减号',
                pattern: /^[a-zA-Z0-9_-]{4,16}$/,
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入你的密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住登录信息</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              忘记密码？
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
export default connect(({ user }: { user: userStateType }) => {
  return user;
})(Login);
