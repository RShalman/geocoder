import React from 'react';
import Description from '../Description';
import S from './module.css';

const ApiKey = ({ data, val, change }) => (
  <div className={S.apikey}>
    <Description step={data.step} desc={data.desc} />
    <input id={S.key} value={val} onChange={change} type={`key`} />
  </div>
);

export default ApiKey;
