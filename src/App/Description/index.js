import React from 'react';
import html from 'react-inner-html';

import S from './module.css';

const Description = ({ step, desc }) => (
  <div className={S.description}>
    <h1 className={S.header} {...html(step)} />
    <p className={S.text} {...html(desc)} />
  </div>
);

export default Description;
