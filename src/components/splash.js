import React from 'react';

const Splash = () => (
  <div className="pv2 cf topo">
    <div className="mw8 center pa2">
      <header className="fl w-100 w-50-l pv4-l pa3 mb3 mb5-l">
        <h2 className="lh-title f1-ns f2 b mt0 proza-libre i">
          I make products that help people to understand the world around them,
          and think of new solutions to difficult problems.
        </h2>
      </header>
    </div>
  </div>
);

const Lead = title => (
  <div className="pa3 topo bb b--black-10">
    <div className="mw8 center">
      <div className="w-100 ">
        <h1 className="f1 f-headline-ns black-90 fw6 mb2 i proza-libre">
          {title}
        </h1>
      </div>
    </div>
  </div>
);

export { Lead, Splash };
