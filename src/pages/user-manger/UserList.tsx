import React, { Fragment, useState } from 'react';
import styles from './index.less';
import MyBreadcrumb from '../../components/MyBreadcrumb';
import { Input, Button, Space, Modal, Form } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import UserListTable from './UserListTable';
import { connect, Dispatch } from 'umi';
const { Search } = Input;
function UserList({ dispatch }: { dispatch: Dispatch }) {
  const [flag, setFlag] = useState(false);
  const [formValues, setFormValues] = useState({});
  //点击搜索按钮触发
  const onSearch = (value: string): void => {
    dispatch({
      type: 'userList/getUserList',
      payload: {
        query: value,
        pagenum: 1,
        pagesize: 5,
      },
    });
  };
  //点击添加用户触发
  const addUser = () => {
    setFlag(true);
  };
  //点击取消按钮触发
  const closeFlag = () => {
    setFlag(false);
  };
  //点击确定按钮触发
  const OkHandler = () => {
    dispatch({
      type: 'userList/addUser',
      payload: formValues, //? payload中放需要传递的参数
    });
    setTimeout(() => {
      closeFlag();
    }, 1000);
  };
  //输入表格信息后触发(获取表格输入内容)
  const getValues = (changeValues: object, allValues: object) => {
    setFormValues(allValues);
  };
  return (
    <Fragment>
      <MyBreadcrumb />
      <div className={styles.user_list}>
        {/* 上部分(搜索框) */}
        <div className={styles.search_box}>
          <Space size={15}>
            <Search
              placeholder="请输入用户名"
              onSearch={onSearch}
              enterButton //* 作用：点击回车也能生效操作
            />
            <Button type="primary" onClick={addUser}>
              添加用户
            </Button>
            <Modal
              title="添加新用户"
              visible={flag}
              onCancel={closeFlag}
              onOk={OkHandler}
            >
              <Form
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}
                onValuesChange={getValues}
              >
                <Form.Item
                  name="username"
                  label="用户名"
                  rules={[
                    {
                      required: true,
                      pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                      message: '用户名格式错误',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="密码"
                  rules={[
                    {
                      required: true,
                      pattern:
                        /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/,
                      message: '密码格式错误',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="邮箱"
                  rules={[
                    {
                      required: true,
                      pattern:
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: '邮箱格式错误',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="mobile"
                  label="电话"
                  rules={[
                    {
                      required: true,
                      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
                      message: '电话格式错误',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </Modal>
            <Button type="primary">导入</Button>
            <Button type="primary">导出</Button>
          </Space>
        </div>
        {/* 下部分(表格) */}
        <UserListTable />
      </div>
    </Fragment>
  );
}
export default connect()(UserList);
