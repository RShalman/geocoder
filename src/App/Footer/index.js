import React from 'react';
import html from 'react-inner-html';

import S from './module.css';

const Footer = ({ data }) => (
  <div className={S.footer}>
    <p className={S.headerText}>{data.header}</p>
    <div className={S.author}>
      <div className={S.title} {...html(data.title + ':')} />
      <div className={S.names}>
        {data.authors.map(name => (
          <span className={S.text} key={name} {...html(name)} />
        ))}
      </div>
    </div>
  </div>
);

export default Footer;
