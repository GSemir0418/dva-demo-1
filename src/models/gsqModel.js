import { message } from 'antd';
import * as service from '../services/gsqApi';

export default {
  namespace: 'gsq',
  state: {
    placeNumberData: '',
  },
  reducers: {
    setPlaceNumberData(state, { placeNumberData }) {
      return { ...state, placeNumberData };
    },
  },
  effects: {
    *getPlaceNumber(_, { call, put }) {
      const resp = yield call(service.getArr);
      const data = resp.content.join(',');
      console.log(data);
      yield put({
        type: 'setPlaceNumberData',
        placeNumberData: data,
      });
      message.success('查询成功！');
    },
  },
};
