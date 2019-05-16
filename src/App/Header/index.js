import React from 'react';
import S from './module.css';

const Header = ({ data }) => (
  <div className={S.header}>
    <h1 className={S.text}>{data.header}</h1>
  </div>
);

export default Header;
