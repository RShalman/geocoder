import React from 'react';
import Description from '../Description';
import TextArea from './TextArea';
import S from './module.css';

const TextBlock = ({ data, input, output, change, outPath, passRefUp }) => (
  <div className={data.type == `in` ? S.inputArea : S.outputArea}>
    <Description id={data.id} desc={data.desc} />
    <form className={S.form}>
      <p className={S.formHeader}>{data.header}</p>
      <TextArea
        data={data}
        input={input}
        output={output}
        change={change}
        outPath={outPath}
        passRefUp={passRefUp}
      />
    </form>
  </div>
);

export default TextBlock;
