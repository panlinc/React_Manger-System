import {
  DeleteOutlined,
  EditOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Table,
  Switch,
  Button,
  Space,
  TableColumnType,
  message,
  Popconfirm,
  Modal,
  Form,
  Input,
  Cascader,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { UserListStateType } from './model';

const data: any = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: i + 1,
    street: 'Lake Park',
    building: 'C',
    number: 2035,
    companyAddress: 'Lake Street 42',
    companyName: 'SoftLake Co',
    gender: 'M',
  });
}

function UserListTable(props: any) {
  const [modifyModalFlag, setModifyModalFlag] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [activeId, setActiveId] = useState(0);
  const [activeRid, setActiveRid] = useState(0);
  const [modifyRoleModalFlag, setModifyRoleModalFlag] = useState(false);
  const [username, setUsername] = useState('');
  const [roleName, setRoleName] = useState('');
  const [newRoleName, setNewRoleName] = useState('');
  //? 点击修改按钮触发
  const openModifyModal = (
    id: number,
    username: string,
    email: string,
    phone: string,
  ) => {
    setModifyModalFlag(true);
    setFormValues({
      username,
      email,
      phone,
    });
    setActiveId(id);
  };
  const closeModifyModal = () => {
    setModifyModalFlag(false);
  };
  //? 点击修改后-对话框点击确定按钮触发
  const modifyConfirm = () => {
    const { email, phone } = formValues;
    //* 激活model.ts中的modifyUserInfo
    props.dispatch({
      type: 'userList/modifyUserInfo',
      payload: {
        id: activeId,
        email,
        phone,
      },
    });
    setTimeout(() => {
      closeModifyModal();
    }, 1000);
  };
  //? 点击修改后-对话框点击取消按钮触发
  const modifyCancel = () => {
    closeModifyModal();
  };
  //? 点击分页页码时触发的方法
  const pageChangeHandler = (
    page: number,
    pagesize?: number | undefined,
  ): void => {
    props.dispatch({
      type: 'userList/getUserList',
      payload: {
        query: '',
        pagesize,
        pagenum: page,
      },
    });
  };
  //? 修改状态按钮的方法
  const changeState = (uid: number, type: boolean): void => {
    //* 通过dispatch激活model.ts中effects里面的modifyUserState方法
    props.dispatch({
      type: 'userList/modifyUserState',
      payload: {
        uid,
        type,
      },
    });
  };
  //? 删除列表中用户的方法
  const deleteHandler = (id: number, username: string) => {
    //* 判断删除的用户是否是admin，admin不能被删除
    if (username === 'admin') {
      message.error('admin无法删除');
      return;
    }
    //* 删除的用户不是admin
    props.dispatch({
      type: 'userList/deleteUser',
      payload: id, //? payload传递参数
    });
  };
  //? 取消删除用户的方法
  const cancelDeleteUser = () => {
    message.info('已取消删除！');
  };
  //? 点击角色修改按钮的方法
  const openModifyRoleModal = (
    id: number,
    rid: number,
    username: string,
    role_name: string,
  ): void => {
    setModifyRoleModalFlag(true);
    setUsername(username);
    setRoleName(role_name);
    setActiveId(id);
    setActiveRid(rid);
  };
  //? 角色修改界面点击取消按钮的方法
  const closeModifyRoleModal = () => {
    setModifyRoleModalFlag(false);
  };
  //? 角色修改界面级联菜单选中后执行的方法
  const selectRoot = (value: string): void => {
    setNewRoleName(value);
  };

  //? 角色修改界面点击确定按钮的方法
  const rootConfirm = () => {
    props.dispatch({
      type: 'userList/modifyRoot',
      payload: {
        id: activeId,
        rid: 40, //* 默认都将权限设置成管理员，40-43
      },
    });
    closeModifyRoleModal();
  };
  const columns: TableColumnType<any>[] = [
    {
      title: 'ID',
      width: 100,
      dataIndex: 'id',
      key: 'name',
      fixed: 'left',
    },
    {
      title: '用户名',
      width: 100,
      dataIndex: 'username',
      key: 'age',
      fixed: 'left',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: '1',
      width: 150,
    },
    {
      title: '电话',
      dataIndex: 'mobile',
      key: '2',
      width: 150,
    },
    {
      title: '角色',
      dataIndex: 'role_name',
      key: '3',
      width: 150,
    },
    {
      title: '状态',
      dataIndex: 'mg_state',
      key: '4',
      width: 100,
      render: (o) => (
        //? 状态选择按钮
        <Switch
        //!无法连接接口，暂时注释
        // checked={o.mg_state}
        // onChange={() => {
        //   changeState(o.id, !o.mg_state);
        // }}
        />
      ),
    },
    {
      title: '操作',
      key: 'operation',
      fixed: 'right',
      width: 150,
      render: (o) => (
        <div>
          <Space>
            {/* 编辑按钮 */}
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                openModifyModal(o.id, o.username, o.email, o.mobile);
              }}
            ></Button>
            <Modal
              title="修改用户信息"
              visible={modifyModalFlag}
              onCancel={modifyCancel}
              onOk={modifyConfirm}
              mask={false}
            >
              <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
                <Form.Item
                  // name="username"
                  label="用户名"
                >
                  <Input disabled={true} value={formValues.username} />
                </Form.Item>
                <Form.Item
                  // name="email"
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
                  <Input
                    value={formValues.email}
                    onChange={(e) => {
                      setFormValues({
                        username: formValues.username,
                        email: e.target.value,
                        phone: formValues.phone,
                      });
                    }}
                  />
                  {/*加onchange将input变成受控组件*/}
                </Form.Item>
                <Form.Item
                  // name="mobile"
                  label="电话"
                  rules={[
                    {
                      required: true,
                      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
                      message: '电话格式错误',
                    },
                  ]}
                >
                  <Input
                    value={formValues.phone}
                    onChange={(e) => {
                      setFormValues({
                        username: formValues.username,
                        email: formValues.email,
                        phone: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Form>
            </Modal>
            <Popconfirm
              title="确认要删除该用户吗？"
              onConfirm={() => {
                deleteHandler(o.id, o.username);
              }}
              onCancel={cancelDeleteUser}
              okText="确认"
              cancelText="取消"
            >
              {/* 删除数据按钮 */}
              <Button type="primary" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>
            {/* 角色修改按钮 */}
            <Button
              style={{ background: 'orange', color: 'white' }}
              icon={<SettingOutlined />}
              onClick={() => {
                openModifyRoleModal(o.id, o.rid, o.username, o.role_name);
              }}
            ></Button>
            <Modal
              title="角色分配"
              visible={modifyRoleModalFlag}
              onOk={rootConfirm}
              onCancel={closeModifyRoleModal}
              mask={false}
            >
              <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
                <Form.Item label="当前用户">{username}</Form.Item>
                <Form.Item label="当前角色">{roleName}</Form.Item>
                <Form.Item label="新角色">
                  <Cascader
                    placeholder="请选择新角色"
                    options={[
                      { value: 'admin', label: 'admin', disable: true },
                      { value: '管理员', label: '管理员' },
                      {
                        value: 'others',
                        label: 'others',
                        children: [
                          { value: '客服', label: '客服' },
                          { value: '清洁工', label: '清洁工' },
                        ],
                      },
                    ]}
                    onChange={selectRoot}
                  ></Cascader>
                </Form.Item>
              </Form>
            </Modal>
          </Space>
        </div>
      ),
    },
  ];
  useEffect(() => {
    //走redux
    props.dispatch({
      type: 'userList/getUserList',
      payload: {
        query: '',
        pagenum: 1,
        pagesize: 5,
      },
    });
  }, []);

  return (
    <div style={{ marginTop: 30 + 'px' }}>
      <Table
        columns={columns}
        //!无法连接接口，暂时注释
        // dataSource={props.list}
        dataSource={data}
        scroll={{ x: 1500, y: 500 }}
        pagination={{
          position: ['bottomLeft'],
          pageSize: 5,
          onChange: pageChangeHandler,
          total: props.totalPage,
        }}
      />
    </div>
  );
}
export default connect(
  ({ userList }: { userList: UserListStateType }) => userList,
)(UserListTable);
