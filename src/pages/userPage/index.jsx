/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

const UserManage = (props) => {
  // 把下面mapStateToProps方法return的数据从props中取出
  // 经过connect后dispatch也会自动传入props
  const { users, dispatch } = props;

  // 获取数据的回调
  const getUsers = () => {
    // 执行dispatch方法，参数为action对象
    dispatch({
      // action对象必须包括type属性，固定写法“命名空间/方法名”,
      // 可以理解为触发该命名空间中某个方法，给方法传递参数可以在后面写key:value形式，没有可以不写
      type: 'user/getAllUsers',
    });
  };
  // 删除数据的回调
  const deleteUser = (id) => {
    dispatch({
      type: 'user/deleteUser',
      // 为model层中的deleteUser方法传入id
      id,
    });
  };
  // 延时删除数据的回调
  const delayRemoveUser = (id) => {
    dispatch({
      type: 'user/delayRemoveUser',
      id,
    });
  };
  // 表格列配置
  const columns = [
    { title: '序号', dataIndex: 'id' },
    { title: '名称', dataIndex: 'name' },
    {
      title: '修改',
      render: (_, record) => [
        // 这里的回调要注意使用箭头函数
        <button onClick={() => deleteUser(record.id)}>删除</button>,
        <button onClick={() => delayRemoveUser(record.id)}>1s后删除</button>,
      ],
    },
  ];
  return (
    <>
      <button type="button" onClick={getUsers}>
        获取数据
      </button>
      <Table rowKey="id" dataSource={users} columns={columns} />
    </>
  );
};

// 将state映射为props
// 参数中的state表示全部model层的state
const mapStateToProps = (state) => {
  // 这里只用到user中的state，所以state.user把命名空间为user这个model层的state数据取出来
  const { users } = state.user;
  // 这里return出去的数据，会变成此组件的props，在组件可以通过props.num取到。
  // props变化了，会重新触发render方法，界面也就更新了。
  return {
    users,
  };
};

// 使用connect连接组件和model层数据
// connect方法用来连接models层的state数据，参数常用的有2个，是第一个mapStateToProps，第二个mapDispatchToProps
// mapStateToProps按字面意思：把models层state数据变为组件的props
// mapDispatchToProps：用了此方法，dispatch只会在此方法里。不写该参数，dispatch会作为组件的props。(我平常用几乎不写该方法)
export default connect(mapStateToProps)(UserManage);
