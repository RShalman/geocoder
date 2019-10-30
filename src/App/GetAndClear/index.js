import React from 'react';
import Description from '../Description';
import S from './module.css';

const GetAndClear = ({ data, getFunc, clearFunc }) => (
  <div className={S.buttonsContainer}>
    <Description step={data.step} desc={data.desc} />
    <div className={S.buttons}>
      <button form={`textInput`} id={S.start} type={`button`} onClick={getFunc}>
        {data.getdata}
      </button>
      <button
        form={`textInput`}
        id={S.clean}
        type={`button`}
        onClick={clearFunc}
      >
        {data.clear}
      </button>
    </div>
  </div>
);

export default GetAndClear;
