/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'dva';

const GsqPage = (props) => {
  const { placeNumberData, dispatch } = props;
  const getPnNums = () => {
    dispatch({
      type: 'gsq/getPlaceNumber',
    });
  };
  return (
    <>
      <div>数据：{placeNumberData}</div>
      <button type="button" onClick={getPnNums}>
        获取数据
      </button>
    </>
  );
};

function mapStateToProps(state) {
  const { placeNumberData } = state.gsq;
  return {
    placeNumberData,
  };
}

export default connect(mapStateToProps)(GsqPage);
