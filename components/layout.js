import { useState } from 'react';
import { Header } from 'components/header';

export default ({ children }) => {
  return (
    <div>
      <Header></Header>
      {children}
    </div>
  );
};
