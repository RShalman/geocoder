import React, { useRef, useEffect } from 'react';
import S from './module.css';

const PopUp = ({
  data,
  counter,
  size,
  errors,
  toggleFunc,
  cleanOut,
  passRefUp,
}) => {
  const circleStyle = {
    strokeDasharray: `${251.327 * (counter / size)} 251.327 251.327`,
  };

  const abortEl = useRef(null);
  const popupEl = useRef(null);

  useEffect(() => {
    passRefUp('abort', abortEl.current);
    passRefUp('popup', popupEl.current);
    return () => {};
  }, [abortEl.current, popupEl.current]);

  return (
    <div
      id={S.popup}
      ref={popupEl}
      className={S.loadingPopUp}
      loading={counter == size ? 'finished' : null}
    >
      <div className={S.loadingContainer}>
        <div className={S.counter}>{`${counter} / ${size}`}</div>
        <svg
          width="300"
          height="300"
          viewBox="0 0 100 100"
          id={S.loadingCircle}
        >
          <circle
            style={circleStyle}
            cx="50"
            cy="50"
            r="40"
            stroke="orange"
            strokeWidth="2"
            fill="rgba(255,255,255,0)"
          />
        </svg>
        <div className={S.errors}>{`${data.errors}: ${errors}`}</div>
        <div className={S.loading}>
          {counter == size ? `${data.completed}` : `${data.loading}`}
        </div>
        <button
          id={S.abort}
          ref={abortEl}
          type="button"
          onClick={() => {
            cleanOut();
            toggleFunc();
          }}
        >
          {data.cancel}
        </button>
        <button id={S.close} type="button" onClick={() => toggleFunc()}>
          {data.close}
        </button>
      </div>
    </div>
  );
};

export default PopUp;
