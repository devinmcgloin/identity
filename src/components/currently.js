import React from 'react';

const currently = () => (
  <div className="tl pa3 pa5-ns bg-blue near-white">
    <div className="mw8 center">
      <section className="lh-copy">
        <article className="pv2 w-100 ph2">
          <h2 className="f2 f1-ns fw6 mb2">
            What I'm ( doing / thinking ) about
          </h2>
          <p className="f5 f4-ns lh-copy mt0">
            I'm currently a Product Engineer at Intercom in Dublin. It's a nice
            balance between engineering and product work, and Intercom is at an
            exciting inflection point. What follows are things I'm particularly
            focused on, both inside and outside of work.
          </p>
        </article>

        <section style={{ display: 'flex', flexWrap: 'wrap' }}>
          <article className="fl pv2 w-100 w-third-l w-50-m ph2">
            <h2 className="f5 f4-ns fw6 mb0">Knowing Quality</h2>
            <p className="f6 f5-ns lh-copy mt0">
              Assessing quality is both a question of what Quality is, and how
              to get there. That said, it's one of the most meaningful item to
              consider when doing <span className="i">anything</span>.
            </p>
          </article>
          <article className="pv2 fl w-100 w-third-l w-50-m ph2">
            <h2 className="f5 f4-ns fw6 mb0">Generative Artwork</h2>
            <p className="f6 f5-ns lh-copy mt0">
              Computer Generated artwork is an exciting mix between computing
              and creativity in a medium without limits. I'll be publishing more
              around this in the future.
            </p>
          </article>
          <article className="pv2 fl w-100 w-third-l w-50-m ph2">
            <h2 className="f5 f4-ns fw6 mb0">Cycling & Backpacking</h2>
            <p className="f6 f5-ns lh-copy mt0">
              These are both fantastic ways to see things you wouldn't be able
              to otherwise, not to mention how calming it is to be present in
              nature. I'm looking into doing more with Bike Packing in the near
              future.
            </p>
          </article>
          <article className="pv2 fl w-100 w-third-l w-50-m ph2">
            <h2 className="f5 f4-ns fw6 mb0">Understanding Context</h2>
            <p className="f6 f5-ns lh-copy mt0">
              Understanding the context swirling around what you're working
              towards helps massively in knowing what you ought to focus on. I'm
              focused on understanding more of the context that surrounds my own
              work and goals.
            </p>
          </article>
          <article className="pv2 fl w-100 w-third-l w-50-m ph2">
            <h2 className="f5 f4-ns fw6 mb0">Distilling Ideas</h2>
            <p className="f6 f5-ns lh-copy mt0">
              Communicating ideas is incredibly important, as is distilling
              rough ideas to their core fundamentals. I'm interested in honing
              this ability through writing, so keep an eye on my RSS feed.
            </p>
          </article>
          <article className="pv2 fl w-100 w-third-l w-50-m ph2">
            <h2 className="f5 f4-ns fw6 mb0">History of Computing</h2>
            <p className="f6 f5-ns lh-copy mt0">
              I'm enamored with where we've been in computing. The history of
              this relatively young field is bright with unique and powerful
              ideas. The fundamental question is: Where are we going and where
              have we been?
            </p>
          </article>
        </section>
        <p className="f6 center ph2 tc i">
          My goals are in constant flux, and so is this section.
        </p>
      </section>
    </div>
  </div>
);

export default currently;
