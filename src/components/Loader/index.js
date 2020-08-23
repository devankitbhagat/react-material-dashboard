import React from 'react';
import GridLoader from 'react-spinners/GridLoader';
import { css } from '@emotion/core';

const override = css`
  border-color: red;
`;

const Loader = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        margin: '-50px 0px 0px -50px'
      }}>
      <GridLoader css={override} size={20} color={'#210070'} loading={true} />
    </div>
  );
};

export default Loader;
