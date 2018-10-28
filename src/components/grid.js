import React from 'react';

const Grid = ({ imageURLS }) => (
  <section className="cf w-100 pa2-ns">
    {imageURLS.map(i => (
      <article key={i} className="fl w-100 w-100-m w-50-ns pa2-ns">
        <div className="aspect-ratio aspect-ratio--4x3">
          <img
            style={{ backgroundImage: `url(${i})` }}
            className="db bg-center cover aspect-ratio--object"
          />
        </div>
      </article>
    ))}
  </section>
);

export default Grid;
