import { useState } from 'react';
import { Header } from 'components/header';

export default () => {
  return (
    <div>
      <Header>
        <h1 className="mt-1 font-serif text-4xl font-extrabold leading-10 tracking-tight text-gray-900 sm:leading-none sm:text-6xl lg:text-5xl xl:text-6xl">
          Californian slightly out of place in Dublin. Aiming for a constant
          state of play.
        </h1>
      </Header>
    </div>
  );
};
