import React from 'react';

const CallToAction =
  'I make products that help people to understand the world around them, and think of new solutions to difficult problems.';

const Splash = () => {
  return (
    <div className="cf ph3 pb2">
      <div className="mw8 center feature-bg br2">
        <header className="w-100 mw7 pv3 ph4 pa5-ns">
          <h2 className="lh-title f1-ns f2 b ma0 garamond i">{CallToAction}</h2>
        </header>
      </div>
    </div>
  );
};

const Lead = title => (
  <div className="mw8 center pa3 feature-bg">
    <div className="w-100 ">
      <h1 className="f1 f-headline-ns black-90 fw6 mb2 i garamond">{title}</h1>
    </div>
  </div>
);

export { Lead, Splash, CallToAction };
