import React from 'react';

const Splash = () => (
  <div className="cf feature-bg pa3">
    <div className="mw8 center">
      <header className="fl w-two-thirds pa3 ma3 ma5-l">
        <h2 className="lh-title f1-ns f2 b mt0 garamond i">
          I make products that help people to understand the world around them,
          and think of new solutions to difficult problems.
        </h2>
      </header>
    </div>
  </div>
);

const Lead = title => (
  <div className="pa3 feature-bg bb b--black-10">
    <div className="mw8 center">
      <div className="w-100 ">
        <h1 className="f1 f-headline-ns black-90 fw6 mb2 i garamond">
          {title}
        </h1>
      </div>
    </div>
  </div>
);

export { Lead, Splash };
