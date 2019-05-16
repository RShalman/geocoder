import React from 'react';
import html from 'react-inner-html';

import S from './module.css';

const Description = ({ id, desc }) => (
  <div className={S.description}>
    <h1 className={S.header}>{id}</h1>
    <p className={S.text} {...html(desc)} />
  </div>
);

export default Description;
