/* eslint-disable comma-dangle */
import { message } from 'antd';
import { getAllUsers } from '../services/userApi';

// 延时函数，返回promise对象
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

export default {
  // 命名空间标识符
  namespace: 'user',
  // 全部state，可以定义一些默认值
  state: {
    users: [],
  },
  // 同步处理数据的方法，唯一能够直接改变state的方法，只能用dispatch触发
  // 把新的state retrun出去，用到state数据的界面就会更新，官方推荐处理逻辑都放在effects中
  reducers: {
    // 方法接收2个参数，第一个是旧的state，第二个是action对象,没有可以不写或写_
    setUsers(state, { users }) {
      // 先把旧的state全部解构出来，然后把新的users覆盖原来的,从而实现state的更新
      return { ...state, users };
    },
    deleteUser(state, { id }) {
      const tem = state.users;
      const result = tem.filter(i => id !== i.id);
      message.success('删除成功！');
      return { ...state, users: result };
    }
  },
  // 异步数据处理的方法
  // 推荐数据逻辑处理也应该在此处理，处理完再给reducer
  effects: {
    // 方法接收两个参数，第一个是传过来的action对象(没有可以写 _ )，第二个基本是用其中call, put, select这3个参数(所有的去官网看)
    // call: 用来与后台交互
    // put: 用来触发reducers中的方法，与dispacth功能一样
    // select: 用来选择models层所有model里state的数据
    // * yield是es6的Generator函数
    *getAllUsers(_, { call, put }) {
      const resp = yield call(getAllUsers);
      yield put({
        type: 'setUsers',// 这里可以省略命名空间
        users: resp.content
      });
      message.success('查询成功');
    },
    *delayRemoveUser({ id }, { call, put }) {
      yield call(delay, 1000);
      yield put({
        type: 'deleteUser',
        id
      });
    }
  },
  // 订阅监听，可以监听路由，键盘输入等，常用作进入某页面发个请求获取数据，展示出来
  subscriptions: {
    setup({
      dispatch, history, query, store,
    }) {
      return history.listen(({ pathname, search }) => {
        if (pathname === '/userPage') {
          // 监听进入testPage页时，做些操作
          // dispatch({ type: "shoppingWZ" })
        }
      });
    },
  },
};
