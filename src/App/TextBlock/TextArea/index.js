import React, { useRef, useEffect } from 'react';
import S from './module.css';

function copyFieldToClipboard(el) {
  el.select();
  document.execCommand('copy');
}

const TextArea = ({ data, input, output, change, outPath, passRefUp }) => {
  const outEl = useRef(null);

  useEffect(() => {
    passRefUp('outpath', outEl.current);
    return () => {};
  }, [outEl.current]);

  return (
    <>
      {data.type == `in` && (
        <textarea
          type={data.type}
          className={S.textArea}
          value={input}
          onChange={change}
          cols={`50`}
          rows={`30`}
          placeholder={data.placeholder}
        />
      )}
      {data.type == `out` && (
        <>
          <textarea
            type={data.type}
            className={S.textArea}
            ref={outEl}
            value={output}
            cols={`50`}
            rows={`30`}
            readOnly
            placeholder={data.placeholder}
          />
          <button type={`button`} onClick={() => copyFieldToClipboard(outPath)}>
            {data.copy}
          </button>
        </>
      )}
    </>
  );
};

export default TextArea;
